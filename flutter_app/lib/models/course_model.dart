import 'package:cloud_firestore/cloud_firestore.dart';

/// Course model representing a university course
class Course {
  final String id;
  final String university;
  final String location;
  final String degree;
  final String code;
  final DateTime startDate;
  final DateTime closingDate;
  final DateTime? applicationOpenDate;
  final DateTime? openDayDate;
  final DateTime? offerReleaseDate;
  final DateTime? expoDate;
  final String? logoUrl;
  final double? atar;
  final String? field;
  final String? description;
  final List<String>? keywords;
  final DateTime? createdAt;

  Course({
    required this.id,
    required this.university,
    required this.location,
    required this.degree,
    required this.code,
    required this.startDate,
    required this.closingDate,
    this.applicationOpenDate,
    this.openDayDate,
    this.offerReleaseDate,
    this.expoDate,
    this.logoUrl,
    this.atar,
    this.field,
    this.description,
    this.keywords,
    this.createdAt,
  });

  /// Create Course from Firestore document
  factory Course.fromFirestore(DocumentSnapshot<Map<String, dynamic>> doc) {
    final data = doc.data()!;
    return Course(
      id: doc.id,
      university: data['university'] as String? ?? '',
      location: data['location'] as String? ?? '',
      degree: data['degree'] as String? ?? '',
      code: data['code'] as String? ?? '',
      startDate: data['startDate'] != null
          ? (data['startDate'] as Timestamp).toDate()
          : DateTime.now(),
      closingDate: data['closingDate'] != null
          ? (data['closingDate'] as Timestamp).toDate()
          : DateTime.now(),
      applicationOpenDate: data['applicationOpenDate'] != null
          ? (data['applicationOpenDate'] as Timestamp).toDate()
          : null,
      openDayDate: data['openDayDate'] != null
          ? (data['openDayDate'] as Timestamp).toDate()
          : null,
      offerReleaseDate: data['offerReleaseDate'] != null
          ? (data['offerReleaseDate'] as Timestamp).toDate()
          : null,
      expoDate: data['expoDate'] != null
          ? (data['expoDate'] as Timestamp).toDate()
          : null,
      logoUrl: data['logoUrl'] as String?,
      atar: data['atar'] != null ? (data['atar'] as num).toDouble() : null,
      field: data['field'] as String?,
      description: data['description'] as String?,
      keywords: List<String>.from(data['keywords'] as List? ?? []),
      createdAt: data['createdAt'] != null
          ? (data['createdAt'] as Timestamp).toDate()
          : null,
    );
  }

  /// Convert to Firestore document format
  Map<String, dynamic> toFirestore() {
    return {
      'university': university,
      'location': location,
      'degree': degree,
      'code': code,
      'startDate': Timestamp.fromDate(startDate),
      'closingDate': Timestamp.fromDate(closingDate),
      'applicationOpenDate':
          applicationOpenDate != null ? Timestamp.fromDate(applicationOpenDate!) : null,
      'openDayDate': openDayDate != null ? Timestamp.fromDate(openDayDate!) : null,
      'offerReleaseDate':
          offerReleaseDate != null ? Timestamp.fromDate(offerReleaseDate!) : null,
      'expoDate': expoDate != null ? Timestamp.fromDate(expoDate!) : null,
      'logoUrl': logoUrl,
      'atar': atar,
      'field': field,
      'description': description,
      'keywords': keywords ?? [],
      'createdAt': createdAt != null ? Timestamp.fromDate(createdAt!) : null,
    };
  }

  /// Create a copy with modified fields
  Course copyWith({
    String? id,
    String? university,
    String? location,
    String? degree,
    String? code,
    DateTime? startDate,
    DateTime? closingDate,
    DateTime? applicationOpenDate,
    DateTime? openDayDate,
    DateTime? offerReleaseDate,
    DateTime? expoDate,
    String? logoUrl,
    double? atar,
    String? field,
    String? description,
    List<String>? keywords,
    DateTime? createdAt,
  }) {
    return Course(
      id: id ?? this.id,
      university: university ?? this.university,
      location: location ?? this.location,
      degree: degree ?? this.degree,
      code: code ?? this.code,
      startDate: startDate ?? this.startDate,
      closingDate: closingDate ?? this.closingDate,
      applicationOpenDate: applicationOpenDate ?? this.applicationOpenDate,
      openDayDate: openDayDate ?? this.openDayDate,
      offerReleaseDate: offerReleaseDate ?? this.offerReleaseDate,
      expoDate: expoDate ?? this.expoDate,
      logoUrl: logoUrl ?? this.logoUrl,
      atar: atar ?? this.atar,
      field: field ?? this.field,
      description: description ?? this.description,
      keywords: keywords ?? this.keywords,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  /// Get course ID string (university__code)
  String getCourseId() => '${university}__$code';

  /// Check if application is open
  bool isApplicationOpen() {
    final now = DateTime.now();
    if (applicationOpenDate != null && now.isBefore(applicationOpenDate!)) {
      return false;
    }
    if (now.isAfter(closingDate)) {
      return false;
    }
    return true;
  }

  /// Get days until closing
  int? getDaysUntilClosing() {
    final now = DateTime.now();
    final difference = closingDate.difference(now).inDays;
    return difference >= 0 ? difference : null;
  }

  @override
  String toString() => 'Course(id: $id, university: $university, degree: $degree)';

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Course &&
          runtimeType == other.runtimeType &&
          id == other.id &&
          code == other.code;

  @override
  int get hashCode => id.hashCode ^ code.hashCode;
}
