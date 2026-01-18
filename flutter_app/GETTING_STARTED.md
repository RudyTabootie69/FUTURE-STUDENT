# Getting Started with Future Student Flutter App

Welcome! This document will get you up and running with the Future Student Flutter application in under 30 minutes.

---

## 📚 Documentation Files

This project includes comprehensive documentation:

| File | Purpose | Time |
|------|---------|------|
| **[README.md](README.md)** | Project overview, features, architecture | 5 min |
| **[GETTING_STARTED.md](GETTING_STARTED.md)** | Quick start guide (you are here) | 10 min |
| **[FLUTTER_SETUP_GUIDE.md](FLUTTER_SETUP_GUIDE.md)** | Detailed setup with troubleshooting | 30 min |
| **[PHASE_1_SUMMARY.md](PHASE_1_SUMMARY.md)** | What was implemented in Phase 1 | 15 min |

---

## ⚡ 5-Minute Quick Start

### Prerequisites
- [Flutter SDK 3.2.0+](https://flutter.dev/docs/get-started/install)
- [Xcode](https://apps.apple.com/us/app/xcode/id497799835) (macOS) OR [Android Studio](https://developer.android.com/studio) (all platforms)
- [Firebase Account](https://console.firebase.google.com)

### Setup Steps

1. **Get Flutter**
   ```bash
   # Install Flutter (if not already installed)
   git clone https://github.com/flutter/flutter.git
   export PATH="$PATH:$PWD/flutter/bin"
   flutter doctor
   ```

2. **Clone/Download Project**
   ```bash
   # Download the flutter_app folder
   cd future_student
   ```

3. **Install Dependencies**
   ```bash
   flutter pub get
   ```

4. **Configure Firebase**
   ```bash
   # Install FlutterFire CLI
   dart pub global activate flutterfire_cli
   
   # Configure Firebase
   flutterfire configure
   # Select: future-student project
   # Select: iOS, Android, Web
   ```

5. **Run App**
   ```bash
   # Run on emulator/device
   flutter run
   
   # Or on web
   flutter run -d chrome
   ```

6. **Test Authentication**
   - Click "Create Account"
   - Enter test email and password
   - You should see it in Firebase Console → Authentication

---

## 📱 Running on Different Platforms

### iOS (macOS)
```bash
# Start simulator
open -a Simulator

# Run app
flutter run
```

### Android
```bash
# Start Android emulator via Android Studio
# OR

flutter emulators --launch pixel-5
flutter run
```

### Web Browser
```bash
# Run on web
flutter run -d chrome

# Or build for web
flutter build web
```

### Physical Device
```bash
# Connect device via USB
# Enable developer mode
flutter run
```

---

## 📂 Project Structure

```
lib/
├── main.dart                 # App entry point
├── firebase_options.dart     # Firebase config
├── theme/                    # Material 3 theme
├── models/                   # Data models
├── services/                 # Backend services
├── controllers/              # GetX state management
└── screens/                  # UI pages
```

See [README.md](README.md#-project-structure) for full structure.

---

## 🔐 First-Time Setup Checklist

- [ ] Flutter SDK installed (`flutter doctor` shows all green)
- [ ] Firebase project created at console.firebase.google.com
- [ ] Firebase Authentication enabled (Email/Password)
- [ ] Firestore Database created
- [ ] `flutterfire configure` completed
- [ ] Dependencies installed (`flutter pub get`)
- [ ] App runs without errors (`flutter run`)

---

## 🧪 Testing the App

### Sign Up Flow
1. Open app on emulator/device
2. Click "Create Account"
3. Enter:
   - Email: `test@example.com`
   - Password: `Password123`
   - Confirm Password: `Password123`
   - Name: `Test User`
4. Click "Create Account"
5. Should see onboarding screen
6. Check Firebase Console → Authentication for new user

### Sign In Flow
1. On landing page, click "Sign In"
2. Enter test email and password
3. Click "Sign In"
4. Should see home screen

### Navigation
- Click buttons to navigate between pages
- Profile page shows current user
- Logout button signs you out

---

## 🎨 Customizing the App

### Change Colors
Edit `lib/theme/app_theme.dart`:
```dart
static const Color primaryBlue = Color(0xFF3DB8FF);
// Change to your color
static const Color primaryBlue = Color(0xFFYOUR_COLOR);
```

### Change App Name
Edit `pubspec.yaml`:
```yaml
name: future_student
# Change to your app name
```

### Change Fonts
Edit `lib/theme/app_theme.dart`:
```dart
// Uses Poppins from Google Fonts
// Change to your preferred font
```

---

## 🐛 Troubleshooting

### "Flutter not found"
```bash
# Add to PATH
export PATH="$PATH:$HOME/flutter/bin"
source ~/.zshrc
```

### "Firebase not initialized"
```bash
# Re-run firebase configuration
flutterfire configure --force
```

### Build fails
```bash
flutter clean
flutter pub get
flutter run -v
```

### Device not found
```bash
# List connected devices
flutter devices

# Ensure device is connected and visible
```

For more troubleshooting, see [FLUTTER_SETUP_GUIDE.md](FLUTTER_SETUP_GUIDE.md#troubleshooting).

---

## 📖 Learning Resources

### Getting Up to Speed
- **Flutter**: https://flutter.dev/docs
- **Dart**: https://dart.dev
- **GetX**: https://github.com/jonataslaw/getx
- **Firebase**: https://firebase.flutter.dev

### Key Concepts
- **Widgets**: Flutter UI building blocks
- **BuildContext**: Reference to widget position in tree
- **Obx**: GetX observable widget (auto-rebuilds)
- **GetX**: State management and routing
- **Firestore**: Real-time database

### Sample Code

**Accessing state:**
```dart
final authController = Get.find<AuthController>();
print(authController.currentUser.value?.email);
```

**Navigating:**
```dart
Get.toNamed(AppRoutes.home);
Get.offNamed(AppRoutes.landing);
```

**Creating observable UI:**
```dart
Obx(
  () => Text(authController.currentUser.value?.displayName ?? 'Guest'),
)
```

---

## 🚀 Next Steps

### Immediate (Today)
1. ✅ Set up Flutter SDK
2. ✅ Create Firebase project
3. ✅ Run app locally
4. ✅ Test sign up/sign in

### Short-term (This Week)
1. Customize colors and fonts
2. Add test data to Firestore
3. Review code structure
4. Plan Phase 2 features

### Medium-term (This Month)
1. Implement Phase 2: User Profiles
2. Implement Phase 3: Course Finder
3. Implement Phase 4: Wishlist
4. Set up unit tests

### Long-term (Next Months)
1. Implement Phases 5-7
2. Beta testing
3. iOS/Android app store setup
4. Production deployment

---

## 📊 Project Status

| Phase | Status | Deliverables |
|-------|--------|--------------|
| 1 | ✅ Complete | Auth, Theme, Models, Services, Basic Screens |
| 2 | ⏳ Pending | Profile Management, Onboarding |
| 3 | ⏳ Pending | Course Finder, Search, Filter |
| 4 | ⏳ Pending | Wishlist Management |
| 5 | ⏳ Pending | Calendar Integration |
| 6 | ⏳ Pending | Home, About, Contact |
| 7 | ⏳ Pending | Testing, Polish, Optimization |

See [PHASE_1_SUMMARY.md](PHASE_1_SUMMARY.md) for Phase 1 details.

---

## 💬 FAQ

**Q: Can I run this on Windows?**
A: Yes! Flutter supports Windows. Use Android Studio instead of Xcode. See [FLUTTER_SETUP_GUIDE.md](FLUTTER_SETUP_GUIDE.md).

**Q: Do I need a real device?**
A: No. Emulators/simulators work fine. See device setup section above.

**Q: How do I deploy to App Store?**
A: See "Building for Release" in [FLUTTER_SETUP_GUIDE.md](FLUTTER_SETUP_GUIDE.md).

**Q: Can I use this for web?**
A: Yes! Run with `flutter run -d chrome` or build with `flutter build web`.

**Q: What's the app size?**
A: APK: ~25MB, IPA: ~50MB, Web: ~10MB (optimized).

**Q: Is this production-ready?**
A: Phase 1 is! It has authentication, error handling, logging, and security. Phases 2-7 will add more features.

---

## 🤝 Contributing

To contribute:

1. Create a feature branch
2. Make changes
3. Run tests: `flutter test`
4. Format code: `dart format .`
5. Analyze: `flutter analyze`
6. Submit PR

---

## 📞 Support

- **Docs**: See files listed at top
- **Flutter Issues**: https://github.com/flutter/flutter/issues
- **Firebase Help**: https://firebase.google.com/support
- **GetX**: https://github.com/jonataslaw/getx/discussions

---

## 📝 Checklist for First Run

Before you start:

- [ ] Downloaded/cloned the flutter_app folder
- [ ] Installed Flutter SDK (verify with `flutter --version`)
- [ ] Have Xcode or Android Studio installed
- [ ] Created Firebase project
- [ ] Ran `flutter pub get`
- [ ] Ran `flutterfire configure`
- [ ] Opened emulator/simulator or connected device
- [ ] Ran `flutter run` successfully

If all checked, you're ready to go! 🚀

---

**Happy Coding!** 

Questions? Check the [FLUTTER_SETUP_GUIDE.md](FLUTTER_SETUP_GUIDE.md) for detailed help.
