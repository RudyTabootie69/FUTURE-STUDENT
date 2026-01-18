# Future Student Flutter App - Complete Setup Guide

This guide will walk you through setting up the Flutter application locally from scratch. Follow these steps carefully to get the app running on iOS, Android, and Web.

## Prerequisites

Before starting, ensure you have:
- A Mac with Xcode (for iOS development) OR Windows/Linux with Android Studio
- Git installed
- A Firebase project (we'll create this together)
- 30-60 minutes to complete the setup

---

## Step 1: Install Flutter SDK

### macOS
```bash
# Download Flutter SDK
curl -O https://storage.googleapis.com/flutter_infra_release/releases/stable/macos/flutter_macos_3.19.0_arm64.zip

# Extract
unzip flutter_macos_3.19.0_arm64.zip

# Add to PATH
export PATH="$PATH:$HOME/flutter/bin"

# Add permanently to ~/.zshrc or ~/.bash_profile
echo 'export PATH="$PATH:$HOME/flutter/bin"' >> ~/.zshrc

# Verify installation
flutter --version
flutter doctor
```

### Windows
1. Download Flutter SDK from https://flutter.dev/docs/get-started/install/windows
2. Extract to `C:\flutter` (or preferred location)
3. Add `C:\flutter\bin` to your system PATH
4. Run `flutter doctor` in PowerShell

### Linux
```bash
# Download
wget https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.19.0.tar.xz

# Extract
tar xf flutter_linux_3.19.0.tar.xz

# Add to PATH
export PATH="$PATH:$HOME/flutter/bin"

# Verify
flutter doctor
```

---

## Step 2: Set Up Android Studio (All Platforms)

1. Download Android Studio from https://developer.android.com/studio
2. Install Android Studio
3. Open Android Studio and complete the Android SDK setup
4. Run `flutter doctor` - all items should show checkmarks

```bash
flutter doctor
```

Expected output:
```
✓ Flutter
✓ Android toolchain
✓ Xcode (if on macOS)
✓ Chrome
```

---

## Step 3: Create Firebase Project

### Step 3a: Create Firebase Project
1. Go to https://console.firebase.google.com
2. Click "Create a project" or "Add project"
3. Name: `future-student`
4. Click through the setup (accept all defaults)
5. Wait for project to be created (~5 minutes)

### Step 3b: Enable Authentication
1. In Firebase Console, go to **Build → Authentication**
2. Click "Get Started"
3. Enable **Email/Password** provider
4. Click "Enable" and save

### Step 3c: Create Firestore Database
1. Go to **Build → Firestore Database**
2. Click "Create Database"
3. Select region: **us-east1** (or closest to you)
4. Start in **Production mode**
5. Click "Create"

### Step 3d: Set Firestore Security Rules
In the Firestore console, go to **Rules** tab and replace with:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Allow reading courses (public)
    match /courses/{courseId} {
      allow read: if true;
    }
    
    // Allow users to read/write their own wishlist
    match /wishlists/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Allow reading contact submissions (write only)
    match /contact_submissions/{document=**} {
      allow write: if true;
    }
  }
}
```

Click "Publish"

---

## Step 4: Download Project Files

The Flutter project structure has been created. Here's what you need to do:

### Option A: Download from Builder.io (Easiest)
1. Download the `flutter_app` folder as a zip file
2. Extract to your desired location
3. Open terminal in the extracted folder

### Option B: Set Up Manually
If you need to set up from scratch:

```bash
# Create Flutter project
flutter create future_student

# Navigate to project
cd future_student

# Delete lib folder and replace with provided files
rm -rf lib
# (Copy the provided lib folder here)

# Copy other files
# Copy pubspec.yaml
# Copy pubspec.lock (if provided)
# Copy analysis_options.yaml (if provided)
```

---

## Step 5: Configure Firebase for iOS/Android/Web

### Step 5a: Install FlutterFire CLI

```bash
# Install FlutterFire CLI
dart pub global activate flutterfire_cli

# Add to PATH if needed
export PATH="$PATH:$HOME/.pub-cache/bin"
```

### Step 5b: Connect Firebase Project

From your Flutter project directory:

```bash
# Configure Firebase
flutterfire configure

# When prompted:
# - Select "future-student" project
# - Select platforms: iOS, Android, Web
# - Answer "Yes" for each setup question
```

This will:
- Download `GoogleService-Info.plist` (iOS)
- Download `google-services.json` (Android)
- Create `firebase_options.dart`

**Important:** Do NOT manually edit `firebase_options.dart` - it's auto-generated.

---

## Step 6: Install Dependencies

```bash
# Get all pub dependencies
flutter pub get

# Update pub dependencies
flutter pub upgrade
```

---

## Step 7: Verify Setup

```bash
# Run doctor to check everything
flutter doctor -v

# Run analysis
flutter analyze

# Run tests (if any)
flutter test
```

---

## Step 8: Run the App

### Run on iOS Simulator
```bash
# Start iOS simulator
open -a Simulator

# Run app
flutter run
```

### Run on Android Emulator
```bash
# Create emulator (if not already done)
flutter emulators --create --name pixel-5

# Start emulator
flutter emulators --launch pixel-5

# Run app
flutter run
```

### Run on Web Browser
```bash
# Enable web support
flutter config --enable-web

# Run on web
flutter run -d web-server

# Or with Chrome
flutter run -d chrome
```

### Run on Physical Device
```bash
# For iOS
flutter run
# (Select your device from list)

# For Android
flutter run
# (Select your device from list)
```

---

## Step 9: Update Firebase Configuration (firebase_options.dart)

After running `flutterfire configure`, your `lib/firebase_options.dart` should be auto-populated. 

**Do NOT edit it manually.** The configuration is specific to your Firebase project and should be automatically generated.

If you see placeholder values, run:
```bash
flutterfire configure --force
```

---

## Step 10: First Run

When you run the app for the first time:

```bash
# Run with verbose output to see any errors
flutter run -v
```

You should see:
1. Landing page with "Future Student" title
2. Sign In and Create Account buttons
3. Try signing up with a test email

---

## Troubleshooting

### "Flutter not found"
```bash
# Check PATH
echo $PATH

# Add to ~/.zshrc or ~/.bash_profile
export PATH="$PATH:$HOME/flutter/bin"

# Source the file
source ~/.zshrc
```

### iOS Build Fails
```bash
# Clean build
flutter clean
rm -rf ios/Pods ios/Podfile.lock
flutter pub get

# Get CocoaPods dependencies
cd ios
pod install
cd ..

# Run again
flutter run
```

### Android Build Fails
```bash
# Clean
flutter clean
flutter pub get

# Rebuild
flutter run --verbose
```

### Firebase Not Initializing
1. Check `firebase_options.dart` is generated correctly
2. Ensure you're using the correct Firebase project
3. Check Firestore security rules are published
4. Check internet connection

### "GradleException" on Android
```bash
# Update Gradle
flutter pub upgrade
flutter clean
flutter pub get
flutter run
```

---

## Project Structure

Once set up, your project should look like:

```
future_student/
├── lib/
│   ├── main.dart
│   ├── theme/
│   │   └── app_theme.dart
│   ├── models/
│   │   ├── user_model.dart
│   │   ├── student_profile_model.dart
│   │   ├── payment_model.dart
│   │   └── course_model.dart
│   ├── controllers/
│   │   ├── auth_controller.dart
│   │   ├── profile_controller.dart
│   │   └── course_controller.dart
│   ├── services/
│   │   ├── firebase_auth_service.dart
│   │   └── firestore_service.dart
│   ├── screens/
│   │   ├── landing_screen.dart
│   │   ├── home_screen.dart
│   │   ├── onboarding_screen.dart
│   │   └── ...other screens
│   └── firebase_options.dart
├── android/
├── ios/
├── web/
├── pubspec.yaml
└── flutter_app.iml
```

---

## Next Steps (Phase 1 Complete!)

Once the app is running:

1. **Test Auth**: Try signing up and signing in
2. **Navigate**: Check that all navigation works
3. **Review Code**: Examine the screen implementations
4. **Customize**: Update colors, fonts, and text to your liking

---

## Running Tests

```bash
# Run unit tests
flutter test

# Run specific test file
flutter test test/controllers/auth_controller_test.dart

# Run with coverage
flutter test --coverage
```

---

## Building for Release

### iOS
```bash
# Build and upload to TestFlight
flutter build ipa --release
```

### Android
```bash
# Build APK
flutter build apk --release

# Build App Bundle (for Play Store)
flutter build appbundle --release
```

### Web
```bash
# Build for web
flutter build web --release

# Output is in build/web/
```

---

## Environment Variables

For sensitive data (API keys, etc.), use environment variables:

1. Create `.env` file in project root:
```
FIREBASE_API_KEY=your_key_here
```

2. Use in code:
```dart
import 'package:flutter_dotenv/flutter_dotenv.dart';

final apiKey = dotenv.env['FIREBASE_API_KEY'];
```

---

## Support & Resources

- **Flutter Docs**: https://flutter.dev/docs
- **Firebase Docs**: https://firebase.flutter.dev
- **GetX Documentation**: https://github.com/jonataslaw/getx
- **Material Design**: https://m3.material.io
- **Dart Language**: https://dart.dev

---

## Common Commands Reference

```bash
# Create new screen
flutter create --template=app my_app

# Format code
dart format .

# Analyze code
flutter analyze

# Get dependencies
flutter pub get

# Update dependencies
flutter pub upgrade

# Clean build
flutter clean

# Run with specific device
flutter run -d <device_id>

# List available devices
flutter devices

# Run specific app target
flutter run -t lib/main.dart
```

---

## Next: Phase 1b - Firebase Setup

Once you've confirmed the app runs:

1. Sign up in the app
2. Check Firebase Console → Authentication
3. You should see your test user created
4. Proceed to Phase 2: Implement ProfileController and Firestore integration

Good luck! 🚀
