export class Course {
  uacID: number;
  uniID?: string; 
  title: string;
  description?: string;
  university: string;
  location: string;
  code: string;
  startDate: string;
  closingDate: string;
  applicationOpenDate?: string;
  openDayDate?: string;
  offerReleaseDate?: string;
  expoDate?: string;
  logoUrl?: string | null;
  atar?: number; // approximate ATAR requirement
  duration?: number;
  field?: string; // category of study
}


export function toString(c: Course): string {
  return `${c.university}__${c.uacID}`;
}
