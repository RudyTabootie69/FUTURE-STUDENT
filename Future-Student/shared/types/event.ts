type Category = "Events" | "Start Dates" | "Important Dates";

export class Event {
  eventID: number;
  title: string;
  description?: string;
  location?: string;
  date: string;
  endDate?: string;
  eventType: Category;
}

export function toString(e: Event): string {
  return e.title;
}