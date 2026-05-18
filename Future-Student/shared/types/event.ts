type Category = "Events" | "Start Dates" | "Important Dates";

export class Event {
  eventID: number;
  title: string;
  description?: string;
  location?: string;
  date: string;
  endDate?: string;
  eventType: Category;

  static default = Object.assign(new Event(), {
    eventID: 1234,
    title: "The testing Event",
    description: "This is an event for everyone to come test events",
    location: "Wollongong",
    date: "30-12-2025",
    endDate: "01-01-2026",
    eventType: "Open Day",
  });
}

export function toString(e: Event): string {
  return e.title;
}