export type Sex = "male" | "female" | "";

export interface PaymentSummary {
  brand?: string | null;
  last4?: string | null;
}

export class User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  dob?: string; // YYYY-MM-DD
  sex?: Sex;
  address?: string;
  payment?: PaymentSummary | null;
  schoolName?: string;
  nesaNumber?: string;
  uacId?: string;
  usi?: string;
  entryYear?: number;
  firstInFamily?: string; // Yes/No/Prefer not to say
  indigenous?: string; // Yes/No/Prefer not to say
  culturalBackground?: string;
  userType: string;


  constructor(id: number,  firstName: string, lastName: string, username: string, email: string) {
      this.id = id;  
      this.firstName = firstName;
      this.lastName = lastName;
      this.username = username;
      this.email = email;
  }

}

export class Student{
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  dob: string; // YYYY-MM-DD
  sex: Sex;
  address: string;
  payment?: PaymentSummary | null;
  schoolName: string;
  nesaNumber: string;
  uacId?: string;
  usi?: string;
  entryYear: number;
  firstInFamily?: string; // Yes/No/Prefer not to say
  indigenous?: string; // Yes/No/Prefer not to say
  culturalBackground?: string;


  constructor(id: number, firstName: string, lastName: string,  username: string, email: string, dob: string, address: string, schoolName: string, nesaNumber: string, usi: string, entryYear: number, firstInFamily: string, indigenous: string, culturalBackground: string) {
      
      this.nesaNumber = nesaNumber;
      this.usi = usi;
      this.entryYear = entryYear;
      this.firstInFamily = firstInFamily;
      this.indigenous = indigenous;
      this.culturalBackground = culturalBackground;
  }
}