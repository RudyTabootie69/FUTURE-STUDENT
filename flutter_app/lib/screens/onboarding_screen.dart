import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../main.dart';

class OnboardingScreen extends StatelessWidget {
  const OnboardingScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Complete Your Profile'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.person_add,
                size: 80,
                color: Theme.of(context).primaryColor,
              ),
              const SizedBox(height: 24),
              Text(
                'Complete Your Profile',
                style: Theme.of(context).textTheme.displaySmall,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              Text(
                'Add your information to get personalized recommendations',
                style: Theme.of(context).textTheme.bodyLarge,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 40),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () => Get.toNamed(AppRoutes.profile),
                  child: const Text('Start Onboarding'),
                ),
              ),
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: OutlinedButton(
                  onPressed: () => Get.offNamed(AppRoutes.home),
                  child: const Text('Skip for Now'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
