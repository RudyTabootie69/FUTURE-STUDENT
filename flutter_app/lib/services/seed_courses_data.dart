import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/course_model.dart';

/// Sample course data for seeding
class SeedCoursesData {
  /// Generate sample courses
  static List<Course> generateSampleCourses() {
    final now = DateTime.now();
    final nextYear = DateTime(now.year + 1);

    return [
      // Engineering courses
      Course(
        id: 'usyd_eng001',
        university: 'University of Sydney',
        location: 'Camperdown',
        degree: 'Bachelor of Engineering (Honours)',
        code: 'ENG001',
        startDate: DateTime(nextYear.year, 2, 15),
        closingDate: DateTime(nextYear.year, 1, 10),
        applicationOpenDate: DateTime(now.year, 9, 1),
        openDayDate: DateTime(now.year, 10, 15),
        offerReleaseDate: DateTime(nextYear.year, 1, 20),
        logoUrl: null,
        atar: 87,
        field: 'Engineering',
        description: 'A comprehensive engineering program with specializations in civil, mechanical, electrical, and software engineering.',
        keywords: ['engineering', 'technology', 'construction', 'software'],
        createdAt: now,
      ),
      Course(
        id: 'unsw_eng001',
        university: 'UNSW Sydney',
        location: 'Kensington',
        degree: 'Bachelor of Engineering Science',
        code: 'ENG100',
        startDate: DateTime(nextYear.year, 2, 20),
        closingDate: DateTime(nextYear.year, 1, 15),
        applicationOpenDate: DateTime(now.year, 9, 1),
        openDayDate: DateTime(now.year, 10, 20),
        offerReleaseDate: DateTime(nextYear.year, 1, 25),
        logoUrl: null,
        atar: 89,
        field: 'Engineering',
        description: 'Cutting-edge engineering education with industry partnerships and research opportunities.',
        keywords: ['engineering', 'research', 'technology'],
        createdAt: now,
      ),

      // Science courses
      Course(
        id: 'usyd_sci001',
        university: 'University of Sydney',
        location: 'Camperdown',
        degree: 'Bachelor of Science',
        code: 'SCI001',
        startDate: DateTime(nextYear.year, 2, 15),
        closingDate: DateTime(nextYear.year, 1, 10),
        applicationOpenDate: DateTime(now.year, 9, 1),
        openDayDate: DateTime(now.year, 10, 15),
        offerReleaseDate: DateTime(nextYear.year, 1, 20),
        logoUrl: null,
        atar: 80,
        field: 'Science',
        description: 'Flexible science degree with majors in biology, chemistry, physics, and more.',
        keywords: ['science', 'research', 'biology', 'chemistry'],
        createdAt: now,
      ),
      Course(
        id: 'melb_sci001',
        university: 'University of Melbourne',
        location: 'Parkville',
        degree: 'Bachelor of Science',
        code: 'SCI200',
        startDate: DateTime(nextYear.year, 2, 22),
        closingDate: DateTime(nextYear.year, 1, 18),
        applicationOpenDate: DateTime(now.year, 9, 5),
        openDayDate: DateTime(now.year, 10, 22),
        offerReleaseDate: DateTime(nextYear.year, 1, 28),
        logoUrl: null,
        atar: 82,
        field: 'Science',
        description: 'Science degree with opportunities for research and industry placement.',
        keywords: ['science', 'research', 'nature', 'environment'],
        createdAt: now,
      ),

      // Business courses
      Course(
        id: 'usyd_bus001',
        university: 'University of Sydney',
        location: 'Camperdown',
        degree: 'Bachelor of Commerce',
        code: 'BUS001',
        startDate: DateTime(nextYear.year, 2, 15),
        closingDate: DateTime(nextYear.year, 1, 10),
        applicationOpenDate: DateTime(now.year, 9, 1),
        openDayDate: DateTime(now.year, 10, 15),
        offerReleaseDate: DateTime(nextYear.year, 1, 20),
        logoUrl: null,
        atar: 78,
        field: 'Business',
        description: 'Comprehensive business education covering accounting, finance, management, and economics.',
        keywords: ['business', 'commerce', 'finance', 'accounting'],
        createdAt: now,
      ),
      Course(
        id: 'unsw_bus001',
        university: 'UNSW Sydney',
        location: 'Kensington',
        degree: 'Bachelor of Commerce',
        code: 'BUS100',
        startDate: DateTime(nextYear.year, 2, 20),
        closingDate: DateTime(nextYear.year, 1, 15),
        applicationOpenDate: DateTime(now.year, 9, 1),
        openDayDate: DateTime(now.year, 10, 20),
        offerReleaseDate: DateTime(nextYear.year, 1, 25),
        logoUrl: null,
        atar: 80,
        field: 'Business',
        description: 'Business degree with focus on innovation and entrepreneurship.',
        keywords: ['business', 'entrepreneurship', 'finance', 'management'],
        createdAt: now,
      ),

      // Arts courses
      Course(
        id: 'usyd_arts001',
        university: 'University of Sydney',
        location: 'Camperdown',
        degree: 'Bachelor of Arts',
        code: 'ART001',
        startDate: DateTime(nextYear.year, 2, 15),
        closingDate: DateTime(nextYear.year, 1, 10),
        applicationOpenDate: DateTime(now.year, 9, 1),
        openDayDate: DateTime(now.year, 10, 15),
        offerReleaseDate: DateTime(nextYear.year, 1, 20),
        logoUrl: null,
        atar: 70,
        field: 'Arts',
        description: 'Flexible arts degree with majors in humanities, social sciences, and languages.',
        keywords: ['arts', 'humanities', 'language', 'history'],
        createdAt: now,
      ),
      Course(
        id: 'melb_arts001',
        university: 'University of Melbourne',
        location: 'Parkville',
        degree: 'Bachelor of Arts',
        code: 'ART200',
        startDate: DateTime(nextYear.year, 2, 22),
        closingDate: DateTime(nextYear.year, 1, 18),
        applicationOpenDate: DateTime(now.year, 9, 5),
        openDayDate: DateTime(now.year, 10, 22),
        offerReleaseDate: DateTime(nextYear.year, 1, 28),
        logoUrl: null,
        atar: 72,
        field: 'Arts',
        description: 'Arts degree with emphasis on critical thinking and cultural studies.',
        keywords: ['arts', 'culture', 'literature', 'philosophy'],
        createdAt: now,
      ),

      // Medicine courses
      Course(
        id: 'usyd_med001',
        university: 'University of Sydney',
        location: 'Camperdown',
        degree: 'Doctor of Medicine',
        code: 'MED001',
        startDate: DateTime(nextYear.year, 2, 15),
        closingDate: DateTime(now.year + 1, 10, 10),
        applicationOpenDate: DateTime(now.year, 5, 1),
        openDayDate: DateTime(now.year, 8, 15),
        offerReleaseDate: DateTime(now.year + 1, 12, 20),
        logoUrl: null,
        atar: 98,
        field: 'Medicine',
        description: 'Elite medicine program preparing the next generation of medical professionals.',
        keywords: ['medicine', 'health', 'science', 'doctor'],
        createdAt: now,
      ),
      Course(
        id: 'unsw_med001',
        university: 'UNSW Sydney',
        location: 'Kensington',
        degree: 'Doctor of Medicine',
        code: 'MED100',
        startDate: DateTime(nextYear.year, 2, 20),
        closingDate: DateTime(now.year + 1, 10, 15),
        applicationOpenDate: DateTime(now.year, 5, 5),
        openDayDate: DateTime(now.year, 8, 20),
        offerReleaseDate: DateTime(now.year + 1, 12, 25),
        logoUrl: null,
        atar: 99,
        field: 'Medicine',
        description: 'Prestigious medical degree with clinical training and research opportunities.',
        keywords: ['medicine', 'health', 'doctor', 'clinical'],
        createdAt: now,
      ),

      // Law courses
      Course(
        id: 'usyd_law001',
        university: 'University of Sydney',
        location: 'Camperdown',
        degree: 'Bachelor of Laws (Honours)',
        code: 'LAW001',
        startDate: DateTime(nextYear.year, 2, 15),
        closingDate: DateTime(nextYear.year, 1, 10),
        applicationOpenDate: DateTime(now.year, 9, 1),
        openDayDate: DateTime(now.year, 10, 15),
        offerReleaseDate: DateTime(nextYear.year, 1, 20),
        logoUrl: null,
        atar: 85,
        field: 'Law',
        description: 'Comprehensive legal education covering all major areas of law.',
        keywords: ['law', 'legal', 'justice', 'government'],
        createdAt: now,
      ),
    ];
  }

  /// Seed courses to Firestore
  static Future<void> seedCoursesToFirestore(FirebaseFirestore firestore) async {
    try {
      print('Starting course data seed...');

      final courses = generateSampleCourses();
      final batch = firestore.batch();
      int count = 0;

      for (final course in courses) {
        final docRef = firestore.collection('courses').doc(course.id);
        batch.set(docRef, course.toFirestore());
        count++;
      }

      await batch.commit();
      print('✅ Successfully seeded $count courses to Firestore');
    } catch (e) {
      print('❌ Error seeding courses: $e');
      rethrow;
    }
  }

  /// Clear all courses from Firestore
  static Future<void> clearAllCourses(FirebaseFirestore firestore) async {
    try {
      print('Clearing course data...');

      final snapshot = await firestore.collection('courses').get();
      final batch = firestore.batch();

      for (final doc in snapshot.docs) {
        batch.delete(doc.reference);
      }

      await batch.commit();
      print('✅ Successfully cleared all courses');
    } catch (e) {
      print('❌ Error clearing courses: $e');
      rethrow;
    }
  }

  /// Reseed courses (clear and re-add)
  static Future<void> reseedCourses(FirebaseFirestore firestore) async {
    await clearAllCourses(firestore);
    await seedCoursesToFirestore(firestore);
  }
}
