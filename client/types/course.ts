export interface Course {
  university: string;
  location: string;
  degree: string;
  code: string;
  startDate: string;
  closingDate: string;
  logoUrl?: string | null;
}

export function courseId(c: Course): string {
  return `${c.university}__${c.code}`;
}
