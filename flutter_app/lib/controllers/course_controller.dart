import 'package:get/get.dart';
import 'package:logger/logger.dart';
import '../models/course_model.dart';
import '../services/course_service.dart';
import '../services/firestore_service.dart';

class CourseController extends GetxController {
  final CourseService _courseService;
  final FirestoreService _firestoreService;
  final Logger _logger = Logger();

  // Observable state
  final RxList<Course> allCourses = RxList<Course>([]);
  final RxList<Course> filteredCourses = RxList<Course>([]);
  final RxList<String> allFields = RxList<String>([]);
  final RxList<String> allUniversities = RxList<String>([]);
  final RxBool isLoading = false.obs;
  final RxString errorMessage = ''.obs;
  final RxString searchQuery = ''.obs;

  // Filter state
  final Rx<double> minAtarFilter = 0.0.obs;
  final Rx<double> maxAtarFilter = 100.0.obs;
  final Rx<double?> selectedMinAtar = Rx<double?>(null);
  final Rx<double?> selectedMaxAtar = Rx<double?>(null);
  final Rx<String?> selectedField = Rx<String?>(null);
  final Rx<String?> selectedUniversity = Rx<String?>(null);

  CourseController({
    CourseService? courseService,
    FirestoreService? firestoreService,
  })  : _courseService = courseService ?? CourseService(),
        _firestoreService = firestoreService ?? FirestoreService();

  @override
  void onInit() {
    super.onInit();
    _loadCourses();
    _loadFilterOptions();
  }

  /// Load all courses
  Future<void> _loadCourses() async {
    try {
      isLoading.value = true;
      errorMessage.value = '';

      final courses = await _courseService.getAllCourses();
      allCourses.value = courses;
      filteredCourses.value = courses;

      _logger.i('Loaded ${courses.length} courses');
    } catch (e) {
      errorMessage.value = _courseService.parseError(e);
      _logger.e('Error loading courses: $e');
    } finally {
      isLoading.value = false;
    }
  }

  /// Load filter options
  Future<void> _loadFilterOptions() async {
    try {
      final futures = await Future.wait([
        _courseService.getAllFields(),
        _courseService.getAllUniversities(),
        _courseService.getAtarRange(),
      ]);

      allFields.value = futures[0] as List<String>;
      allUniversities.value = futures[1] as List<String>;

      final atarRange = futures[2] as ({double min, double max});
      minAtarFilter.value = atarRange.min;
      maxAtarFilter.value = atarRange.max;

      _logger.i('Filter options loaded');
    } catch (e) {
      _logger.e('Error loading filter options: $e');
    }
  }

  /// Search courses
  void searchCourses(String query) {
    searchQuery.value = query;
    _applyAllFilters();
  }

  /// Apply all filters
  void _applyAllFilters() {
    var results = List<Course>.from(allCourses);

    // Text search
    if (searchQuery.value.isNotEmpty) {
      final lowerQuery = searchQuery.value.toLowerCase();
      results = results.where((course) {
        return course.degree.toLowerCase().contains(lowerQuery) ||
            course.university.toLowerCase().contains(lowerQuery) ||
            course.field?.toLowerCase().contains(lowerQuery) ?? false ||
            course.code.toLowerCase().contains(lowerQuery);
      }).toList();
    }

    // Field filter
    if (selectedField.value != null) {
      results = results.where((course) => course.field == selectedField.value).toList();
    }

    // University filter
    if (selectedUniversity.value != null) {
      results =
          results.where((course) => course.university == selectedUniversity.value).toList();
    }

    // ATAR filter
    if (selectedMinAtar.value != null) {
      results = results.where((course) {
        if (course.atar == null) return false;
        return course.atar! >= selectedMinAtar.value!;
      }).toList();
    }

    if (selectedMaxAtar.value != null) {
      results = results.where((course) {
        if (course.atar == null) return false;
        return course.atar! <= selectedMaxAtar.value!;
      }).toList();
    }

    filteredCourses.value = results;
    _logger.i('Filtered to ${results.length} courses');
  }

  /// Set field filter
  void setFieldFilter(String? field) {
    selectedField.value = field;
    _applyAllFilters();
  }

  /// Set university filter
  void setUniversityFilter(String? university) {
    selectedUniversity.value = university;
    _applyAllFilters();
  }

  /// Set ATAR range filter
  void setAtarFilter(double min, double max) {
    selectedMinAtar.value = min;
    selectedMaxAtar.value = max;
    _applyAllFilters();
  }

  /// Clear all filters
  void clearAllFilters() {
    searchQuery.value = '';
    selectedField.value = null;
    selectedUniversity.value = null;
    selectedMinAtar.value = null;
    selectedMaxAtar.value = null;
    filteredCourses.value = allCourses;
    _logger.i('Filters cleared');
  }

  /// Get filter count
  int getActiveFilterCount() {
    int count = 0;
    if (searchQuery.value.isNotEmpty) count++;
    if (selectedField.value != null) count++;
    if (selectedUniversity.value != null) count++;
    if (selectedMinAtar.value != null || selectedMaxAtar.value != null) count++;
    return count;
  }

  /// Sort filtered courses
  void sortCourses(String sortBy) {
    final sortedCourses = List<Course>.from(filteredCourses);

    switch (sortBy) {
      case 'name':
        sortedCourses.sort((a, b) => a.degree.compareTo(b.degree));
        break;
      case 'university':
        sortedCourses.sort((a, b) => a.university.compareTo(b.university));
        break;
      case 'atar_low':
        sortedCourses.sort((a, b) {
          if (a.atar == null) return 1;
          if (b.atar == null) return -1;
          return a.atar!.compareTo(b.atar!);
        });
        break;
      case 'atar_high':
        sortedCourses.sort((a, b) {
          if (a.atar == null) return 1;
          if (b.atar == null) return -1;
          return b.atar!.compareTo(a.atar!);
        });
        break;
      case 'closing_soon':
        sortedCourses.sort((a, b) => a.closingDate.compareTo(b.closingDate));
        break;
    }

    filteredCourses.value = sortedCourses;
    _logger.i('Courses sorted by $sortBy');
  }

  /// Add course to wishlist
  Future<bool> addToWishlist(String courseId, String uid) async {
    try {
      await _firestoreService.addCourseToWishlist(
        uid: uid,
        courseId: courseId,
      );
      _logger.i('Course added to wishlist');
      return true;
    } catch (e) {
      errorMessage.value = _courseService.parseError(e);
      _logger.e('Error adding to wishlist: $e');
      return false;
    }
  }

  /// Remove course from wishlist
  Future<bool> removeFromWishlist(String courseId, String uid) async {
    try {
      await _firestoreService.removeCourseFromWishlist(
        uid: uid,
        courseId: courseId,
      );
      _logger.i('Course removed from wishlist');
      return true;
    } catch (e) {
      errorMessage.value = _courseService.parseError(e);
      _logger.e('Error removing from wishlist: $e');
      return false;
    }
  }

  /// Get courses closing soon
  Future<List<Course>> getClosingCourses({int days = 30}) async {
    try {
      return await _courseService.getClosingCourses(daysThreshold: days);
    } catch (e) {
      _logger.e('Error fetching closing courses: $e');
      return [];
    }
  }

  /// Clear error message
  void clearError() {
    errorMessage.value = '';
  }

  /// Refresh courses
  Future<void> refreshCourses() async {
    await _loadCourses();
  }
}
