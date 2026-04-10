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
  dob: string; // YYYY-MM-DD
  sex: Sex;
  address: string;
  passwordHash: string;
  hashSalt: string;
  payment?: PaymentSummary | null;

  public getUserType(): string{
    return "Undefined";
  }

  constructor(id: number,  firstName: string, lastName: string, username: string, email: string, dob: string, address: string, passwordHash: string, hashSalt: string) {
      this.id = id;  
      this.firstName = firstName;
      this.lastName = lastName;
      this.username = username;
      this.email = email;
      this.dob = dob;
      this.address = address;
      this.passwordHash = passwordHash;
      this.hashSalt = hashSalt;
        
  }
}

export class Student extends User{
  nesaNumber: string;
  uacId?: string;
  usi?: string;
  entryYear: number;
  schoolName: string;
  firstInFamily?: string; // Yes/No/Prefer not to say
  indigenous?: string; // Yes/No/Prefer not to say
  culturalBackground?: string;
  
  public override getUserType(): string{
    return "Student";
  }

  constructor(id: number, firstName: string, lastName: string, nesaNumber: string, username: string, email: string, entryYear: number, dob: string, schoolName: string, address: string, passwordHash: string, hashSalt: string) {
      super(id, firstName, lastName, username, email, dob, address, passwordHash, hashSalt);
      this.nesaNumber = nesaNumber;
      this.entryYear = entryYear;
      this.schoolName = schoolName; 
  }
}

export class Staff extends User{
  nesaNumber: string;
  uacId?: string;
  usi?: string;
  entryYear: number;
  schoolName: string;
  firstInFamily?: string; // Yes/No/Prefer not to say
  indigenous?: string; // Yes/No/Prefer not to say
  culturalBackground?: string;
  
  public override getUserType(): string{
    return "Student";
  }

  constructor(id: number, firstName: string, lastName: string, nesaNumber: string, username: string, email: string, entryYear: number, dob: string, schoolName: string, address: string, passwordHash: string, hashSalt: string) {
      super(id, firstName, lastName, username, email, dob, address, passwordHash, hashSalt);
      this.nesaNumber = nesaNumber;
      this.entryYear = entryYear;
      this.schoolName = schoolName; 
  }
}

export class Parent extends User{
  nesaNumber: string;
  uacId?: string;
  usi?: string;
  entryYear: number;
  schoolName: string;
  firstInFamily?: string; // Yes/No/Prefer not to say
  indigenous?: string; // Yes/No/Prefer not to say
  culturalBackground?: string;
  
  public override getUserType(): string{
    return "Student";
  }

  constructor(id: number, firstName: string, lastName: string, nesaNumber: string, username: string, email: string, entryYear: number, dob: string, schoolName: string, address: string, passwordHash: string, hashSalt: string) {
      super(id, firstName, lastName, username, email, dob, address, passwordHash, hashSalt);
      this.nesaNumber = nesaNumber;
      this.entryYear = entryYear;
      this.schoolName = schoolName; 
  }
}
