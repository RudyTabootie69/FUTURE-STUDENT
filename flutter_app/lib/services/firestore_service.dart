import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:logger/logger.dart';
import '../models/student_profile_model.dart';

class FirestoreService {
  final FirebaseFirestore _firestore;
  final Logger _logger = Logger();

  FirestoreService({FirebaseFirestore? firestore})
      : _firestore = firestore ?? FirebaseFirestore.instance;

  // ==================== USER OPERATIONS ====================

  /// Create user document
  Future<void> createUserDocument({
    required String uid,
    required String email,
    String? displayName,
  }) async {
    try {
      _logger.i('Creating user document for $uid');
      await _firestore.collection('users').doc(uid).set({
        'email': email,
        'displayName': displayName,
        'createdAt': FieldValue.serverTimestamp(),
        'updatedAt': FieldValue.serverTimestamp(),
      });
      _logger.i('User document created successfully');
    } catch (e) {
      _logger.e('Error creating user document: $e');
      rethrow;
    }
  }

  /// Get user document
  Future<DocumentSnapshot> getUserDocument(String uid) async {
    try {
      _logger.i('Fetching user document for $uid');
      return await _firestore.collection('users').doc(uid).get();
    } catch (e) {
      _logger.e('Error fetching user document: $e');
      rethrow;
    }
  }

  /// Update user document
  Future<void> updateUserDocument(
    String uid,
    Map<String, dynamic> data,
  ) async {
    try {
      _logger.i('Updating user document for $uid');
      data['updatedAt'] = FieldValue.serverTimestamp();
      await _firestore.collection('users').doc(uid).update(data);
      _logger.i('User document updated successfully');
    } catch (e) {
      _logger.e('Error updating user document: $e');
      rethrow;
    }
  }

  // ==================== PROFILE OPERATIONS ====================

  /// Create student profile
  Future<void> createProfile({
    required String uid,
    required StudentProfile profile,
  }) async {
    try {
      _logger.i('Creating student profile for $uid');
      await _firestore.collection('profiles').doc(uid).set(
            profile.toFirestore(),
          );
      _logger.i('Profile created successfully');
    } catch (e) {
      _logger.e('Error creating profile: $e');
      rethrow;
    }
  }

  /// Get student profile
  Future<StudentProfile?> getProfile(String uid) async {
    try {
      _logger.i('Fetching profile for $uid');
      final doc = await _firestore.collection('profiles').doc(uid).get();

      if (!doc.exists) {
        _logger.i('Profile does not exist for $uid');
        return null;
      }

      return StudentProfile.fromFirestore(doc);
    } catch (e) {
      _logger.e('Error fetching profile: $e');
      rethrow;
    }
  }

  /// Update student profile
  Future<void> updateProfile({
    required String uid,
    required StudentProfile profile,
  }) async {
    try {
      _logger.i('Updating profile for $uid');
      await _firestore.collection('profiles').doc(uid).set(
            profile.toFirestore(),
            SetOptions(merge: true),
          );
      _logger.i('Profile updated successfully');
    } catch (e) {
      _logger.e('Error updating profile: $e');
      rethrow;
    }
  }

  /// Stream of profile changes
  Stream<StudentProfile?> watchProfile(String uid) {
    return _firestore
        .collection('profiles')
        .doc(uid)
        .snapshots()
        .map((doc) {
      if (!doc.exists) return null;
      return StudentProfile.fromFirestore(doc);
    }).handleError((error) {
      _logger.e('Error watching profile: $error');
    });
  }

  // ==================== WISHLIST OPERATIONS ====================

  /// Add course to wishlist
  Future<void> addCourseToWishlist({
    required String uid,
    required String courseId,
  }) async {
    try {
      _logger.i('Adding course $courseId to wishlist for $uid');
      await _firestore.collection('wishlists').doc(uid).set(
        {
          'courses': FieldValue.arrayUnion([courseId]),
          'updatedAt': FieldValue.serverTimestamp(),
        },
        SetOptions(merge: true),
      );
      _logger.i('Course added to wishlist');
    } catch (e) {
      _logger.e('Error adding course to wishlist: $e');
      rethrow;
    }
  }

  /// Remove course from wishlist
  Future<void> removeCourseFromWishlist({
    required String uid,
    required String courseId,
  }) async {
    try {
      _logger.i('Removing course $courseId from wishlist for $uid');
      await _firestore.collection('wishlists').doc(uid).update({
        'courses': FieldValue.arrayRemove([courseId]),
        'updatedAt': FieldValue.serverTimestamp(),
      });
      _logger.i('Course removed from wishlist');
    } catch (e) {
      _logger.e('Error removing course from wishlist: $e');
      rethrow;
    }
  }

  /// Get wishlist course IDs
  Future<List<String>> getWishlistCourseIds(String uid) async {
    try {
      _logger.i('Fetching wishlist for $uid');
      final doc = await _firestore.collection('wishlists').doc(uid).get();

      if (!doc.exists) {
        return [];
      }

      final courses = doc.data()?['courses'] as List? ?? [];
      return courses.cast<String>();
    } catch (e) {
      _logger.e('Error fetching wishlist: $e');
      rethrow;
    }
  }

  /// Stream of wishlist changes
  Stream<List<String>> watchWishlist(String uid) {
    return _firestore
        .collection('wishlists')
        .doc(uid)
        .snapshots()
        .map((doc) {
      if (!doc.exists) return [];
      final courses = doc.data()?['courses'] as List? ?? [];
      return courses.cast<String>();
    }).handleError((error) {
      _logger.e('Error watching wishlist: $error');
    });
  }

  // ==================== CONTACT OPERATIONS ====================

  /// Submit contact form
  Future<void> submitContactForm({
    required String name,
    required String email,
    required String message,
  }) async {
    try {
      _logger.i('Submitting contact form from $email');
      await _firestore.collection('contact_submissions').add({
        'name': name,
        'email': email,
        'message': message,
        'createdAt': FieldValue.serverTimestamp(),
      });
      _logger.i('Contact form submitted successfully');
    } catch (e) {
      _logger.e('Error submitting contact form: $e');
      rethrow;
    }
  }

  // ==================== TRANSACTION OPERATIONS ====================

  /// Batch delete wishlist courses
  Future<void> deleteWishlistCourses({
    required String uid,
    required List<String> courseIds,
  }) async {
    try {
      _logger.i('Deleting ${courseIds.length} courses from wishlist for $uid');

      final batch = _firestore.batch();
      final wishlistRef = _firestore.collection('wishlists').doc(uid);

      batch.update(wishlistRef, {
        'courses': FieldValue.arrayRemove(courseIds),
        'updatedAt': FieldValue.serverTimestamp(),
      });

      await batch.commit();
      _logger.i('Wishlist courses deleted successfully');
    } catch (e) {
      _logger.e('Error deleting wishlist courses: $e');
      rethrow;
    }
  }

  // ==================== ERROR HANDLING ====================

  /// Parse Firestore error messages
  String parseError(Object error) {
    if (error.toString().contains('permission-denied')) {
      return 'Permission denied. Please check your authentication.';
    } else if (error.toString().contains('not-found')) {
      return 'Document not found.';
    } else if (error.toString().contains('already-exists')) {
      return 'Document already exists.';
    } else if (error.toString().contains('failed-precondition')) {
      return 'Operation failed. Please try again.';
    } else if (error.toString().contains('unavailable')) {
      return 'Service unavailable. Please check your internet connection.';
    }
    return 'An error occurred. Please try again.';
  }
}
