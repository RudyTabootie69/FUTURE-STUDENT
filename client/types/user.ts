export type Sex = "male" | "female" | "";

export interface PaymentSummary {
  brand?: string | null;
  last4?: string | null;
}

export class User {
  id: number;
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
  
  constructor(id: number, username: string, firstName: string, lastName: string,password: string, salt: string, address: string) {
      this.id = id;  
      this.firstName = firstName;
        
  }
}
