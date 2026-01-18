import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:logger/logger.dart';
import '../models/user_model.dart';

class FirebaseAuthService {
  final FirebaseAuth _firebaseAuth;
  final FlutterSecureStorage _secureStorage;
  final Logger _logger = Logger();

  FirebaseAuthService({
    FirebaseAuth? firebaseAuth,
    FlutterSecureStorage? secureStorage,
  })  : _firebaseAuth = firebaseAuth ?? FirebaseAuth.instance,
        _secureStorage = secureStorage ?? const FlutterSecureStorage();

  /// Get current user
  AppUser? get currentUser {
    final user = _firebaseAuth.currentUser;
    if (user != null) {
      return AppUser(
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName,
        photoUrl: user.photoURL,
        emailVerified: user.emailVerified,
      );
    }
    return null;
  }

  /// Stream of authentication state changes
  Stream<AppUser?> get authStateChanges => _firebaseAuth.authStateChanges().map(
        (user) => user != null
            ? AppUser(
                uid: user.uid,
                email: user.email ?? '',
                displayName: user.displayName,
                photoUrl: user.photoURL,
                emailVerified: user.emailVerified,
              )
            : null,
      );

  /// Check if user is authenticated
  bool get isAuthenticated => _firebaseAuth.currentUser != null;

  /// Sign up with email and password
  Future<AppUser?> signUpWithEmailPassword({
    required String email,
    required String password,
    String? displayName,
  }) async {
    try {
      _logger.i('Attempting sign up for email: $email');

      final userCredential = await _firebaseAuth.createUserWithEmailAndPassword(
        email: email.trim(),
        password: password,
      );

      final user = userCredential.user;
      if (user != null) {
        // Update display name if provided
        if (displayName != null && displayName.isNotEmpty) {
          await user.updateDisplayName(displayName);
        }

        // Store auth token securely
        final token = await user.getIdToken();
        if (token != null) {
          await _secureStorage.write(key: 'auth_token', value: token);
        }

        _logger.i('Sign up successful for: $email');
        return AppUser(
          uid: user.uid,
          email: user.email ?? '',
          displayName: user.displayName,
          photoUrl: user.photoURL,
          emailVerified: false,
        );
      }
      return null;
    } on FirebaseAuthException catch (e) {
      _logger.e('Firebase Auth Error - Code: ${e.code}, Message: ${e.message}');
      rethrow;
    } catch (e) {
      _logger.e('Unexpected error during sign up: $e');
      rethrow;
    }
  }

  /// Sign in with email and password
  Future<AppUser?> signInWithEmailPassword({
    required String email,
    required String password,
  }) async {
    try {
      _logger.i('Attempting sign in for email: $email');

      final userCredential = await _firebaseAuth.signInWithEmailAndPassword(
        email: email.trim(),
        password: password,
      );

      final user = userCredential.user;
      if (user != null) {
        // Store auth token securely
        final token = await user.getIdToken();
        if (token != null) {
          await _secureStorage.write(key: 'auth_token', value: token);
        }

        _logger.i('Sign in successful for: $email');
        return AppUser(
          uid: user.uid,
          email: user.email ?? '',
          displayName: user.displayName,
          photoUrl: user.photoURL,
          emailVerified: user.emailVerified,
        );
      }
      return null;
    } on FirebaseAuthException catch (e) {
      _logger.e('Firebase Auth Error - Code: ${e.code}, Message: ${e.message}');
      rethrow;
    } catch (e) {
      _logger.e('Unexpected error during sign in: $e');
      rethrow;
    }
  }

  /// Sign out
  Future<void> signOut() async {
    try {
      _logger.i('Signing out user');
      await _firebaseAuth.signOut();
      await _secureStorage.delete(key: 'auth_token');
      _logger.i('Sign out successful');
    } catch (e) {
      _logger.e('Error during sign out: $e');
      rethrow;
    }
  }

  /// Send password reset email
  Future<void> sendPasswordResetEmail(String email) async {
    try {
      _logger.i('Sending password reset email to: $email');
      await _firebaseAuth.sendPasswordResetEmail(email: email.trim());
      _logger.i('Password reset email sent');
    } on FirebaseAuthException catch (e) {
      _logger.e('Firebase Auth Error - Code: ${e.code}, Message: ${e.message}');
      rethrow;
    } catch (e) {
      _logger.e('Error sending password reset email: $e');
      rethrow;
    }
  }

  /// Update user profile
  Future<void> updateUserProfile({
    String? displayName,
    String? photoUrl,
  }) async {
    try {
      final user = _firebaseAuth.currentUser;
      if (user != null) {
        if (displayName != null) {
          await user.updateDisplayName(displayName);
        }
        if (photoUrl != null) {
          await user.updatePhotoURL(photoUrl);
        }
        _logger.i('User profile updated');
      }
    } catch (e) {
      _logger.e('Error updating user profile: $e');
      rethrow;
    }
  }

  /// Verify email
  Future<void> sendEmailVerification() async {
    try {
      final user = _firebaseAuth.currentUser;
      if (user != null && !user.emailVerified) {
        await user.sendEmailVerification();
        _logger.i('Email verification sent');
      }
    } catch (e) {
      _logger.e('Error sending email verification: $e');
      rethrow;
    }
  }

  /// Delete user account
  Future<void> deleteUserAccount() async {
    try {
      _logger.i('Deleting user account');
      await _firebaseAuth.currentUser?.delete();
      await _secureStorage.delete(key: 'auth_token');
      _logger.i('User account deleted');
    } catch (e) {
      _logger.e('Error deleting user account: $e');
      rethrow;
    }
  }

  /// Get stored auth token
  Future<String?> getAuthToken() async {
    try {
      return await _secureStorage.read(key: 'auth_token');
    } catch (e) {
      _logger.e('Error retrieving auth token: $e');
      return null;
    }
  }
}
