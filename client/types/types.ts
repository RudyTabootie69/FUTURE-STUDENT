// HOME TYPES

/* Where all global class objects are defined */


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

export function courseId(c: Course): string {
  return `${c.university}__${c.code}`;
}

// PROFILE TYPES

export type Sex = "male" | "female" | "";

export interface PaymentSummary {
  brand?: string | null;
  last4?: string | null;
}

export class User {
  userType: string;
  firstName: string;
  lastName: string;
  nesaNumber: string;
  username: string;
  email: string;
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
  passwordHash: string;
  hashSalt: string;
  payment?: PaymentSummary | null;
}
