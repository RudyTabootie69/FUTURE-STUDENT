import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:logger/logger.dart';
import '../models/course_model.dart';

class CourseService {
  final FirebaseFirestore _firestore;
  final Logger _logger = Logger();

  CourseService({FirebaseFirestore? firestore})
      : _firestore = firestore ?? FirebaseFirestore.instance;

  /// Get all courses
  Future<List<Course>> getAllCourses() async {
    try {
      _logger.i('Fetching all courses');
      final snapshot = await _firestore.collection('courses').get();
      return snapshot.docs.map((doc) => Course.fromFirestore(doc)).toList();
    } catch (e) {
      _logger.e('Error fetching all courses: $e');
      rethrow;
    }
  }

  /// Stream all courses (real-time updates)
  Stream<List<Course>> watchAllCourses() {
    return _firestore.collection('courses').snapshots().map((snapshot) {
      return snapshot.docs.map((doc) => Course.fromFirestore(doc)).toList();
    }).handleError((error) {
      _logger.e('Error watching courses: $error');
    });
  }

  /// Get course by ID
  Future<Course?> getCourseById(String courseId) async {
    try {
      _logger.i('Fetching course: $courseId');
      final doc = await _firestore.collection('courses').doc(courseId).get();
      if (!doc.exists) return null;
      return Course.fromFirestore(doc);
    } catch (e) {
      _logger.e('Error fetching course: $e');
      rethrow;
    }
  }

  /// Search courses by query
  Future<List<Course>> searchCourses(String query) async {
    try {
      _logger.i('Searching courses: $query');
      final lowerQuery = query.toLowerCase();

      final snapshot = await _firestore.collection('courses').get();
      final results = snapshot.docs.where((doc) {
        final course = Course.fromFirestore(doc);
        return course.degree.toLowerCase().contains(lowerQuery) ||
            course.university.toLowerCase().contains(lowerQuery) ||
            course.field?.toLowerCase().contains(lowerQuery) ?? false ||
            course.keywords?.any(
                  (k) => k.toLowerCase().contains(lowerQuery),
                ) ??
                false;
      }).toList();

      return results.map((doc) => Course.fromFirestore(doc)).toList();
    } catch (e) {
      _logger.e('Error searching courses: $e');
      rethrow;
    }
  }

  /// Filter courses by field
  Future<List<Course>> filterByField(String field) async {
    try {
      _logger.i('Filtering courses by field: $field');
      final snapshot = await _firestore
          .collection('courses')
          .where('field', isEqualTo: field)
          .get();
      return snapshot.docs.map((doc) => Course.fromFirestore(doc)).toList();
    } catch (e) {
      _logger.e('Error filtering by field: $e');
      rethrow;
    }
  }

  /// Filter courses by university
  Future<List<Course>> filterByUniversity(String university) async {
    try {
      _logger.i('Filtering courses by university: $university');
      final snapshot = await _firestore
          .collection('courses')
          .where('university', isEqualTo: university)
          .get();
      return snapshot.docs.map((doc) => Course.fromFirestore(doc)).toList();
    } catch (e) {
      _logger.e('Error filtering by university: $e');
      rethrow;
    }
  }

  /// Filter courses by ATAR range
  Future<List<Course>> filterByAtarRange(double minAtar, double maxAtar) async {
    try {
      _logger.i('Filtering courses by ATAR range: $minAtar-$maxAtar');
      final snapshot = await _firestore
          .collection('courses')
          .where('atar', isGreaterThanOrEqualTo: minAtar)
          .where('atar', isLessThanOrEqualTo: maxAtar)
          .get();
      return snapshot.docs.map((doc) => Course.fromFirestore(doc)).toList();
    } catch (e) {
      _logger.e('Error filtering by ATAR: $e');
      rethrow;
    }
  }

  /// Get all unique fields
  Future<List<String>> getAllFields() async {
    try {
      _logger.i('Fetching all fields');
      final snapshot = await _firestore.collection('courses').get();
      final fields = <String>{};
      for (var doc in snapshot.docs) {
        final course = Course.fromFirestore(doc);
        if (course.field != null && course.field!.isNotEmpty) {
          fields.add(course.field!);
        }
      }
      return fields.toList()..sort();
    } catch (e) {
      _logger.e('Error fetching fields: $e');
      rethrow;
    }
  }

  /// Get all unique universities
  Future<List<String>> getAllUniversities() async {
    try {
      _logger.i('Fetching all universities');
      final snapshot = await _firestore.collection('courses').get();
      final universities = <String>{};
      for (var doc in snapshot.docs) {
        final course = Course.fromFirestore(doc);
        universities.add(course.university);
      }
      return universities.toList()..sort();
    } catch (e) {
      _logger.e('Error fetching universities: $e');
      rethrow;
    }
  }

  /// Get ATAR range (min, max)
  Future<({double min, double max})> getAtarRange() async {
    try {
      _logger.i('Fetching ATAR range');
      final snapshot = await _firestore.collection('courses').get();
      double minAtar = double.infinity;
      double maxAtar = 0;

      for (var doc in snapshot.docs) {
        final course = Course.fromFirestore(doc);
        if (course.atar != null) {
          if (course.atar! < minAtar) minAtar = course.atar!;
          if (course.atar! > maxAtar) maxAtar = course.atar!;
        }
      }

      return (
        min: minAtar == double.infinity ? 0 : minAtar,
        max: maxAtar == 0 ? 100 : maxAtar,
      );
    } catch (e) {
      _logger.e('Error fetching ATAR range: $e');
      rethrow;
    }
  }

  /// Get courses closing soon (within N days)
  Future<List<Course>> getClosingCourses({int daysThreshold = 30}) async {
    try {
      _logger.i('Fetching courses closing within $daysThreshold days');
      final snapshot = await _firestore.collection('courses').get();
      final now = DateTime.now();
      final threshold = now.add(Duration(days: daysThreshold));

      final results = snapshot.docs.where((doc) {
        final course = Course.fromFirestore(doc);
        return course.closingDate.isAfter(now) &&
            course.closingDate.isBefore(threshold);
      }).toList();

      return results
          .map((doc) => Course.fromFirestore(doc))
          .toList()
        ..sort((a, b) => a.closingDate.compareTo(b.closingDate));
    } catch (e) {
      _logger.e('Error fetching closing courses: $e');
      rethrow;
    }
  }

  /// Advanced search with multiple filters
  Future<List<Course>> advancedSearch({
    String? query,
    String? field,
    String? university,
    double? minAtar,
    double? maxAtar,
  }) async {
    try {
      _logger.i('Advanced course search');
      var queryRef = _firestore.collection('courses') as Query;

      if (field != null) {
        queryRef = queryRef.where('field', isEqualTo: field);
      }
      if (university != null) {
        queryRef = queryRef.where('university', isEqualTo: university);
      }
      if (minAtar != null) {
        queryRef = queryRef.where('atar', isGreaterThanOrEqualTo: minAtar);
      }
      if (maxAtar != null) {
        queryRef = queryRef.where('atar', isLessThanOrEqualTo: maxAtar);
      }

      final snapshot = await queryRef.get();
      var results = snapshot.docs.map((doc) => Course.fromFirestore(doc)).toList();

      // Apply text search if query provided (client-side)
      if (query != null && query.isNotEmpty) {
        final lowerQuery = query.toLowerCase();
        results = results.where((course) {
          return course.degree.toLowerCase().contains(lowerQuery) ||
              course.university.toLowerCase().contains(lowerQuery) ||
              course.field?.toLowerCase().contains(lowerQuery) ?? false;
        }).toList();
      }

      return results;
    } catch (e) {
      _logger.e('Error in advanced search: $e');
      rethrow;
    }
  }

  /// Create course (admin only in production)
  Future<String> createCourse(Course course) async {
    try {
      _logger.i('Creating course: ${course.degree}');
      final docRef = await _firestore.collection('courses').add(course.toFirestore());
      return docRef.id;
    } catch (e) {
      _logger.e('Error creating course: $e');
      rethrow;
    }
  }

  /// Update course
  Future<void> updateCourse(String courseId, Map<String, dynamic> updates) async {
    try {
      _logger.i('Updating course: $courseId');
      updates['updatedAt'] = FieldValue.serverTimestamp();
      await _firestore.collection('courses').doc(courseId).update(updates);
    } catch (e) {
      _logger.e('Error updating course: $e');
      rethrow;
    }
  }

  /// Parse service errors
  String parseError(Object error) {
    if (error.toString().contains('permission-denied')) {
      return 'Permission denied. Please check your authentication.';
    } else if (error.toString().contains('not-found')) {
      return 'Course not found.';
    } else if (error.toString().contains('unavailable')) {
      return 'Service unavailable. Please check your internet connection.';
    }
    return 'An error occurred. Please try again.';
  }
}
