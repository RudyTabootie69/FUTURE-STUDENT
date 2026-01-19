import 'package:get/get.dart';
import 'package:logger/logger.dart';
import '../models/course_model.dart';
import '../services/firestore_service.dart';
import '../services/course_service.dart';
import 'auth_controller.dart';

class WishlistController extends GetxController {
  final FirestoreService _firestoreService;
  final CourseService _courseService;
  final AuthController _authController;
  final Logger _logger = Logger();

  // Observable state
  final RxList<Course> wishlistCourses = RxList<Course>([]);
  final RxList<String> wishlistCourseIds = RxList<String>([]);
  final RxBool isLoading = false.obs;
  final RxString errorMessage = ''.obs;
  final RxString sortBy = 'closing'.obs;

  WishlistController({
    FirestoreService? firestoreService,
    CourseService? courseService,
    AuthController? authController,
  })  : _firestoreService = firestoreService ?? FirestoreService(),
        _courseService = courseService ?? CourseService(),
        _authController = authController ?? Get.find<AuthController>();

  @override
  void onInit() {
    super.onInit();
    _initializeWishlist();
  }

  /// Initialize wishlist from Firebase
  void _initializeWishlist() {
    _authController.currentUser.listen((user) {
      if (user != null) {
        _watchWishlist(user.uid);
      } else {
        wishlistCourses.clear();
        wishlistCourseIds.clear();
      }
    });
  }

  /// Watch wishlist changes in real-time
  void _watchWishlist(String uid) {
    _firestoreService.watchWishlist(uid).listen((courseIds) {
      wishlistCourseIds.value = courseIds;
      _loadWishlistCourses(courseIds);
    }, onError: (error) {
      errorMessage.value = _firestoreService.parseError(error);
      _logger.e('Error watching wishlist: $error');
    });
  }

  /// Load wishlist course details
  Future<void> _loadWishlistCourses(List<String> courseIds) async {
    try {
      if (courseIds.isEmpty) {
        wishlistCourses.clear();
        return;
      }

      isLoading.value = true;
      final courses = <Course>[];

      for (final courseId in courseIds) {
        try {
          final course = await _courseService.getCourseById(courseId);
          if (course != null) {
            courses.add(course);
          }
        } catch (e) {
          _logger.e('Error loading course $courseId: $e');
        }
      }

      wishlistCourses.value = courses;
      _applySorting();
      _logger.i('Loaded ${courses.length} wishlist courses');
    } catch (e) {
      errorMessage.value = _courseService.parseError(e);
      _logger.e('Error loading wishlist courses: $e');
    } finally {
      isLoading.value = false;
    }
  }

  /// Add course to wishlist
  Future<bool> addCourse(Course course) async {
    try {
      final uid = _authController.currentUser.value?.uid;
      if (uid == null) {
        errorMessage.value = 'User not authenticated';
        return false;
      }

      await _firestoreService.addCourseToWishlist(uid: uid, courseId: course.id);
      _logger.i('Course added to wishlist: ${course.degree}');
      return true;
    } catch (e) {
      errorMessage.value = _firestoreService.parseError(e);
      _logger.e('Error adding course: $e');
      return false;
    }
  }

  /// Remove course from wishlist
  Future<bool> removeCourse(String courseId) async {
    try {
      final uid = _authController.currentUser.value?.uid;
      if (uid == null) {
        errorMessage.value = 'User not authenticated';
        return false;
      }

      await _firestoreService.removeCourseFromWishlist(
        uid: uid,
        courseId: courseId,
      );
      _logger.i('Course removed from wishlist');
      return true;
    } catch (e) {
      errorMessage.value = _firestoreService.parseError(e);
      _logger.e('Error removing course: $e');
      return false;
    }
  }

  /// Check if course is in wishlist
  bool isCourseInWishlist(String courseId) {
    return wishlistCourseIds.contains(courseId);
  }

  /// Get wishlist size
  int getWishlistSize() {
    return wishlistCourses.length;
  }

  /// Sort wishlist
  void sortWishlist(String sortOption) {
    sortBy.value = sortOption;
    _applySorting();
  }

  /// Apply sorting
  void _applySorting() {
    final courses = List<Course>.from(wishlistCourses);

    switch (sortBy.value) {
      case 'name':
        courses.sort((a, b) => a.degree.compareTo(b.degree));
        break;
      case 'university':
        courses.sort((a, b) => a.university.compareTo(b.university));
        break;
      case 'closing':
        courses.sort((a, b) => a.closingDate.compareTo(b.closingDate));
        break;
      case 'atar':
        courses.sort((a, b) {
          if (a.atar == null) return 1;
          if (b.atar == null) return -1;
          return b.atar!.compareTo(a.atar!);
        });
        break;
    }

    wishlistCourses.value = courses;
  }

  /// Get courses closing soon from wishlist
  List<Course> getClosingCoursesFromWishlist({int daysThreshold = 30}) {
    final now = DateTime.now();
    final threshold = now.add(Duration(days: daysThreshold));

    return wishlistCourses.where((course) {
      return course.closingDate.isAfter(now) &&
          course.closingDate.isBefore(threshold);
    }).toList()
      ..sort((a, b) => a.closingDate.compareTo(b.closingDate));
  }

  /// Get courses closing within N days from now
  int getCoursesClosingWithinDays(int days) {
    return getClosingCoursesFromWishlist(daysThreshold: days).length;
  }

  /// Export wishlist as text
  String exportWishlistAsText() {
    String text = 'Future Student - Wishlist Export\n';
    text += '${DateTime.now()}\n\n';

    for (final course in wishlistCourses) {
      text += '${course.degree}\n';
      text += '${course.university} - ${course.location}\n';
      text += 'Code: ${course.code}\n';
      if (course.atar != null) text += 'ATAR: ${course.atar}\n';
      text += 'Closes: ${course.closingDate.toString().split(' ')[0]}\n';
      text += '---\n';
    }

    return text;
  }

  /// Get statistics
  Map<String, dynamic> getWishlistStats() {
    return {
      'total': wishlistCourses.length,
      'byUniversity': _countByUniversity(),
      'byField': _countByField(),
      'averageAtar': _calculateAverageAtar(),
      'closingSoon': getCoursesClosingWithinDays(30),
    };
  }

  /// Count courses by university
  Map<String, int> _countByUniversity() {
    final counts = <String, int>{};
    for (final course in wishlistCourses) {
      counts[course.university] = (counts[course.university] ?? 0) + 1;
    }
    return counts;
  }

  /// Count courses by field
  Map<String, int> _countByField() {
    final counts = <String, int>{};
    for (final course in wishlistCourses) {
      if (course.field != null) {
        counts[course.field!] = (counts[course.field!] ?? 0) + 1;
      }
    }
    return counts;
  }

  /// Calculate average ATAR
  double? _calculateAverageAtar() {
    final coursesWithAtar = wishlistCourses.where((c) => c.atar != null).toList();
    if (coursesWithAtar.isEmpty) return null;

    double sum = 0;
    for (final course in coursesWithAtar) {
      sum += course.atar!;
    }
    return sum / coursesWithAtar.length;
  }

  /// Clear error
  void clearError() {
    errorMessage.value = '';
  }

  /// Clear wishlist
  Future<bool> clearAllWishlist() async {
    try {
      final uid = _authController.currentUser.value?.uid;
      if (uid == null) {
        errorMessage.value = 'User not authenticated';
        return false;
      }

      // Delete all wishlist courses
      if (wishlistCourseIds.isNotEmpty) {
        await _firestoreService.deleteWishlistCourses(
          uid: uid,
          courseIds: List<String>.from(wishlistCourseIds),
        );
      }

      wishlistCourses.clear();
      wishlistCourseIds.clear();
      _logger.i('Wishlist cleared');
      return true;
    } catch (e) {
      errorMessage.value = _firestoreService.parseError(e);
      _logger.e('Error clearing wishlist: $e');
      return false;
    }
  }
}
