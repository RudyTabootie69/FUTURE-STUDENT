enum EventType {
  applicationOpen,
  applicationClose,
  openDay,
  expo,
  offerRelease,
  other,
}

/// Calendar event model
class CalendarEvent {
  final String id;
  final String title;
  final DateTime date;
  final EventType type;
  final String? courseId;
  final String? courseName;
  final String? university;
  final String? description;
  final bool isAllDay;

  CalendarEvent({
    required this.id,
    required this.title,
    required this.date,
    required this.type,
    this.courseId,
    this.courseName,
    this.university,
    this.description,
    this.isAllDay = true,
  });

  /// Get event color based on type
  int get colorValue {
    switch (type) {
      case EventType.applicationClose:
        return 0xFFFF4B4B; // Red
      case EventType.applicationOpen:
        return 0xFF25B372; // Green
      case EventType.openDay:
        return 0xFF3DB8FF; // Blue
      case EventType.expo:
        return 0xFFFF9800; // Orange
      case EventType.offerRelease:
        return 0xFF9C27B0; // Purple
      default:
        return 0xFF757575; // Grey
    }
  }

  /// Get event type label
  String getTypeLabel() {
    switch (type) {
      case EventType.applicationOpen:
        return 'Application Opens';
      case EventType.applicationClose:
        return 'Application Closes';
      case EventType.openDay:
        return 'Open Day';
      case EventType.expo:
        return 'Expo';
      case EventType.offerRelease:
        return 'Offer Release';
      case EventType.other:
        return 'Event';
    }
  }

  /// Get event icon name
  String getIconName() {
    switch (type) {
      case EventType.applicationOpen:
        return 'check_circle';
      case EventType.applicationClose:
        return 'schedule';
      case EventType.openDay:
        return 'event';
      case EventType.expo:
        return 'festival';
      case EventType.offerRelease:
        return 'mail';
      case EventType.other:
        return 'info';
    }
  }

  /// Create copy with modified fields
  CalendarEvent copyWith({
    String? id,
    String? title,
    DateTime? date,
    EventType? type,
    String? courseId,
    String? courseName,
    String? university,
    String? description,
    bool? isAllDay,
  }) {
    return CalendarEvent(
      id: id ?? this.id,
      title: title ?? this.title,
      date: date ?? this.date,
      type: type ?? this.type,
      courseId: courseId ?? this.courseId,
      courseName: courseName ?? this.courseName,
      university: university ?? this.university,
      description: description ?? this.description,
      isAllDay: isAllDay ?? this.isAllDay,
    );
  }

  @override
  String toString() => 'CalendarEvent(id: $id, title: $title, date: $date)';

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is CalendarEvent &&
          runtimeType == other.runtimeType &&
          id == other.id &&
          date == other.date;

  @override
  int get hashCode => id.hashCode ^ date.hashCode;
}
