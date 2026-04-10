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
  
  constructor(id: number, userType: string, firstName: string, lastName: string, nesaNumber: string, username: string, email: string, entryYear: number, dob: string, schoolName: string, address: string, passwordHash: string, hashSalt: string) {
      this.id = id;  
      this.userType = userType; 
      this.firstName = firstName;
      this.lastName = lastName;
      this.nesaNumber = nesaNumber;
      this.username = username;
      this.email = email;
      this.entryYear = entryYear;
      this.dob = dob;
      this.schoolName = schoolName;
      this.address = address;
      this.passwordHash = passwordHash;
      this.hashSalt = hashSalt;
        
  }
}
