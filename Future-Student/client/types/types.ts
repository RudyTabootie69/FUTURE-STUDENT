// HOME TYPES

export type JourneyStep = {
  label: string;
  active: boolean;
};

export type ActionCard = {
  title: string;
  description: string;
  path: string;
};

// COURSE TYPES

export interface Course {
  university: string;
  location: string;
  degree: string;
  code: string;
  startDate: string;
  closingDate: string;
  applicationOpenDate?: string;
  openDayDate?: string;
  offerReleaseDate?: string;
  expoDate?: string;
  logoUrl?: string | null;
  atar?: number; // approximate ATAR requirement
  field?: string; // category of study
}

export function courseId(c: Course): string {
  return `${c.university}__${c.code}`;
}

// PROFILE TYPES

export type Sex = "male" | "female" | "";

export interface PaymentSummary {
  brand?: string | null;
  last4?: string | null;
}

export interface StudentProfile {
  userType: string;
  fullName: string;
  nesaNumber: string;
  uacId?: string;
  usi?: string;
  entryYear: number;
  dob: string; // YYYY-MM-DD
  sex: Sex;
  schoolName: string;
  address: string;
  firstInFamily?: string; // Yes/No/Prefer not to say
  indigenous?: string; // Yes/No/Prefer not to say
  culturalBackground?: string;
  payment?: PaymentSummary | null;
}
