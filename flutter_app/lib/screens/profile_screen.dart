import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import '../controllers/auth_controller.dart';
import '../controllers/profile_controller.dart';
import '../models/student_profile_model.dart';
import '../main.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  late ProfileController profileController;
  late AuthController authController;
  bool isEditMode = false;

  // Form controllers
  late TextEditingController fullNameController;
  late TextEditingController nesaNumberController;
  late TextEditingController schoolNameController;
  late TextEditingController addressController;
  late TextEditingController uacIdController;
  late TextEditingController usiController;
  late TextEditingController culturalBackgroundController;
  DateTime? selectedDate;
  Sex? selectedSex;

  @override
  void initState() {
    super.initState();
    profileController = Get.find<ProfileController>();
    authController = Get.find<AuthController>();
    _initializeControllers();
  }

  void _initializeControllers() {
    final profile = profileController.studentProfile.value;
    if (profile != null) {
      fullNameController = TextEditingController(text: profile.fullName);
      nesaNumberController = TextEditingController(text: profile.nesaNumber);
      schoolNameController = TextEditingController(text: profile.schoolName);
      addressController = TextEditingController(text: profile.address);
      uacIdController = TextEditingController(text: profile.uacId ?? '');
      usiController = TextEditingController(text: profile.usi ?? '');
      culturalBackgroundController =
          TextEditingController(text: profile.culturalBackground ?? '');
      selectedDate = profile.dateOfBirth;
      selectedSex = profile.sex;
    } else {
      fullNameController = TextEditingController();
      nesaNumberController = TextEditingController();
      schoolNameController = TextEditingController();
      addressController = TextEditingController();
      uacIdController = TextEditingController();
      usiController = TextEditingController();
      culturalBackgroundController = TextEditingController();
    }
  }

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Scaffold(
      appBar: AppBar(
        title: const Text('My Profile'),
        actions: [
          IconButton(
            icon: Icon(isEditMode ? Icons.close : Icons.edit),
            onPressed: () {
              if (isEditMode) {
                _initializeControllers();
              }
              setState(() => isEditMode = !isEditMode);
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
              // User header
              _buildUserHeader(),
              const SizedBox(height: 32),

              // Profile completion
              _buildProfileCompletion(),
              const SizedBox(height: 32),

              // Profile information
              if (!isEditMode) _buildProfileView() else _buildProfileEdit(),

              const SizedBox(height: 32),

              // Action buttons
              _buildActionButtons(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildUserHeader() {
    return Obx(
      () => Center(
        child: Column(
          children: [
            CircleAvatar(
              radius: 60,
              backgroundColor: Theme.of(context).primaryColor.withOpacity(0.1),
              child: Icon(
                Icons.person,
                size: 60,
                color: Theme.of(context).primaryColor,
              ),
            ),
            const SizedBox(height: 16),
            Text(
              authController.currentUser.value?.displayName ?? 'Student',
              style: Theme.of(context).textTheme.displaySmall,
            ),
            const SizedBox(height: 4),
            Text(
              authController.currentUser.value?.email ?? 'email@example.com',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
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
                            color: Theme.of(context).primaryColor,
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
                const SizedBox(height: 8),
                if (percentage < 100)
                  Text(
                    'Complete your profile to unlock all features',
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: Colors.grey,
                        ),
                  ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildProfileView() {
    return Obx(
      () {
        final profile = profileController.studentProfile.value;
        if (profile == null) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.person_add,
                  size: 80,
                  color: Colors.grey[300],
                ),
                const SizedBox(height: 16),
                Text(
                  'No profile information yet',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const SizedBox(height: 8),
                Text(
                  'Complete your profile to get started',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ],
            ),
          );
        }

        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildProfileSection('Personal Information', [
              _buildProfileItem('Full Name', profile.fullName),
              _buildProfileItem('NESA Number', profile.nesaNumber),
              _buildProfileItem('Date of Birth',
                  DateFormat('dd/MM/yyyy').format(profile.dateOfBirth)),
              _buildProfileItem('Gender', _sexToString(profile.sex)),
            ]),
            const SizedBox(height: 24),
            _buildProfileSection('Education Details', [
              _buildProfileItem('Student Type', profile.userType),
              _buildProfileItem('School', profile.schoolName),
              if (profile.uacId != null && profile.uacId!.isNotEmpty)
                _buildProfileItem('UAC ID', profile.uacId!),
              if (profile.usi != null && profile.usi!.isNotEmpty)
                _buildProfileItem('USI', profile.usi!),
            ]),
            const SizedBox(height: 24),
            _buildProfileSection('Address', [
              _buildProfileItem('Address', profile.address),
            ]),
            const SizedBox(height: 24),
            _buildProfileSection('Additional Information', [
              _buildProfileItem(
                'First in Family',
                profile.firstInFamily ?? false ? 'Yes' : 'No',
              ),
              _buildProfileItem(
                'Indigenous Australian',
                profile.indigenous ?? false ? 'Yes' : 'No',
              ),
              if (profile.culturalBackground != null &&
                  profile.culturalBackground!.isNotEmpty)
                _buildProfileItem('Cultural Background', profile.culturalBackground!),
            ]),
          ],
        );
      },
    );
  }

  Widget _buildProfileSection(String title, List<Widget> items) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
              ),
        ),
        const SizedBox(height: 12),
        ...items,
      ],
    );
  }

  Widget _buildProfileItem(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            flex: 2,
            child: Text(
              label,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Colors.grey,
              ),
            ),
          ),
          Expanded(
            flex: 3,
            child: Text(
              value,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProfileEdit() {
    return Obx(
      () => Form(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Edit Profile',
              style: Theme.of(context).textTheme.displaySmall,
            ),
            const SizedBox(height: 24),
            Text(
              'Personal Information',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: fullNameController,
              decoration: InputDecoration(
                labelText: 'Full Name',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: nesaNumberController,
              decoration: InputDecoration(
                labelText: 'NESA Number',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),
            const SizedBox(height: 12),
            InkWell(
              onTap: _selectDate,
              child: InputDecorator(
                decoration: InputDecoration(
                  labelText: 'Date of Birth',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                ),
                child: Text(
                  selectedDate != null
                      ? DateFormat('dd/MM/yyyy').format(selectedDate!)
                      : 'Select date',
                ),
              ),
            ),
            const SizedBox(height: 24),
            Text(
              'Education Details',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: schoolNameController,
              decoration: InputDecoration(
                labelText: 'School Name',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: addressController,
              maxLines: 2,
              decoration: InputDecoration(
                labelText: 'Address',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: uacIdController,
              decoration: InputDecoration(
                labelText: 'UAC ID (Optional)',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: usiController,
              decoration: InputDecoration(
                labelText: 'USI (Optional)',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),
            const SizedBox(height: 24),
            Text(
              'Additional Information',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: culturalBackgroundController,
              maxLines: 2,
              decoration: InputDecoration(
                labelText: 'Cultural Background (Optional)',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              ),
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: profileController.isLoading.value ? null : _saveProfile,
                child: profileController.isLoading.value
                    ? const SizedBox(
                        height: 20,
                        width: 20,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Text('Save Changes'),
              ),
            ),
            if (profileController.errorMessage.value.isNotEmpty)
              Padding(
                padding: const EdgeInsets.only(top: 16),
                child: Text(
                  profileController.errorMessage.value,
                  style: TextStyle(color: Theme.of(context).colorScheme.error),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionButtons() {
    return Obx(
      () => Column(
        children: [
          SizedBox(
            width: double.infinity,
            child: OutlinedButton(
              onPressed: authController.isLoading.value
                  ? null
                  : () async {
                      await authController.signOut();
                      Get.offNamed(AppRoutes.landing);
                    },
              child: const Text('Sign Out'),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _selectDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: selectedDate ?? DateTime(2006),
      firstDate: DateTime(1990),
      lastDate: DateTime.now(),
    );
    if (picked != null) {
      setState(() => selectedDate = picked);
    }
  }

  Future<void> _saveProfile() async {
    final success = await profileController.updateProfile(
      fullName: fullNameController.text,
      nesaNumber: nesaNumberController.text,
      dateOfBirth: selectedDate,
      sex: selectedSex,
      schoolName: schoolNameController.text,
      address: addressController.text,
      uacId: uacIdController.text.isEmpty ? null : uacIdController.text,
      usi: usiController.text.isEmpty ? null : usiController.text,
      culturalBackground: culturalBackgroundController.text.isEmpty
          ? null
          : culturalBackgroundController.text,
    );

    if (success) {
      setState(() => isEditMode = false);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Profile updated successfully!')),
      );
    }
  }

  String _sexToString(Sex sex) {
    switch (sex) {
      case Sex.male:
        return 'Male';
      case Sex.female:
        return 'Female';
      case Sex.other:
        return 'Other';
    }
  }

  @override
  void dispose() {
    if (isEditMode) {
      fullNameController.dispose();
      nesaNumberController.dispose();
      schoolNameController.dispose();
      addressController.dispose();
      uacIdController.dispose();
      usiController.dispose();
      culturalBackgroundController.dispose();
    }
    super.dispose();
  }
}
