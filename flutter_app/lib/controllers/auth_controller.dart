import 'package:get/get.dart';
import 'package:logger/logger.dart';
import '../models/user_model.dart';
import '../services/firebase_auth_service.dart';

class AuthController extends GetxController {
  final FirebaseAuthService _authService;
  final Logger _logger = Logger();

  // Observable state
  final Rx<AppUser?> currentUser = Rx<AppUser?>(null);
  final RxBool isLoading = false.obs;
  final RxBool isAuthenticated = false.obs;
  final RxString errorMessage = ''.obs;

  AuthController({FirebaseAuthService? authService})
      : _authService = authService ?? FirebaseAuthService();

  @override
  void onInit() {
    super.onInit();
    _initializeAuth();
  }

  /// Initialize auth state from Firebase
  void _initializeAuth() {
    _authService.authStateChanges.listen((user) {
      currentUser.value = user;
      isAuthenticated.value = user != null;
      _logger.i('Auth state changed: ${user != null ? 'authenticated' : 'not authenticated'}');
    });
  }

  /// Sign up with email and password
  Future<bool> signUp({
    required String email,
    required String password,
    required String confirmPassword,
    String? displayName,
  }) async {
    try {
      // Validate inputs
      if (email.isEmpty || password.isEmpty) {
        errorMessage.value = 'Email and password are required';
        return false;
      }

      if (password != confirmPassword) {
        errorMessage.value = 'Passwords do not match';
        return false;
      }

      if (password.length < 6) {
        errorMessage.value = 'Password must be at least 6 characters';
        return false;
      }

      isLoading.value = true;
      errorMessage.value = '';

      final user = await _authService.signUpWithEmailPassword(
        email: email,
        password: password,
        displayName: displayName,
      );

      if (user != null) {
        currentUser.value = user;
        isAuthenticated.value = true;
        _logger.i('Sign up successful');
        return true;
      } else {
        errorMessage.value = 'Failed to create account';
        return false;
      }
    } catch (e) {
      errorMessage.value = _parseError(e.toString());
      _logger.e('Sign up error: $e');
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  /// Sign in with email and password
  Future<bool> signIn({
    required String email,
    required String password,
  }) async {
    try {
      if (email.isEmpty || password.isEmpty) {
        errorMessage.value = 'Email and password are required';
        return false;
      }

      isLoading.value = true;
      errorMessage.value = '';

      final user = await _authService.signInWithEmailPassword(
        email: email,
        password: password,
      );

      if (user != null) {
        currentUser.value = user;
        isAuthenticated.value = true;
        _logger.i('Sign in successful');
        return true;
      } else {
        errorMessage.value = 'Failed to sign in';
        return false;
      }
    } catch (e) {
      errorMessage.value = _parseError(e.toString());
      _logger.e('Sign in error: $e');
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  /// Sign out
  Future<void> signOut() async {
    try {
      isLoading.value = true;
      await _authService.signOut();
      currentUser.value = null;
      isAuthenticated.value = false;
      errorMessage.value = '';
      _logger.i('Sign out successful');
    } catch (e) {
      errorMessage.value = 'Failed to sign out';
      _logger.e('Sign out error: $e');
    } finally {
      isLoading.value = false;
    }
  }

  /// Send password reset email
  Future<bool> sendPasswordResetEmail(String email) async {
    try {
      if (email.isEmpty) {
        errorMessage.value = 'Email is required';
        return false;
      }

      isLoading.value = true;
      errorMessage.value = '';

      await _authService.sendPasswordResetEmail(email);
      _logger.i('Password reset email sent');
      return true;
    } catch (e) {
      errorMessage.value = _parseError(e.toString());
      _logger.e('Password reset error: $e');
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  /// Send email verification
  Future<bool> sendEmailVerification() async {
    try {
      isLoading.value = true;
      await _authService.sendEmailVerification();
      _logger.i('Email verification sent');
      return true;
    } catch (e) {
      errorMessage.value = 'Failed to send verification email';
      _logger.e('Email verification error: $e');
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  /// Clear error message
  void clearError() {
    errorMessage.value = '';
  }

  /// Parse Firebase error messages
  String _parseError(String error) {
    if (error.contains('email-already-in-use')) {
      return 'This email is already registered';
    } else if (error.contains('weak-password')) {
      return 'Password is too weak';
    } else if (error.contains('invalid-email')) {
      return 'Invalid email address';
    } else if (error.contains('user-not-found')) {
      return 'User not found';
    } else if (error.contains('wrong-password')) {
      return 'Incorrect password';
    } else if (error.contains('too-many-requests')) {
      return 'Too many login attempts. Try again later';
    }
    return 'An error occurred. Please try again';
  }
}
