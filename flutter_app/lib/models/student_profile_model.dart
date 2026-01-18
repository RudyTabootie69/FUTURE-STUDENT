import 'package:cloud_firestore/cloud_firestore.dart';
import 'payment_model.dart';

enum Sex { male, female, other }

/// Student profile model for storing user profile information
class StudentProfile {
  final String uid;
  final String userType;
  final String fullName;
  final String nesaNumber;
  final String? uacId;
  final String? usi;
  final int entryYear;
  final DateTime dateOfBirth;
  final Sex sex;
  final String schoolName;
  final String address;
  final bool? firstInFamily;
  final bool? indigenous;
  final String? culturalBackground;
  final PaymentSummary? payment;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  StudentProfile({
    required this.uid,
    required this.userType,
    required this.fullName,
    required this.nesaNumber,
    this.uacId,
    this.usi,
    required this.entryYear,
    required this.dateOfBirth,
    required this.sex,
    required this.schoolName,
    required this.address,
    this.firstInFamily,
    this.indigenous,
    this.culturalBackground,
    this.payment,
    this.createdAt,
    this.updatedAt,
  });

  /// Create StudentProfile from Firestore document
  factory StudentProfile.fromFirestore(
      DocumentSnapshot<Map<String, dynamic>> doc) {
    final data = doc.data()!;
    return StudentProfile(
      uid: doc.id,
      userType: data['userType'] as String? ?? '',
      fullName: data['fullName'] as String? ?? '',
      nesaNumber: data['nesaNumber'] as String? ?? '',
      uacId: data['uacId'] as String?,
      usi: data['usi'] as String?,
      entryYear: data['entryYear'] as int? ?? 0,
      dateOfBirth: data['dateOfBirth'] != null
          ? (data['dateOfBirth'] as Timestamp).toDate()
          : DateTime.now(),
      sex: _sexFromString(data['sex'] as String? ?? 'other'),
      schoolName: data['schoolName'] as String? ?? '',
      address: data['address'] as String? ?? '',
      firstInFamily: data['firstInFamily'] as bool?,
      indigenous: data['indigenous'] as bool?,
      culturalBackground: data['culturalBackground'] as String?,
      payment: data['payment'] != null
          ? PaymentSummary.fromJson(data['payment'] as Map<String, dynamic>)
          : null,
      createdAt: data['createdAt'] != null
          ? (data['createdAt'] as Timestamp).toDate()
          : null,
      updatedAt: data['updatedAt'] != null
          ? (data['updatedAt'] as Timestamp).toDate()
          : null,
    );
  }

  /// Convert StudentProfile to Firestore document format
  Map<String, dynamic> toFirestore() {
    return {
      'userType': userType,
      'fullName': fullName,
      'nesaNumber': nesaNumber,
      'uacId': uacId,
      'usi': usi,
      'entryYear': entryYear,
      'dateOfBirth': Timestamp.fromDate(dateOfBirth),
      'sex': _sexToString(sex),
      'schoolName': schoolName,
      'address': address,
      'firstInFamily': firstInFamily,
      'indigenous': indigenous,
      'culturalBackground': culturalBackground,
      'payment': payment?.toJson(),
      'createdAt': createdAt != null ? Timestamp.fromDate(createdAt!) : null,
      'updatedAt': Timestamp.fromDate(DateTime.now()),
    };
  }

  /// Create a copy with modified fields
  StudentProfile copyWith({
    String? uid,
    String? userType,
    String? fullName,
    String? nesaNumber,
    String? uacId,
    String? usi,
    int? entryYear,
    DateTime? dateOfBirth,
    Sex? sex,
    String? schoolName,
    String? address,
    bool? firstInFamily,
    bool? indigenous,
    String? culturalBackground,
    PaymentSummary? payment,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return StudentProfile(
      uid: uid ?? this.uid,
      userType: userType ?? this.userType,
      fullName: fullName ?? this.fullName,
      nesaNumber: nesaNumber ?? this.nesaNumber,
      uacId: uacId ?? this.uacId,
      usi: usi ?? this.usi,
      entryYear: entryYear ?? this.entryYear,
      dateOfBirth: dateOfBirth ?? this.dateOfBirth,
      sex: sex ?? this.sex,
      schoolName: schoolName ?? this.schoolName,
      address: address ?? this.address,
      firstInFamily: firstInFamily ?? this.firstInFamily,
      indigenous: indigenous ?? this.indigenous,
      culturalBackground: culturalBackground ?? this.culturalBackground,
      payment: payment ?? this.payment,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  @override
  String toString() =>
      'StudentProfile(uid: $uid, fullName: $fullName, nesaNumber: $nesaNumber)';

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is StudentProfile &&
          runtimeType == other.runtimeType &&
          uid == other.uid &&
          fullName == other.fullName;

  @override
  int get hashCode => uid.hashCode ^ fullName.hashCode;
}

/// Helper functions for Sex enum
Sex _sexFromString(String value) {
  switch (value.toLowerCase()) {
    case 'male':
      return Sex.male;
    case 'female':
      return Sex.female;
    default:
      return Sex.other;
  }
}

String _sexToString(Sex sex) {
  switch (sex) {
    case Sex.male:
      return 'male';
    case Sex.female:
      return 'female';
    case Sex.other:
      return 'other';
  }
}
