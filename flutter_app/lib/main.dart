import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';
import 'theme/app_theme.dart';
import 'controllers/auth_controller.dart';
import 'screens/landing_screen.dart';
import 'screens/home_screen.dart';
import 'screens/onboarding_screen.dart';
import 'screens/course_finder_screen.dart';
import 'screens/wishlist_screen.dart';
import 'screens/calendar_screen.dart';
import 'screens/profile_screen.dart';
import 'screens/about_screen.dart';
import 'screens/contact_screen.dart';
import 'screens/not_found_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Firebase
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Future Student',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
      initialRoute: AppRoutes.landing,
      defaultTransition: Transition.rightToLeft,
      transitionDuration: const Duration(milliseconds: 300),
      getPages: AppPages.pages,
      home: GetBuilder<AuthController>(
        init: AuthController(),
        builder: (authController) {
          return authController.isAuthenticated.value
              ? const HomeScreen()
              : const LandingScreen();
        },
      ),
      unknownRoute: GetPage(
        name: '/notfound',
        page: () => const NotFoundScreen(),
      ),
    );
  }
}

/// App Routes - centralized route definitions
class AppRoutes {
  static const String landing = '/';
  static const String home = '/home';
  static const String onboarding = '/onboarding';
  static const String courseFinder = '/course-finder';
  static const String wishlist = '/wishlist';
  static const String calendar = '/calendar';
  static const String profile = '/profile';
  static const String about = '/about';
  static const String contact = '/contact';
}

/// App Pages - routing configuration
class AppPages {
  static final pages = [
    GetPage(
      name: AppRoutes.landing,
      page: () => const LandingScreen(),
      transition: Transition.fade,
    ),
    GetPage(
      name: AppRoutes.home,
      page: () => const HomeScreen(),
      middlewares: [AuthMiddleware()],
    ),
    GetPage(
      name: AppRoutes.onboarding,
      page: () => const OnboardingScreen(),
      middlewares: [AuthMiddleware()],
    ),
    GetPage(
      name: AppRoutes.courseFinder,
      page: () => const CourseFinderScreen(),
      middlewares: [AuthMiddleware()],
    ),
    GetPage(
      name: AppRoutes.wishlist,
      page: () => const WishlistScreen(),
      middlewares: [AuthMiddleware()],
    ),
    GetPage(
      name: AppRoutes.calendar,
      page: () => const CalendarScreen(),
      middlewares: [AuthMiddleware()],
    ),
    GetPage(
      name: AppRoutes.profile,
      page: () => const ProfileScreen(),
      middlewares: [AuthMiddleware()],
    ),
    GetPage(
      name: AppRoutes.about,
      page: () => const AboutScreen(),
    ),
    GetPage(
      name: AppRoutes.contact,
      page: () => const ContactScreen(),
    ),
  ];
}

/// Middleware to guard protected routes
class AuthMiddleware extends GetMiddleware {
  @override
  RouteSettings? redirect(String? route) {
    final authController = Get.find<AuthController>();
    if (!authController.isAuthenticated.value) {
      return const RouteSettings(name: AppRoutes.landing);
    }
    return null;
  }
}
