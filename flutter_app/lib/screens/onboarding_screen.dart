import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import '../controllers/auth_controller.dart';
import '../controllers/profile_controller.dart';
import '../models/student_profile_model.dart';
import '../main.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({Key? key}) : super(key: key);

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  late ProfileController profileController;
  int currentStep = 0;
  final _formKey = GlobalKey<FormState>();

  // Form controllers
  final fullNameController = TextEditingController();
  final nesaNumberController = TextEditingController();
  final schoolNameController = TextEditingController();
  final addressController = TextEditingController();
  final uacIdController = TextEditingController();
  final usiController = TextEditingController();
  DateTime? selectedDate;
  Sex selectedSex = Sex.other;
  String selectedUserType = 'secondary_student';
  bool firstInFamily = false;
  bool indigenous = false;
  final culturalBackgroundController = TextEditingController();

  @override
  void initState() {
    super.initState();
    profileController = Get.put(ProfileController());
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        if (currentStep > 0) {
          setState(() => currentStep--);
          return false;
        }
        return true;
      },
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Complete Your Profile'),
          centerTitle: false,
          elevation: 0,
        ),
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Progress indicator
                _buildProgressIndicator(),
                const SizedBox(height: 32),

                // Form content
                Form(
                  key: _formKey,
                  child: _buildCurrentStep(),
                ),

                const SizedBox(height: 32),

                // Navigation buttons
                _buildNavigationButtons(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildProgressIndicator() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Step ${currentStep + 1} of 4',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            Text(
              '${((currentStep + 1) / 4 * 100).toInt()}%',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
        const SizedBox(height: 12),
        ClipRRect(
          borderRadius: BorderRadius.circular(4),
          child: LinearProgressIndicator(
            value: (currentStep + 1) / 4,
            minHeight: 8,
          ),
        ),
      ],
    );
  }

  Widget _buildCurrentStep() {
    switch (currentStep) {
      case 0:
        return _buildStep1BasicInfo();
      case 1:
        return _buildStep2PersonalInfo();
      case 2:
        return _buildStep3StudentInfo();
      case 3:
        return _buildStep4ReviewAndSubmit();
      default:
        return const SizedBox.shrink();
    }
  }

  // Step 1: Basic Information
  Widget _buildStep1BasicInfo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Basic Information',
          style: Theme.of(context).textTheme.displaySmall,
        ),
        const SizedBox(height: 24),
        TextFormField(
          controller: fullNameController,
          decoration: InputDecoration(
            labelText: 'Full Name *',
            hintText: 'Enter your full name',
            prefixIcon: const Icon(Icons.person),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
          ),
          validator: (value) {
            if (value?.isEmpty ?? true) {
              return 'Full name is required';
            }
            if (value!.length < 2) {
              return 'Full name must be at least 2 characters';
            }
            return null;
          },
        ),
        const SizedBox(height: 16),
        TextFormField(
          controller: nesaNumberController,
          decoration: InputDecoration(
            labelText: 'NESA Number *',
            hintText: 'Enter your NESA number',
            prefixIcon: const Icon(Icons.badge),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
          ),
          validator: (value) {
            if (value?.isEmpty ?? true) {
              return 'NESA number is required';
            }
            return null;
          },
        ),
        const SizedBox(height: 16),
        DropdownButtonFormField<String>(
          value: selectedUserType,
          decoration: InputDecoration(
            labelText: 'Student Type *',
            prefixIcon: const Icon(Icons.school),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
          ),
          items: const [
            DropdownMenuItem(
              value: 'secondary_student',
              child: Text('Secondary Student'),
            ),
            DropdownMenuItem(
              value: 'international_student',
              child: Text('International Student'),
            ),
            DropdownMenuItem(
              value: 'mature_age_student',
              child: Text('Mature Age Student'),
            ),
          ],
          onChanged: (value) {
            setState(() => selectedUserType = value ?? 'secondary_student');
          },
          validator: (value) {
            if (value?.isEmpty ?? true) {
              return 'Student type is required';
            }
            return null;
          },
        ),
      ],
    );
  }

  // Step 2: Personal Information
  Widget _buildStep2PersonalInfo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Personal Information',
          style: Theme.of(context).textTheme.displaySmall,
        ),
        const SizedBox(height: 24),
        TextFormField(
          controller: schoolNameController,
          decoration: InputDecoration(
            labelText: 'School Name *',
            hintText: 'Enter your school name',
            prefixIcon: const Icon(Icons.school),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
          ),
          validator: (value) {
            if (value?.isEmpty ?? true) {
              return 'School name is required';
            }
            return null;
          },
        ),
        const SizedBox(height: 16),
        TextFormField(
          controller: addressController,
          decoration: InputDecoration(
            labelText: 'Address *',
            hintText: 'Enter your residential address',
            prefixIcon: const Icon(Icons.location_on),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
          ),
          maxLines: 2,
          validator: (value) {
            if (value?.isEmpty ?? true) {
              return 'Address is required';
            }
            return null;
          },
        ),
        const SizedBox(height: 16),
        InkWell(
          onTap: _selectDate,
          child: InputDecorator(
            decoration: InputDecoration(
              labelText: 'Date of Birth *',
              prefixIcon: const Icon(Icons.calendar_today),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
            ),
            child: Text(
              selectedDate != null
                  ? DateFormat('dd/MM/yyyy').format(selectedDate!)
                  : 'Select your date of birth',
              style: TextStyle(
                color: selectedDate != null
                    ? Theme.of(context).textTheme.bodyMedium?.color
                    : Colors.grey,
              ),
            ),
          ),
        ),
        const SizedBox(height: 16),
        DropdownButtonFormField<Sex>(
          value: selectedSex,
          decoration: InputDecoration(
            labelText: 'Gender *',
            prefixIcon: const Icon(Icons.person),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
          ),
          items: const [
            DropdownMenuItem(
              value: Sex.male,
              child: Text('Male'),
            ),
            DropdownMenuItem(
              value: Sex.female,
              child: Text('Female'),
            ),
            DropdownMenuItem(
              value: Sex.other,
              child: Text('Other'),
            ),
          ],
          onChanged: (value) {
            setState(() => selectedSex = value ?? Sex.other);
          },
          validator: (value) {
            if (value == null) {
              return 'Gender is required';
            }
            return null;
          },
        ),
      ],
    );
  }

  // Step 3: Student Information
  Widget _buildStep3StudentInfo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Additional Information',
          style: Theme.of(context).textTheme.displaySmall,
        ),
        const SizedBox(height: 24),
        TextFormField(
          controller: uacIdController,
          decoration: InputDecoration(
            labelText: 'UAC ID (Optional)',
            hintText: 'Enter your UAC ID if available',
            prefixIcon: const Icon(Icons.code),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
          ),
        ),
        const SizedBox(height: 16),
        TextFormField(
          controller: usiController,
          decoration: InputDecoration(
            labelText: 'USI (Optional)',
            hintText: 'Enter your USI if available',
            prefixIcon: const Icon(Icons.code),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
          ),
        ),
        const SizedBox(height: 16),
        TextFormField(
          controller: culturalBackgroundController,
          decoration: InputDecoration(
            labelText: 'Cultural Background (Optional)',
            hintText: 'Describe your cultural background',
            prefixIcon: const Icon(Icons.language),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
          ),
          maxLines: 2,
        ),
        const SizedBox(height: 16),
        CheckboxListTile(
          title: const Text('First in family to attend university'),
          value: firstInFamily,
          onChanged: (value) {
            setState(() => firstInFamily = value ?? false);
          },
          controlAffinity: ListTileControlAffinity.leading,
        ),
        CheckboxListTile(
          title: const Text('Indigenous Australian'),
          value: indigenous,
          onChanged: (value) {
            setState(() => indigenous = value ?? false);
          },
          controlAffinity: ListTileControlAffinity.leading,
        ),
      ],
    );
  }

  // Step 4: Review and Submit
  Widget _buildStep4ReviewAndSubmit() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Review Your Information',
          style: Theme.of(context).textTheme.displaySmall,
        ),
        const SizedBox(height: 24),
        _buildReviewCard('Full Name', fullNameController.text),
        _buildReviewCard('NESA Number', nesaNumberController.text),
        _buildReviewCard('Student Type', selectedUserType),
        _buildReviewCard('School', schoolNameController.text),
        _buildReviewCard('Address', addressController.text),
        _buildReviewCard(
          'Date of Birth',
          selectedDate != null ? DateFormat('dd/MM/yyyy').format(selectedDate!) : 'N/A',
        ),
        _buildReviewCard('Gender', _sexToString(selectedSex)),
        if (uacIdController.text.isNotEmpty)
          _buildReviewCard('UAC ID', uacIdController.text),
        if (usiController.text.isNotEmpty)
          _buildReviewCard('USI', usiController.text),
        if (culturalBackgroundController.text.isNotEmpty)
          _buildReviewCard('Cultural Background', culturalBackgroundController.text),
        _buildReviewCard(
          'First in Family',
          firstInFamily ? 'Yes' : 'No',
        ),
        _buildReviewCard(
          'Indigenous Australian',
          indigenous ? 'Yes' : 'No',
        ),
      ],
    );
  }

  Widget _buildReviewCard(String label, String value) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              label,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w500,
                  ),
            ),
            Expanded(
              child: Text(
                value,
                textAlign: TextAlign.right,
                style: Theme.of(context).textTheme.bodySmall,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNavigationButtons() {
    return Obx(
      () => Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          if (currentStep > 0)
            Expanded(
              child: OutlinedButton(
                onPressed: profileController.isLoading.value
                    ? null
                    : () => setState(() => currentStep--),
                child: const Text('Back'),
              ),
            ),
          if (currentStep > 0) const SizedBox(width: 16),
          Expanded(
            child: ElevatedButton(
              onPressed: profileController.isLoading.value ? null : _handleNext,
              child: profileController.isLoading.value
                  ? const SizedBox(
                      height: 20,
                      width: 20,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : Text(
                      currentStep == 3 ? 'Complete Profile' : 'Next',
                    ),
            ),
          ),
        ],
      ),
    );
  }

  void _handleNext() {
    if (_formKey.currentState?.validate() ?? false) {
      if (selectedDate == null && currentStep == 1) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Please select your date of birth')),
        );
        return;
      }

      if (currentStep == 3) {
        _submitProfile();
      } else {
        setState(() => currentStep++);
      }
    }
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

  Future<void> _submitProfile() async {
    final success = await profileController.createProfile(
      userType: selectedUserType,
      fullName: fullNameController.text,
      nesaNumber: nesaNumberController.text,
      entryYear: DateTime.now().year,
      dateOfBirth: selectedDate!,
      sex: selectedSex,
      schoolName: schoolNameController.text,
      address: addressController.text,
      uacId: uacIdController.text.isEmpty ? null : uacIdController.text,
      usi: usiController.text.isEmpty ? null : usiController.text,
      firstInFamily: firstInFamily,
      indigenous: indigenous,
      culturalBackground: culturalBackgroundController.text.isEmpty
          ? null
          : culturalBackgroundController.text,
    );

    if (success) {
      Get.offNamed(AppRoutes.home);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Profile created successfully!')),
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
    fullNameController.dispose();
    nesaNumberController.dispose();
    schoolNameController.dispose();
    addressController.dispose();
    uacIdController.dispose();
    usiController.dispose();
    culturalBackgroundController.dispose();
    super.dispose();
  }
}
