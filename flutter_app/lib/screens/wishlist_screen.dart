import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import '../controllers/wishlist_controller.dart';
import '../theme/app_theme.dart';

class WishlistScreen extends StatefulWidget {
  const WishlistScreen({Key? key}) : super(key: key);

  @override
  State<WishlistScreen> createState() => _WishlistScreenState();
}

class _WishlistScreenState extends State<WishlistScreen> {
  late WishlistController wishlistController;

  @override
  void initState() {
    super.initState();
    wishlistController = Get.put(WishlistController());
  }

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Scaffold(
      appBar: AppBar(
        title: const Text('My Wishlist'),
        elevation: 0,
        actions: [
          Obx(
            () => wishlistController.wishlistCourses.isNotEmpty
                ? PopupMenuButton(
                    itemBuilder: (context) => [
                      const PopupMenuItem(
                        value: 'export',
                        child: Text('Export'),
                      ),
                      const PopupMenuItem(
                        value: 'clear',
                        child: Text('Clear All'),
                      ),
                    ],
                    onSelected: (value) {
                      if (value == 'export') {
                        _exportWishlist();
                      } else if (value == 'clear') {
                        _showClearDialog();
                      }
                    },
                  )
                : const SizedBox.shrink(),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(isMobile ? 16 : 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Obx(
                () => Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Saved Courses',
                      style: Theme.of(context).textTheme.displaySmall,
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: Theme.of(context).primaryColor,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        wishlistController.getWishlistSize().toString(),
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Statistics
              Obx(
                () {
                  final stats = wishlistController.getWishlistStats();
                  return wishlistController.wishlistCourses.isNotEmpty
                      ? _buildStatistics(context, stats)
                      : const SizedBox.shrink();
                },
              ),
              const SizedBox(height: 24),

              // Sort options
              Obx(
                () => wishlistController.wishlistCourses.isNotEmpty
                    ? _buildSortOptions()
                    : const SizedBox.shrink(),
              ),
              const SizedBox(height: 16),

              // Courses list
              Obx(
                () {
                  if (wishlistController.isLoading.value) {
                    return const Center(
                      child: CircularProgressIndicator(),
                    );
                  }

                  if (wishlistController.wishlistCourses.isEmpty) {
                    return Center(
                      child: Padding(
                        padding: const EdgeInsets.all(24),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.bookmark_border,
                              size: 80,
                              color: Colors.grey[300],
                            ),
                            const SizedBox(height: 16),
                            Text(
                              'No Saved Courses',
                              style: Theme.of(context).textTheme.titleLarge,
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Find courses and add them to your wishlist',
                              style: Theme.of(context).textTheme.bodyMedium,
                            ),
                          ],
                        ),
                      ),
                    );
                  }

                  return ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: wishlistController.wishlistCourses.length,
                    itemBuilder: (context, index) {
                      final course = wishlistController.wishlistCourses[index];
                      return _buildWishlistCard(context, course, isMobile);
                    },
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStatistics(BuildContext context, Map<String, dynamic> stats) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Your Statistics',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildStatItem(
                  context,
                  Icons.school,
                  'Total',
                  stats['total'].toString(),
                  Colors.blue,
                ),
                _buildStatItem(
                  context,
                  Icons.timer,
                  'Closing Soon',
                  stats['closingSoon'].toString(),
                  Colors.red,
                ),
                if (stats['averageAtar'] != null)
                  _buildStatItem(
                    context,
                    Icons.trending_up,
                    'Avg ATAR',
                    stats['averageAtar'].toStringAsFixed(1),
                    Colors.green,
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatItem(BuildContext context, IconData icon, String label,
      String value, Color color) {
    return Column(
      children: [
        Icon(icon, color: color, size: 24),
        const SizedBox(height: 8),
        Text(
          label,
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: Colors.grey,
              ),
        ),
        const SizedBox(height: 4),
        Text(
          value,
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                color: color,
                fontWeight: FontWeight.bold,
              ),
        ),
      ],
    );
  }

  Widget _buildSortOptions() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          'Sort by:',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
        Obx(
          () => DropdownButton<String>(
            value: wishlistController.sortBy.value,
            items: const [
              DropdownMenuItem(value: 'name', child: Text('Course Name')),
              DropdownMenuItem(value: 'university', child: Text('University')),
              DropdownMenuItem(value: 'closing', child: Text('Closing Soon')),
              DropdownMenuItem(value: 'atar', child: Text('ATAR (High to Low)')),
            ],
            onChanged: (value) {
              if (value != null) {
                wishlistController.sortWishlist(value);
              }
            },
          ),
        ),
      ],
    );
  }

  Widget _buildWishlistCard(BuildContext context, dynamic course, bool isMobile) {
    final daysLeft = course.getDaysUntilClosing();
    final isClosingSoon = daysLeft != null && daysLeft <= 7;

    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header with delete button
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        course.university,
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              color: Colors.grey,
                            ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        course.degree,
                        style: Theme.of(context).textTheme.titleLarge,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.delete_outline, color: Colors.red),
                  onPressed: () => _showDeleteDialog(context, course),
                ),
              ],
            ),
            const SizedBox(height: 12),

            // Location and code
            Row(
              children: [
                Icon(Icons.location_on, size: 16, color: Colors.grey),
                const SizedBox(width: 4),
                Text(
                  course.location,
                  style: Theme.of(context).textTheme.bodySmall,
                ),
                const SizedBox(width: 16),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(
                    course.code,
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          fontWeight: FontWeight.w500,
                        ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),

            // ATAR and field
            if (course.atar != null || course.field != null)
              Row(
                children: [
                  if (course.atar != null)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppTheme.eventBg,
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Text(
                        'ATAR: ${course.atar}',
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              color: AppTheme.primaryBlue,
                              fontWeight: FontWeight.w500,
                            ),
                      ),
                    ),
                  const SizedBox(width: 8),
                  if (course.field != null)
                    Chip(
                      label: Text(course.field!),
                      backgroundColor: Colors.grey[200],
                    ),
                ],
              ),
            const SizedBox(height: 12),

            // Dates
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Closes:',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: Colors.grey,
                          ),
                    ),
                    Text(
                      DateFormat('dd MMM yyyy').format(course.closingDate),
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                            fontWeight: FontWeight.w500,
                          ),
                    ),
                  ],
                ),
                if (daysLeft != null)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: isClosingSoon ? AppTheme.deadlineBg : AppTheme.eventBg,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      daysLeft <= 0 ? 'Closed' : '$daysLeft days left',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color:
                                isClosingSoon ? AppTheme.deadlineRed : AppTheme.primaryBlue,
                            fontWeight: FontWeight.w500,
                          ),
                    ),
                  ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _showDeleteDialog(BuildContext context, dynamic course) {
    Get.defaultDialog(
      title: 'Remove Course?',
      content: Column(
        children: [
          Text('Are you sure you want to remove ${course.degree} from your wishlist?'),
        ],
      ),
      textCancel: 'Cancel',
      textConfirm: 'Remove',
      confirmTextColor: Colors.white,
      buttonColor: Colors.red,
      onConfirm: () async {
        final success = await wishlistController.removeCourse(course.id);
        Get.back();
        if (success) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Course removed from wishlist'),
              duration: Duration(seconds: 2),
            ),
          );
        }
      },
    );
  }

  void _showClearDialog() {
    Get.defaultDialog(
      title: 'Clear Wishlist?',
      content: const Column(
        children: [
          Text('Are you sure you want to clear all saved courses?'),
        ],
      ),
      textCancel: 'Cancel',
      textConfirm: 'Clear',
      confirmTextColor: Colors.white,
      buttonColor: Colors.red,
      onConfirm: () async {
        final success = await wishlistController.clearAllWishlist();
        Get.back();
        if (success) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Wishlist cleared'),
              duration: Duration(seconds: 2),
            ),
          );
        }
      },
    );
  }

  void _exportWishlist() {
    final text = wishlistController.exportWishlistAsText();
    Get.snackbar(
      'Export',
      'Wishlist exported (copy to clipboard)',
      duration: const Duration(seconds: 3),
    );
    _copyToClipboard(text);
  }

  void _copyToClipboard(String text) {
    // In production, use flutter/services to copy to clipboard
    print('Export:\n$text');
  }
}
