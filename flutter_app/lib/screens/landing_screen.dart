import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controllers/auth_controller.dart';
import '../theme/app_theme.dart';
import '../main.dart';

class LandingScreen extends StatefulWidget {
  const LandingScreen({Key? key}) : super(key: key);

  @override
  State<LandingScreen> createState() => _LandingScreenState();
}

class _LandingScreenState extends State<LandingScreen> {
  late AuthController authController;

  @override
  void initState() {
    super.initState();
    authController = Get.put(AuthController());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Navigation Bar
            _buildNavigationBar(context),

            // Hero Section
            _buildHeroSection(context),

            // Features Section
            _buildFeaturesSection(context),

            // CTA Section
            _buildCtaSection(context),

            // Footer
            _buildFooter(context),
          ],
        ),
      ),
    );
  }

  Widget _buildNavigationBar(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      color: AppTheme.bgLight,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            'Future Student',
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          Row(
            children: [
              OutlinedButton(
                onPressed: () => _showSignInDialog(context),
                child: const Text('Sign In'),
              ),
              const SizedBox(width: 12),
              ElevatedButton(
                onPressed: () => _showSignUpDialog(context),
                child: const Text('Create Account'),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildHeroSection(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 20 : 40,
        vertical: isMobile ? 40 : 80,
      ),
      child: isMobile
          ? Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildHeroContent(context),
                const SizedBox(height: 40),
                _buildHeroIllustration(context),
              ],
            )
          : Row(
              children: [
                Expanded(child: _buildHeroContent(context)),
                const SizedBox(width: 40),
                Expanded(child: _buildHeroIllustration(context)),
              ],
            ),
    );
  }

  Widget _buildHeroContent(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Your Journey to Tertiary Education Starts Here',
          style: Theme.of(context).textTheme.displayMedium,
        ),
        const SizedBox(height: 16),
        Text(
          'Welcome to Future Student - the comprehensive platform designed to guide secondary students through every step of the tertiary application process.',
          style: Theme.of(context).textTheme.bodyLarge,
        ),
        const SizedBox(height: 32),
        Row(
          children: [
            ElevatedButton(
              onPressed: () => _showSignUpDialog(context),
              child: const Text('Get Started Free'),
            ),
            const SizedBox(width: 16),
            OutlinedButton(
              onPressed: () {},
              child: const Text('Watch How It Works'),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildHeroIllustration(BuildContext context) {
    return Container(
      height: 300,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            AppTheme.primaryBlue.withOpacity(0.1),
            AppTheme.eventBlue.withOpacity(0.05),
          ],
        ),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Center(
        child: Icon(
          Icons.school,
          size: 150,
          color: AppTheme.primaryBlue.withOpacity(0.3),
        ),
      ),
    );
  }

  Widget _buildFeaturesSection(BuildContext context) {
    final features = [
      ('Streamlined Applications', 'Simplify your university application process'),
      ('Track Your Progress', 'Keep tabs on all your applications in one place'),
      ('Personalised Guidance', 'Get tailored advice for your journey'),
      ('Calendar Integration', 'Never miss an important deadline'),
    ];

    final isMobile = MediaQuery.of(context).size.width < 600;

    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 20 : 40,
        vertical: 60,
      ),
      color: AppTheme.bgSoft,
      child: Column(
        children: [
          Text(
            'Why Choose Future Student?',
            style: Theme.of(context).textTheme.displaySmall,
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 40),
          GridView.count(
            crossAxisCount: isMobile ? 1 : 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisSpacing: 24,
            mainAxisSpacing: 24,
            children: features.map((feature) {
              return Card(
                child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: AppTheme.eventBg,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Icon(
                          Icons.check_circle,
                          color: AppTheme.primaryBlue,
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        feature.$1,
                        style: Theme.of(context).textTheme.titleLarge,
                      ),
                      const SizedBox(height: 8),
                      Text(
                        feature.$2,
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                    ],
                  ),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildCtaSection(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 60),
      color: AppTheme.primaryBlue,
      child: Column(
        children: [
          Text(
            'Ready to Control Your Future?',
            style: Theme.of(context).textTheme.displaySmall?.copyWith(
                  color: Colors.white,
                ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),
          Text(
            'Join thousands of students already using Future Student to navigate their tertiary journey.',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: Colors.white,
                ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 32),
          ElevatedButton(
            onPressed: () => _showSignUpDialog(context),
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.white,
              foregroundColor: AppTheme.primaryBlue,
            ),
            child: const Text('Get Started Now'),
          ),
        ],
      ),
    );
  }

  Widget _buildFooter(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      color: Colors.grey[900],
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              TextButton(
                onPressed: () => Get.toNamed(AppRoutes.about),
                child: const Text('About'),
              ),
              TextButton(
                onPressed: () => Get.toNamed(AppRoutes.contact),
                child: const Text('Contact'),
              ),
              TextButton(
                onPressed: () {},
                child: const Text('Privacy Policy'),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            '© 2024 Future Student. All rights reserved.',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: Colors.grey[400],
                ),
          ),
        ],
      ),
    );
  }

  void _showSignInDialog(BuildContext context) {
    Get.defaultDialog(
      title: 'Sign In',
      content: _buildSignInForm(),
      contentPadding: const EdgeInsets.all(20),
      radius: 8,
    );
  }

  void _showSignUpDialog(BuildContext context) {
    Get.defaultDialog(
      title: 'Create Account',
      content: _buildSignUpForm(),
      contentPadding: const EdgeInsets.all(20),
      radius: 8,
    );
  }

  Widget _buildSignInForm() {
    final emailController = TextEditingController();
    final passwordController = TextEditingController();

    return Column(
      children: [
        TextField(
          controller: emailController,
          decoration: const InputDecoration(
            labelText: 'Email',
            hintText: 'Enter your email',
          ),
        ),
        const SizedBox(height: 16),
        TextField(
          controller: passwordController,
          obscureText: true,
          decoration: const InputDecoration(
            labelText: 'Password',
            hintText: 'Enter your password',
          ),
        ),
        const SizedBox(height: 24),
        Obx(
          () => SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: authController.isLoading.value
                  ? null
                  : () => _signIn(emailController.text, passwordController.text),
              child: authController.isLoading.value
                  ? const SizedBox(
                      height: 20,
                      width: 20,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : const Text('Sign In'),
            ),
          ),
        ),
        const SizedBox(height: 12),
        Obx(
          () => authController.errorMessage.value.isNotEmpty
              ? Text(
                  authController.errorMessage.value,
                  style: const TextStyle(color: Colors.red),
                )
              : const SizedBox.shrink(),
        ),
      ],
    );
  }

  Widget _buildSignUpForm() {
    final emailController = TextEditingController();
    final passwordController = TextEditingController();
    final confirmPasswordController = TextEditingController();
    final nameController = TextEditingController();

    return Column(
      children: [
        TextField(
          controller: nameController,
          decoration: const InputDecoration(
            labelText: 'Full Name',
            hintText: 'Enter your full name',
          ),
        ),
        const SizedBox(height: 16),
        TextField(
          controller: emailController,
          decoration: const InputDecoration(
            labelText: 'Email',
            hintText: 'Enter your email',
          ),
        ),
        const SizedBox(height: 16),
        TextField(
          controller: passwordController,
          obscureText: true,
          decoration: const InputDecoration(
            labelText: 'Password',
            hintText: 'Create a password',
          ),
        ),
        const SizedBox(height: 16),
        TextField(
          controller: confirmPasswordController,
          obscureText: true,
          decoration: const InputDecoration(
            labelText: 'Confirm Password',
            hintText: 'Confirm your password',
          ),
        ),
        const SizedBox(height: 24),
        Obx(
          () => SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: authController.isLoading.value
                  ? null
                  : () => _signUp(
                        emailController.text,
                        passwordController.text,
                        confirmPasswordController.text,
                        nameController.text,
                      ),
              child: authController.isLoading.value
                  ? const SizedBox(
                      height: 20,
                      width: 20,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : const Text('Create Account'),
            ),
          ),
        ),
        const SizedBox(height: 12),
        Obx(
          () => authController.errorMessage.value.isNotEmpty
              ? Text(
                  authController.errorMessage.value,
                  style: const TextStyle(color: Colors.red),
                )
              : const SizedBox.shrink(),
        ),
      ],
    );
  }

  Future<void> _signIn(String email, String password) async {
    final success = await authController.signIn(
      email: email,
      password: password,
    );
    if (success) {
      Get.back();
      Get.offNamed(AppRoutes.home);
    }
  }

  Future<void> _signUp(
    String email,
    String password,
    String confirmPassword,
    String name,
  ) async {
    final success = await authController.signUp(
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      displayName: name,
    );
    if (success) {
      Get.back();
      Get.offNamed(AppRoutes.onboarding);
    }
  }
}
