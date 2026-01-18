import 'package:get/get.dart';
import 'package:logger/logger.dart';
import '../models/student_profile_model.dart';
import '../services/firestore_service.dart';
import 'auth_controller.dart';

class ProfileController extends GetxController {
  final FirestoreService _firestoreService;
  final AuthController _authController;
  final Logger _logger = Logger();

  // Observable state
  final Rx<StudentProfile?> studentProfile = Rx<StudentProfile?>(null);
  final RxBool isLoading = false.obs;
  final RxBool isProfileComplete = false.obs;
  final RxString errorMessage = ''.obs;

  ProfileController({
    FirestoreService? firestoreService,
    AuthController? authController,
  })  : _firestoreService = firestoreService ?? FirestoreService(),
        _authController = authController ?? Get.find<AuthController>();

  @override
  void onInit() {
    super.onInit();
    _initializeProfile();
  }

  /// Initialize profile from Firebase
  void _initializeProfile() {
    _authController.currentUser.listen((user) {
      if (user != null) {
        _watchProfile(user.uid);
      } else {
        studentProfile.value = null;
      }
    });
  }

  /// Watch profile changes in real-time
  void _watchProfile(String uid) {
    _firestoreService.watchProfile(uid).listen((profile) {
      studentProfile.value = profile;
      _updateProfileCompletion();
      _logger.i('Profile updated: ${profile?.fullName}');
    }, onError: (error) {
      errorMessage.value = _firestoreService.parseError(error);
      _logger.e('Error watching profile: $error');
    });
  }

  /// Fetch profile from Firestore
  Future<bool> fetchProfile(String uid) async {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      final profile = await _firestoreService.getProfile(uid);
      studentProfile.value = profile;
      _updateProfileCompletion();

      _logger.i('Profile fetched successfully');
      return true;
    } catch (e) {
      errorMessage.value = _firestoreService.parseError(e);
      _logger.e('Error fetching profile: $e');
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  /// Create new profile
  Future<bool> createProfile({
    required String userType,
    required String fullName,
    required String nesaNumber,
    required int entryYear,
    required DateTime dateOfBirth,
    required Sex sex,
    required String schoolName,
    required String address,
    String? uacId,
    String? usi,
    bool? firstInFamily,
    bool? indigenous,
    String? culturalBackground,
  }) async {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      final currentUser = _authController.currentUser.value;
      if (currentUser == null) {
        errorMessage.value = 'User not authenticated';
        return false;
      }

      final profile = StudentProfile(
        uid: currentUser.uid,
        userType: userType,
        fullName: fullName,
        nesaNumber: nesaNumber,
        uacId: uacId,
        usi: usi,
        entryYear: entryYear,
        dateOfBirth: dateOfBirth,
        sex: sex,
        schoolName: schoolName,
        address: address,
        firstInFamily: firstInFamily,
        indigenous: indigenous,
        culturalBackground: culturalBackground,
        createdAt: DateTime.now(),
      );

      await _firestoreService.createProfile(
        uid: currentUser.uid,
        profile: profile,
      );

      studentProfile.value = profile;
      _updateProfileCompletion();

      _logger.i('Profile created successfully');
      return true;
    } catch (e) {
      errorMessage.value = _firestoreService.parseError(e);
      _logger.e('Error creating profile: $e');
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  /// Update existing profile
  Future<bool> updateProfile({
    String? fullName,
    String? nesaNumber,
    int? entryYear,
    DateTime? dateOfBirth,
    Sex? sex,
    String? schoolName,
    String? address,
    String? uacId,
    String? usi,
    bool? firstInFamily,
    bool? indigenous,
    String? culturalBackground,
  }) async {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      final currentProfile = studentProfile.value;
      if (currentProfile == null) {
        errorMessage.value = 'No profile to update';
        return false;
      }

      final updatedProfile = currentProfile.copyWith(
        fullName: fullName,
        nesaNumber: nesaNumber,
        entryYear: entryYear,
        dateOfBirth: dateOfBirth,
        sex: sex,
        schoolName: schoolName,
        address: address,
        uacId: uacId,
        usi: usi,
        firstInFamily: firstInFamily,
        indigenous: indigenous,
        culturalBackground: culturalBackground,
      );

      await _firestoreService.updateProfile(
        uid: currentProfile.uid,
        profile: updatedProfile,
      );

      studentProfile.value = updatedProfile;
      _updateProfileCompletion();

      _logger.i('Profile updated successfully');
      return true;
    } catch (e) {
      errorMessage.value = _firestoreService.parseError(e);
      _logger.e('Error updating profile: $e');
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  /// Check if profile is complete
  void _updateProfileCompletion() {
    final profile = studentProfile.value;
    if (profile == null) {
      isProfileComplete.value = false;
      return;
    }

    // Check if all required fields are filled
    isProfileComplete.value =
        profile.fullName.isNotEmpty &&
        profile.nesaNumber.isNotEmpty &&
        profile.schoolName.isNotEmpty &&
        profile.address.isNotEmpty;
  }

  /// Get profile completion percentage
  int getProfileCompletionPercentage() {
    final profile = studentProfile.value;
    if (profile == null) return 0;

    int completedFields = 0;
    const totalFields = 11;

    if (profile.userType.isNotEmpty) completedFields++;
    if (profile.fullName.isNotEmpty) completedFields++;
    if (profile.nesaNumber.isNotEmpty) completedFields++;
    if (profile.schoolName.isNotEmpty) completedFields++;
    if (profile.address.isNotEmpty) completedFields++;
    if (profile.uacId != null && profile.uacId!.isNotEmpty) completedFields++;
    if (profile.usi != null && profile.usi!.isNotEmpty) completedFields++;
    if (profile.firstInFamily != null) completedFields++;
    if (profile.indigenous != null) completedFields++;
    if (profile.culturalBackground != null &&
        profile.culturalBackground!.isNotEmpty) completedFields++;
    if (profile.payment != null) completedFields++;

    return ((completedFields / totalFields) * 100).toInt();
  }

  /// Clear error message
  void clearError() {
    errorMessage.value = '';
  }

  /// Clear profile data
  void clearProfile() {
    studentProfile.value = null;
    isProfileComplete.value = false;
    errorMessage.value = '';
  }
}
