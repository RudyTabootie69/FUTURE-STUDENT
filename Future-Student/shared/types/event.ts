export type Category = "Events" | "Start Dates" | "End Dates" |  "Enrolment" | "Important Dates";

export class Event {
  eventID: number;
  title: string;
  description?: string;
  organiser: string;
  location?: string;
  date: string;
  time: string;
  endDate?: string;
  eventType: Category;

  static default = Object.assign(new Event(), {
    eventID: 1234,
    title: "Engineering & IT Career Expo 2026",
    organiser: "University of Wollongong",
    description: "Connect with leading industry partners, explore graduate opportunities, and network with infrastructure and software engineering professionals. Bring your current resume.",
    location: "Main Hall, Building 11",
    date: "28-5-2026",
    time: "10:00 AM - 2:00 PM",
    endDate: "01-01-2026",
    eventType: "Open Day",
  });
}

export function toString(e: Event): string {
  return e.title;
}