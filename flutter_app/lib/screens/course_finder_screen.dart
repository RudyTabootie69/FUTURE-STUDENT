import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import '../controllers/course_controller.dart';
import '../controllers/auth_controller.dart';
import '../models/course_model.dart';
import '../theme/app_theme.dart';

class CourseFinderScreen extends StatefulWidget {
  const CourseFinderScreen({Key? key}) : super(key: key);

  @override
  State<CourseFinderScreen> createState() => _CourseFinderScreenState();
}

class _CourseFinderScreenState extends State<CourseFinderScreen> {
  late CourseController courseController;
  late AuthController authController;
  final searchController = TextEditingController();
  bool showFilters = false;
  String? sortBy = 'name';

  @override
  void initState() {
    super.initState();
    courseController = Get.put(CourseController());
    authController = Get.find<AuthController>();
  }

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Find Courses'),
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.tune),
            onPressed: () => setState(() => showFilters = !showFilters),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(isMobile ? 16 : 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Search bar
              _buildSearchBar(),
              const SizedBox(height: 16),

              // Filters
              if (showFilters) ...[
                _buildFiltersSection(),
                const SizedBox(height: 16),
              ],

              // Results header
              Obx(
                () => Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      '${courseController.filteredCourses.length} Courses Found',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    if (courseController.getActiveFilterCount() > 0)
                      Chip(
                        label: Text(
                          '${courseController.getActiveFilterCount()} Active',
                          style: const TextStyle(color: Colors.white),
                        ),
                        backgroundColor: Theme.of(context).primaryColor,
                        onDeleted: courseController.clearAllFilters,
                      ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Sort options
              _buildSortOptions(),
              const SizedBox(height: 16),

              // Courses list
              Obx(
                () {
                  if (courseController.isLoading.value) {
                    return const Center(
                      child: CircularProgressIndicator(),
                    );
                  }

                  if (courseController.filteredCourses.isEmpty) {
                    return Center(
                      child: Padding(
                        padding: const EdgeInsets.all(24),
                        child: Column(
                          children: [
                            Icon(
                              Icons.search_off,
                              size: 80,
                              color: Colors.grey[300],
                            ),
                            const SizedBox(height: 16),
                            Text(
                              'No Courses Found',
                              style: Theme.of(context).textTheme.titleLarge,
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Try adjusting your filters',
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
                    itemCount: courseController.filteredCourses.length,
                    itemBuilder: (context, index) {
                      final course = courseController.filteredCourses[index];
                      return _buildCourseCard(context, course, isMobile);
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

  Widget _buildSearchBar() {
    return TextField(
      controller: searchController,
      onChanged: courseController.searchCourses,
      decoration: InputDecoration(
        hintText: 'Search courses...',
        prefixIcon: const Icon(Icons.search),
        suffixIcon: searchController.text.isNotEmpty
            ? IconButton(
                icon: const Icon(Icons.clear),
                onPressed: () {
                  searchController.clear();
                  courseController.searchCourses('');
                },
              )
            : null,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    );
  }

  Widget _buildFiltersSection() {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Filters',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 16),

            // Field filter
            Text(
              'Field of Study',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w500,
                  ),
            ),
            const SizedBox(height: 8),
            Obx(
              () => Wrap(
                spacing: 8,
                children: [
                  FilterChip(
                    label: const Text('All'),
                    selected: courseController.selectedField.value == null,
                    onSelected: (_) => courseController.setFieldFilter(null),
                  ),
                  ...courseController.allFields.map(
                    (field) => FilterChip(
                      label: Text(field),
                      selected: courseController.selectedField.value == field,
                      onSelected: (_) => courseController.setFieldFilter(field),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // University filter
            Text(
              'University',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w500,
                  ),
            ),
            const SizedBox(height: 8),
            Obx(
              () => DropdownButton<String>(
                isExpanded: true,
                value: courseController.selectedUniversity.value,
                hint: const Text('All Universities'),
                onChanged: courseController.setUniversityFilter,
                items: [
                  const DropdownMenuItem<String>(
                    value: null,
                    child: Text('All Universities'),
                  ),
                  ...courseController.allUniversities.map(
                    (uni) => DropdownMenuItem<String>(
                      value: uni,
                      child: Text(uni),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // ATAR filter
            Text(
              'ATAR Range',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w500,
                  ),
            ),
            const SizedBox(height: 8),
            Obx(
              () => Column(
                children: [
                  RangeSlider(
                    values: RangeValues(
                      courseController.selectedMinAtar.value ??
                          courseController.minAtarFilter.value,
                      courseController.selectedMaxAtar.value ??
                          courseController.maxAtarFilter.value,
                    ),
                    min: courseController.minAtarFilter.value,
                    max: courseController.maxAtarFilter.value,
                    onChanged: (values) {
                      courseController.setAtarFilter(values.start, values.end);
                    },
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Min: ${courseController.selectedMinAtar.value?.toStringAsFixed(1) ?? courseController.minAtarFilter.value.toStringAsFixed(1)}',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                      Text(
                        'Max: ${courseController.selectedMaxAtar.value?.toStringAsFixed(1) ?? courseController.maxAtarFilter.value.toStringAsFixed(1)}',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Clear filters button
            SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                onPressed: () {
                  courseController.clearAllFilters();
                  setState(() => showFilters = false);
                },
                child: const Text('Clear All Filters'),
              ),
            ),
          ],
        ),
      ),
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
        DropdownButton<String>(
          value: sortBy,
          items: const [
            DropdownMenuItem(value: 'name', child: Text('Course Name')),
            DropdownMenuItem(value: 'university', child: Text('University')),
            DropdownMenuItem(value: 'atar_low', child: Text('ATAR (Low to High)')),
            DropdownMenuItem(value: 'atar_high', child: Text('ATAR (High to Low)')),
            DropdownMenuItem(value: 'closing_soon', child: Text('Closing Soon')),
          ],
          onChanged: (value) {
            if (value != null) {
              setState(() => sortBy = value);
              courseController.sortCourses(value);
            }
          },
        ),
      ],
    );
  }

  Widget _buildCourseCard(BuildContext context, Course course, bool isMobile) {
    final isOpen = course.isApplicationOpen();
    final daysLeft = course.getDaysUntilClosing();

    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
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
                  icon: const Icon(Icons.bookmark_border),
                  onPressed: () {
                    final uid = authController.currentUser.value?.uid;
                    if (uid != null) {
                      courseController.addToWishlist(course.id, uid);
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Course added to wishlist!'),
                          duration: Duration(seconds: 2),
                        ),
                      );
                    }
                  },
                ),
              ],
            ),
            const SizedBox(height: 12),

            // Location and code
            Row(
              children: [
                Icon(
                  Icons.location_on,
                  size: 16,
                  color: Colors.grey,
                ),
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
                      color: daysLeft <= 7 ? AppTheme.deadlineBg : AppTheme.eventBg,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      daysLeft <= 0 ? 'Closed' : '$daysLeft days left',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: daysLeft <= 7
                                ? AppTheme.deadlineRed
                                : AppTheme.primaryBlue,
                            fontWeight: FontWeight.w500,
                          ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 12),

            // Status badge
            Row(
              children: [
                if (!isOpen)
                  Chip(
                    label: const Text('Applications Closed'),
                    backgroundColor: AppTheme.deadlineBg,
                    labelStyle: const TextStyle(color: AppTheme.deadlineRed),
                  )
                else
                  Chip(
                    label: const Text('Applications Open'),
                    backgroundColor: AppTheme.startBg,
                    labelStyle: const TextStyle(color: AppTheme.startGreen),
                  ),
              ],
            ),
            const SizedBox(height: 12),

            // Description
            if (course.description != null && course.description!.isNotEmpty)
              Text(
                course.description!,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: Theme.of(context).textTheme.bodySmall,
              ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    searchController.dispose();
    super.dispose();
  }
}
