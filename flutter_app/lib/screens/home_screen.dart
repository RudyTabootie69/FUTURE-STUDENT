import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controllers/auth_controller.dart';
import '../controllers/profile_controller.dart';
import '../controllers/wishlist_controller.dart';
import '../controllers/calendar_controller.dart';
import '../main.dart';
import '../theme/app_theme.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late AuthController authController;
  late ProfileController profileController;
  late WishlistController wishlistController;
  late CalendarController calendarController;

  @override
  void initState() {
    super.initState();
    authController = Get.find<AuthController>();
    profileController = Get.find<ProfileController>();
    wishlistController = Get.put(WishlistController());
    calendarController = Get.put(CalendarController());
  }

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Future Student'),
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.person),
            onPressed: () => Get.toNamed(AppRoutes.profile),
          ),
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () async {
              await authController.signOut();
              Get.offNamed(AppRoutes.landing);
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(isMobile ? 16 : 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Welcome message
              _buildWelcome(),
              const SizedBox(height: 32),

              // Profile completion
              _buildProfileCompletion(),
              const SizedBox(height: 32),

              // Quick stats
              _buildQuickStats(),
              const SizedBox(height: 32),

              // Quick actions
              _buildQuickActions(context, isMobile),
              const SizedBox(height: 32),

              // Next deadline
              _buildNextDeadline(),
              const SizedBox(height: 32),

              // Suggested actions
              _buildSuggestedActions(context, isMobile),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildWelcome() {
    return Obx(
      () => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Welcome back, ${authController.currentUser.value?.displayName?.split(' ').first ?? 'Student'}!',
            style: Theme.of(context).textTheme.displaySmall,
          ),
          const SizedBox(height: 8),
          Text(
            'Here\'s what\'s happening with your applications',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: Colors.grey,
                ),
          ),
        ],
      ),
    );
  }

  Widget _buildProfileCompletion() {
    return Obx(
      () {
        final percentage = profileController.getProfileCompletionPercentage();
        return Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Profile Completion',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    Text(
                      '$percentage%',
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                            color: percentage < 100
                                ? AppTheme.importantOrange
                                : AppTheme.startGreen,
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: percentage / 100,
                    minHeight: 8,
                  ),
                ),
                if (percentage < 100) ...[
                  const SizedBox(height: 12),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () => Get.toNamed(AppRoutes.profile),
                      child: const Text('Complete Profile'),
                    ),
                  ),
                ],
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildQuickStats() {
    return Obx(
      () {
        final wishlistCount = wishlistController.getWishlistSize();
        final stats = calendarController.getCalendarStats();
        final closingSoon =
            calendarController.getUpcomingEvents(days: 30).length;

        return GridView.count(
          crossAxisCount: 3,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 16,
          crossAxisSpacing: 16,
          children: [
            _buildStatCard(
              context,
              Icons.bookmark,
              'Wishlist',
              wishlistCount.toString(),
              AppTheme.eventBlue,
            ),
            _buildStatCard(
              context,
              Icons.schedule,
              'Closing Soon',
              closingSoon.toString(),
              AppTheme.deadlineRed,
            ),
            _buildStatCard(
              context,
              Icons.event,
              'Total Events',
              stats['totalEvents'].toString(),
              AppTheme.primaryBlue,
            ),
          ],
        );
      },
    );
  }

  Widget _buildStatCard(
    BuildContext context,
    IconData icon,
    String label,
    String value,
    Color color,
  ) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 32, color: color),
            const SizedBox(height: 8),
            Text(
              value,
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    color: color,
                    fontWeight: FontWeight.bold,
                  ),
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: Colors.grey,
                  ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildQuickActions(BuildContext context, bool isMobile) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Quick Actions',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        const SizedBox(height: 16),
        GridView.count(
          crossAxisCount: isMobile ? 2 : 4,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          children: [
            _buildActionButton(
              context,
              Icons.search,
              'Find Courses',
              () => Get.toNamed(AppRoutes.courseFinder),
            ),
            _buildActionButton(
              context,
              Icons.bookmark,
              'Wishlist',
              () => Get.toNamed(AppRoutes.wishlist),
            ),
            _buildActionButton(
              context,
              Icons.calendar_today,
              'Calendar',
              () => Get.toNamed(AppRoutes.calendar),
            ),
            _buildActionButton(
              context,
              Icons.person,
              'Profile',
              () => Get.toNamed(AppRoutes.profile),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildActionButton(
    BuildContext context,
    IconData icon,
    String label,
    VoidCallback onTap,
  ) {
    return InkWell(
      onTap: onTap,
      child: Card(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              icon,
              size: 32,
              color: Theme.of(context).primaryColor,
            ),
            const SizedBox(height: 8),
            Text(
              label,
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.bodySmall,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNextDeadline() {
    return Obx(
      () {
        final stats = calendarController.getCalendarStats();
        final nextDeadline = stats['nextDeadline'];

        if (nextDeadline == null) {
          return const SizedBox.shrink();
        }

        final daysLeft = calendarController.getDaysUntil(nextDeadline.date);

        return Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                AppTheme.deadlineBg,
                AppTheme.deadlineBg.withOpacity(0.5),
              ],
            ),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.white,
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  Icons.access_time,
                  color: AppTheme.deadlineRed,
                  size: 24,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Next Deadline',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: AppTheme.deadlineRed,
                            fontWeight: FontWeight.w500,
                          ),
                    ),
                    Text(
                      nextDeadline.title,
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            color: AppTheme.deadlineRed,
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  daysLeft != null ? '$daysLeft days' : 'Today',
                  style: TextStyle(
                    color: AppTheme.deadlineRed,
                    fontWeight: FontWeight.bold,
                    fontSize: 12,
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildSuggestedActions(BuildContext context, bool isMobile) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Suggested Actions',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        const SizedBox(height: 16),
        Obx(
          () {
            final suggestions = <Map<String, dynamic>>[];

            if (profileController.getProfileCompletionPercentage() < 100) {
              suggestions.add({
                'icon': Icons.person,
                'title': 'Complete Your Profile',
                'description': 'Finish setting up your profile to unlock all features',
                'color': AppTheme.importantOrange,
                'action': () => Get.toNamed(AppRoutes.profile),
              });
            }

            if (wishlistController.getWishlistSize() == 0) {
              suggestions.add({
                'icon': Icons.search,
                'title': 'Explore Courses',
                'description': 'Start building your wishlist of courses',
                'color': AppTheme.eventBlue,
                'action': () => Get.toNamed(AppRoutes.courseFinder),
              });
            }

            if (suggestions.isEmpty) {
              return Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Center(
                    child: Column(
                      children: [
                        Icon(
                          Icons.check_circle,
                          size: 48,
                          color: AppTheme.startGreen,
                        ),
                        const SizedBox(height: 12),
                        Text(
                          'You\'re all set!',
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                      ],
                    ),
                  ),
                ),
              );
            }

            return ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: suggestions.length,
              itemBuilder: (context, index) {
                final suggestion = suggestions[index];
                return _buildSuggestionCard(
                  context,
                  suggestion['icon'] as IconData,
                  suggestion['title'] as String,
                  suggestion['description'] as String,
                  suggestion['color'] as Color,
                  suggestion['action'] as VoidCallback,
                );
              },
            );
          },
        ),
      ],
    );
  }

  Widget _buildSuggestionCard(
    BuildContext context,
    IconData icon,
    String title,
    String description,
    Color color,
    VoidCallback onTap,
  ) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: Icon(icon, color: color),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      description,
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: Colors.grey,
                          ),
                    ),
                  ],
                ),
              ),
              Icon(Icons.arrow_forward_ios, size: 16, color: color),
            ],
          ),
        ),
      ),
    );
  }
}
