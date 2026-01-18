# Future Student - Flutter App

A comprehensive Flutter application for guiding secondary students through tertiary education applications. Built with **Flutter 3.x**, **Firebase**, **GetX**, and **Material Design 3**.

**Status**: Phase 1 - Foundation & Authentication (Complete ✅)

---

## 🚀 Quick Start

### Prerequisites
- Flutter 3.2.0+
- Dart 3.0.0+
- iOS: Xcode 14.0+
- Android: Android Studio + SDK 21+
- Firebase Account

### Setup (5 minutes)
```bash
# 1. Install dependencies
flutter pub get

# 2. Configure Firebase (auto-generates firebase_options.dart)
flutterfire configure

# 3. Run on your device/emulator
flutter run
```

**For detailed setup instructions**, see [FLUTTER_SETUP_GUIDE.md](FLUTTER_SETUP_GUIDE.md)

---

## 📱 Features

### Phase 1: Foundation & Authentication ✅
- ✅ Material 3 theme system
- ✅ Firebase Authentication (Email/Password)
- ✅ GetX state management (AuthController)
- ✅ Landing page with signup/signin
- ✅ Route guards for protected pages
- ✅ Secure token storage

### Phase 2: User Profiles 🔄 (In Progress)
- Student profile creation and editing
- Onboarding flow
- Firestore sync
- Form validation

### Phase 3: Course Finder 📚 (Planned)
- Course list and search
- Advanced filtering (ATAR, field, university)
- Add to wishlist integration
- Course details view

### Phase 4: Wishlist ⭐ (Planned)
- View saved courses
- Remove from wishlist
- Sort and filter saved courses
- Sync with Firestore

### Phase 5: Calendar 📅 (Planned)
- Calendar view with events
- Deadline tracking
- Open day dates
- Offer release dates

### Phase 6: Additional Pages 📄 (Planned)
- Home dashboard
- About page
- Contact form
- Navigation bar/drawer

### Phase 7: Polish & Testing 🔧 (Planned)
- Responsive design
- Unit tests
- Integration tests
- Performance optimization

---

## 📁 Project Structure

```
lib/
├── main.dart                           # App entry point & routing
├── firebase_options.dart               # Firebase configuration
├── theme/
│   └── app_theme.dart                 # Material 3 theme & colors
├── models/
│   ├── user_model.dart                # AppUser model
│   ├── student_profile_model.dart      # StudentProfile model
│   ├── payment_model.dart              # PaymentSummary model
│   └── course_model.dart              # Course model (Phase 3)
├── controllers/
│   ├── auth_controller.dart            # Authentication logic (GetX)
│   ├── profile_controller.dart        # Profile management (Phase 2)
│   ├── course_controller.dart         # Course search/filter (Phase 3)
│   ├── wishlist_controller.dart       # Wishlist management (Phase 4)
│   ├── calendar_controller.dart       # Calendar events (Phase 5)
│   └── contact_controller.dart        # Contact form (Phase 6)
├── services/
│   ├── firebase_auth_service.dart      # Firebase Auth wrapper
│   ├── firestore_service.dart         # Firestore operations (Phase 2)
│   └── course_service.dart            # Course data service (Phase 3)
├── screens/
│   ├── landing_screen.dart             # Landing page
│   ├── home_screen.dart               # Home dashboard
│   ├── onboarding_screen.dart         # Onboarding flow (Phase 2)
│   ├── profile_screen.dart            # Profile page (Phase 2)
│   ├── course_finder_screen.dart      # Course discovery (Phase 3)
│   ├── wishlist_screen.dart           # Wishlist view (Phase 4)
│   ├── calendar_screen.dart           # Calendar view (Phase 5)
│   ├── about_screen.dart              # About page
│   ├── contact_screen.dart            # Contact page
│   └── not_found_screen.dart          # 404 page
├── widgets/                            # Reusable UI components (TODO)
├── utils/                              # Helper functions (TODO)
└── bindings/                           # GetX dependency injection (TODO)
```

---

## 🎨 Design System

### Colors (Material 3)
- **Primary Blue**: `#3DB8FF` (matches React --primary-blue)
- **Success Green**: `#25B372`
- **Error Red**: `#FF4B4B`
- **Warning Orange**: `#FF9800`
- **Background**: `#F7F9FC`

See `lib/theme/app_theme.dart` for complete color palette.

### Typography
- **Font Family**: Poppins, Google Sans
- **Sizes**: 12px-32px with Material 3 scales
- **Weights**: Regular (400), Medium (500), Semi-Bold (600), Bold (700)

---

## 🔐 Authentication Flow

```
Landing Page
    ↓
[Sign In / Sign Up]
    ↓
Firebase Auth (Email/Password)
    ↓
Store token securely (flutter_secure_storage)
    ↓
Redirect to [Onboarding / Home]
```

### Signing Up
1. User enters email, password, name
2. AuthController validates input
3. FirebaseAuthService.signUpWithEmailPassword() called
4. User created in Firebase Auth
5. Token stored in secure storage
6. Redirect to Onboarding

### Signing In
1. User enters email, password
2. FirebaseAuthService.signInWithEmailPassword() called
3. Token stored in secure storage
4. Redirect to Home

---

## 🔄 State Management (GetX)

### AuthController
```dart
// Access in any screen
final authController = Get.find<AuthController>();

// Observable properties (auto-updates UI)
authController.isAuthenticated.value      // bool
authController.currentUser.value          // AppUser?
authController.isLoading.value            // bool
authController.errorMessage.value         // String

// Methods
await authController.signUp(...)
await authController.signIn(...)
await authController.signOut()
```

### Benefits of GetX
- ✅ Reactive programming (UI auto-updates on state change)
- ✅ Simple API (Get.find, Obx, .obs)
- ✅ Route management (Get.toNamed, Get.offNamed)
- ✅ Dependency injection (automatic with Get.put)
- ✅ No boilerplate compared to Provider

---

## 🔗 Firebase Integration

### Collections Structure
```
users/
├── {uid}
│   ├── email: string
│   ├── displayName: string
│   └── createdAt: timestamp

courses/
├── {courseId}
│   ├── university: string
│   ├── degree: string
│   ├── atar: number
│   └── ... (full course data)

wishlists/
├── {uid}
│   └── courses: array[string] (course IDs)
```

### Security Rules
- Users can only read/write their own data
- Courses are publicly readable
- Contact submissions write-only

---

## 🧪 Testing

```bash
# Run all tests
flutter test

# Run specific test
flutter test test/controllers/auth_controller_test.dart

# Run with coverage
flutter test --coverage
```

---

## 📦 Dependencies

### Core
- `flutter` - UI framework
- `get: ^4.6.0` - State management & routing
- `firebase_core: ^2.24.0` - Firebase setup
- `firebase_auth: ^4.14.0` - Authentication

### Database
- `cloud_firestore: ^4.13.0` - Firestore database
- `hive: ^2.2.0` - Local caching

### Storage
- `flutter_secure_storage: ^9.0.0` - Secure token storage
- `shared_preferences: ^2.2.0` - Simple preferences

### UI & Forms
- `google_fonts: ^6.1.0` - Google Fonts
- `table_calendar: ^3.0.0` - Calendar widget
- `form_validator: ^0.0.2` - Form validation
- `intl: ^0.19.0` - Internationalization

### Utilities
- `logger: ^2.0.0` - Logging
- `uuid: ^4.0.0` - UUID generation
- `dio: ^5.3.0` - HTTP client

---

## 🚢 Deployment

### iOS App Store
```bash
flutter build ipa --release
# Upload to App Store Connect
```

### Android Play Store
```bash
flutter build appbundle --release
# Upload to Google Play Console
```

### Web
```bash
flutter build web --release
# Deploy build/web/ folder to hosting
```

---

## 📚 Documentation

- [Flutter Setup Guide](FLUTTER_SETUP_GUIDE.md) - Detailed setup instructions
- [GetX Documentation](https://github.com/jonataslaw/getx) - State management
- [Firebase Docs](https://firebase.flutter.dev) - Firebase integration
- [Material Design 3](https://m3.material.io) - Design system

---

## 🐛 Troubleshooting

### App crashes on startup
- Check `firebase_options.dart` is properly generated
- Verify Firebase Firestore rules are published
- Run `flutter clean && flutter pub get`

### Authentication not working
- Verify Firebase Authentication is enabled
- Check Email/Password provider is enabled in Firebase Console
- Review Firebase Console → Logs for errors

### Build failures
```bash
flutter clean
flutter pub get
flutter pub upgrade
flutter run -v  # Run with verbose output
```

See [FLUTTER_SETUP_GUIDE.md](FLUTTER_SETUP_GUIDE.md) for more troubleshooting.

---

## 📞 Support

- **Questions**: Check GitHub Issues
- **Documentation**: https://flutter.dev/docs
- **Firebase Help**: https://firebase.google.com/support

---

## 📋 Todo / Roadmap

- [ ] Phase 2: User Profiles (Week 1-2)
- [ ] Phase 3: Course Finder (Week 2-3)
- [ ] Phase 4: Wishlist Management (Week 3-4)
- [ ] Phase 5: Calendar Integration (Week 4-5)
- [ ] Phase 6: Additional Pages (Week 5)
- [ ] Phase 7: Testing & Polish (Week 6)
- [ ] Beta Testing
- [ ] Production Release (iOS, Android, Web)

---

## 📄 License

MIT License - See LICENSE file

---

## 🎯 Next Steps

1. **Complete Setup**: Follow [FLUTTER_SETUP_GUIDE.md](FLUTTER_SETUP_GUIDE.md)
2. **Run App**: `flutter run`
3. **Test Auth**: Sign up with test email
4. **Review Code**: Explore each screen and controller
5. **Start Phase 2**: Implement ProfileController and Firestore integration

Good luck! 🚀
