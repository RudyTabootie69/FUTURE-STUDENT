import 'package:get/get.dart';
import 'package:logger/logger.dart';
import '../models/calendar_event_model.dart';
import 'wishlist_controller.dart';

class CalendarController extends GetxController {
  final WishlistController _wishlistController;
  final Logger _logger = Logger();

  // Observable state
  final RxList<CalendarEvent> allEvents = RxList<CalendarEvent>([]);
  final RxMap<DateTime, List<CalendarEvent>> eventsByDate =
      RxMap<DateTime, List<CalendarEvent>>({});
  final RxBool isLoading = false.obs;
  final Rx<DateTime> selectedDate = Rx<DateTime>(DateTime.now());

  CalendarController({WishlistController? wishlistController})
      : _wishlistController = wishlistController ?? Get.find<WishlistController>();

  @override
  void onInit() {
    super.onInit();
    _generateEventsFromWishlist();
    _wishlistController.wishlistCourses.listen((_) {
      _generateEventsFromWishlist();
    });
  }

  /// Generate calendar events from wishlist courses
  void _generateEventsFromWishlist() {
    try {
      isLoading.value = true;
      allEvents.clear();
      eventsByDate.clear();

      for (final course in _wishlistController.wishlistCourses) {
        // Application open date
        if (course.applicationOpenDate != null) {
          _addEvent(CalendarEvent(
            id: '${course.id}_open',
            title: '${course.degree} - Applications Open',
            date: course.applicationOpenDate!,
            type: EventType.applicationOpen,
            courseId: course.id,
            courseName: course.degree,
            university: course.university,
            description: 'Applications open for ${course.degree}',
          ));
        }

        // Application close date (deadline)
        _addEvent(CalendarEvent(
          id: '${course.id}_close',
          title: '${course.degree} - Application Closes',
          date: course.closingDate,
          type: EventType.applicationClose,
          courseId: course.id,
          courseName: course.degree,
          university: course.university,
          description: 'Last day to apply for ${course.degree}',
        ));

        // Open day
        if (course.openDayDate != null) {
          _addEvent(CalendarEvent(
            id: '${course.id}_openday',
            title: '${course.university} - Open Day',
            date: course.openDayDate!,
            type: EventType.openDay,
            courseId: course.id,
            courseName: course.degree,
            university: course.university,
            description: 'Open day at ${course.university}',
          ));
        }

        // Expo
        if (course.expoDate != null) {
          _addEvent(CalendarEvent(
            id: '${course.id}_expo',
            title: '${course.university} - Expo',
            date: course.expoDate!,
            type: EventType.expo,
            courseId: course.id,
            courseName: course.degree,
            university: course.university,
            description: 'University expo at ${course.university}',
          ));
        }

        // Offer release
        if (course.offerReleaseDate != null) {
          _addEvent(CalendarEvent(
            id: '${course.id}_offer',
            title: '${course.degree} - Offer Release',
            date: course.offerReleaseDate!,
            type: EventType.offerRelease,
            courseId: course.id,
            courseName: course.degree,
            university: course.university,
            description: 'Offers released for ${course.degree}',
          ));
        }
      }

      _logger.i('Generated ${allEvents.length} calendar events');
      isLoading.value = false;
    } catch (e) {
      _logger.e('Error generating events: $e');
      isLoading.value = false;
    }
  }

  /// Add event to calendar
  void _addEvent(CalendarEvent event) {
    allEvents.add(event);

    // Normalize date to remove time component
    final dateKey = DateTime(event.date.year, event.date.month, event.date.day);
    
    if (eventsByDate.containsKey(dateKey)) {
      eventsByDate[dateKey]!.add(event);
    } else {
      eventsByDate[dateKey] = [event];
    }
  }

  /// Get events for a specific date
  List<CalendarEvent> getEventsForDate(DateTime date) {
    final dateKey = DateTime(date.year, date.month, date.day);
    return eventsByDate[dateKey] ?? [];
  }

  /// Get events for a date range
  List<CalendarEvent> getEventsInRange(DateTime start, DateTime end) {
    return allEvents.where((event) {
      return event.date.isAfter(start) && event.date.isBefore(end);
    }).toList()
      ..sort((a, b) => a.date.compareTo(b.date));
  }

  /// Get upcoming events (next N days)
  List<CalendarEvent> getUpcomingEvents({int days = 30}) {
    final now = DateTime.now();
    final future = now.add(Duration(days: days));
    return getEventsInRange(now, future);
  }

  /// Get overdue events
  List<CalendarEvent> getOverdueEvents() {
    final now = DateTime.now();
    return allEvents.where((event) => event.date.isBefore(now)).toList()
      ..sort((a, b) => b.date.compareTo(a.date));
  }

  /// Get events by type
  List<CalendarEvent> getEventsByType(EventType type) {
    return allEvents.where((event) => event.type == type).toList()
      ..sort((a, b) => a.date.compareTo(b.date));
  }

  /// Get events for a course
  List<CalendarEvent> getEventsForCourse(String courseId) {
    return allEvents
        .where((event) => event.courseId == courseId)
        .toList()
        ..sort((a, b) => a.date.compareTo(b.date));
  }

  /// Get all universities with events
  List<String> getUniversitiesWithEvents() {
    final universities = <String>{};
    for (final event in allEvents) {
      if (event.university != null) {
        universities.add(event.university!);
      }
    }
    return universities.toList()..sort();
  }

  /// Get statistics
  Map<String, dynamic> getCalendarStats() {
    final now = DateTime.now();
    return {
      'totalEvents': allEvents.length,
      'upcomingEvents': getUpcomingEvents().length,
      'overdueDeadlines': getOverdueEvents().length,
      'eventsByType': _getEventCountByType(),
      'nextDeadline': _getNextDeadline(),
    };
  }

  /// Get count of events by type
  Map<String, int> _getEventCountByType() {
    final counts = <String, int>{};
    for (final event in allEvents) {
      final typeLabel = event.getTypeLabel();
      counts[typeLabel] = (counts[typeLabel] ?? 0) + 1;
    }
    return counts;
  }

  /// Get next deadline
  CalendarEvent? _getNextDeadline() {
    final now = DateTime.now();
    final deadlines = allEvents
        .where((e) => e.type == EventType.applicationClose && e.date.isAfter(now))
        .toList()
      ..sort((a, b) => a.date.compareTo(b.date));
    return deadlines.isNotEmpty ? deadlines.first : null;
  }

  /// Get days until a specific date
  int? getDaysUntil(DateTime date) {
    final now = DateTime.now();
    final difference = date.difference(now).inDays;
    return difference >= 0 ? difference : null;
  }

  /// Check if date has events
  bool hasEventsOnDate(DateTime date) {
    return getEventsForDate(date).isNotEmpty;
  }

  /// Export calendar as text
  String exportCalendarAsText() {
    String text = 'Future Student - Calendar Export\n';
    text += '${DateTime.now()}\n\n';

    final sorted = List<CalendarEvent>.from(allEvents)
      ..sort((a, b) => a.date.compareTo(b.date));

    for (final event in sorted) {
      text += '${event.getTypeLabel()} - ${event.date.toString().split(' ')[0]}\n';
      text += '${event.title}\n';
      text += '${event.university ?? ''}\n';
      text += '---\n';
    }

    return text;
  }
}
