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
  payment?: PaymentSummary | null;
  schoolName: string;

  public getUserType(): string{
    return "Undefined User";
  }

  constructor(id: number,  firstName: string, lastName: string, username: string, email: string, dob: string, address: string, schoolName: string) {
      this.id = id;  
      this.firstName = firstName;
      this.lastName = lastName;
      this.username = username;
      this.email = email;
      this.dob = dob;
      this.address = address;
      this.schoolName = schoolName;
  }
}

export class Student extends User{
  nesaNumber: string;
  uacId?: string;
  usi?: string;
  entryYear: number;
  firstInFamily?: string; // Yes/No/Prefer not to say
  indigenous?: string; // Yes/No/Prefer not to say
  culturalBackground?: string;

  public override getUserType(): string{
    return "Student";
  }

  constructor(id: number, firstName: string, lastName: string,  username: string, email: string, dob: string, address: string, schoolName: string, nesaNumber: string, uacId: string, usi: string, entryYear: number, firstInFamily: string, indigenous: string, culturalBackground: string) {
      super(id, firstName, lastName, username, email, dob, address, schoolName);
      this.nesaNumber = nesaNumber;
      this.uacId = uacId;
      this.usi = usi;
      this.entryYear = entryYear;
      this.firstInFamily = firstInFamily;
      this.indigenous = indigenous;
      this.culturalBackground = culturalBackground;
  }
}

export class Staff extends User{

  public override getUserType(): string{
    return "Staff";
  }

  constructor(id: number, firstName: string, lastName: string,  username: string, email: string, dob: string, address: string, schoolName: string) {
      super(id, firstName, lastName, username, email, dob, address, schoolName);

  }
}

export class Parent extends User{


  public override getUserType(): string{
    return "Parent";
  }

  constructor(id: number, firstName: string, lastName: string,  username: string, email: string, dob: string, address: string, schoolName: string) {
      super(id, firstName, lastName, username, email, dob, address, schoolName);
  }
}
