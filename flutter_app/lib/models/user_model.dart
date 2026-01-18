import 'package:cloud_firestore/cloud_firestore.dart';

/// User model representing an authenticated user in the app
class AppUser {
  final String uid;
  final String email;
  final String? displayName;
  final String? photoUrl;
  final DateTime? createdAt;
  final DateTime? lastSignInTime;
  final bool emailVerified;

  AppUser({
    required this.uid,
    required this.email,
    this.displayName,
    this.photoUrl,
    this.createdAt,
    this.lastSignInTime,
    this.emailVerified = false,
  });

  /// Create an AppUser from Firestore document
  factory AppUser.fromFirestore(DocumentSnapshot<Map<String, dynamic>> doc) {
    final data = doc.data()!;
    return AppUser(
      uid: doc.id,
      email: data['email'] as String? ?? '',
      displayName: data['displayName'] as String?,
      photoUrl: data['photoUrl'] as String?,
      createdAt: data['createdAt'] != null
          ? (data['createdAt'] as Timestamp).toDate()
          : null,
      lastSignInTime: data['lastSignInTime'] != null
          ? (data['lastSignInTime'] as Timestamp).toDate()
          : null,
      emailVerified: data['emailVerified'] as bool? ?? false,
    );
  }

  /// Convert AppUser to Firestore document format
  Map<String, dynamic> toFirestore() {
    return {
      'email': email,
      'displayName': displayName,
      'photoUrl': photoUrl,
      'createdAt': createdAt != null ? Timestamp.fromDate(createdAt!) : null,
      'lastSignInTime':
          lastSignInTime != null ? Timestamp.fromDate(lastSignInTime!) : null,
      'emailVerified': emailVerified,
    };
  }

  /// Create a copy of AppUser with modified fields
  AppUser copyWith({
    String? uid,
    String? email,
    String? displayName,
    String? photoUrl,
    DateTime? createdAt,
    DateTime? lastSignInTime,
    bool? emailVerified,
  }) {
    return AppUser(
      uid: uid ?? this.uid,
      email: email ?? this.email,
      displayName: displayName ?? this.displayName,
      photoUrl: photoUrl ?? this.photoUrl,
      createdAt: createdAt ?? this.createdAt,
      lastSignInTime: lastSignInTime ?? this.lastSignInTime,
      emailVerified: emailVerified ?? this.emailVerified,
    );
  }

  @override
  String toString() => 'AppUser(uid: $uid, email: $email, displayName: $displayName)';

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is AppUser &&
          runtimeType == other.runtimeType &&
          uid == other.uid &&
          email == other.email;

  @override
  int get hashCode => uid.hashCode ^ email.hashCode;
}
