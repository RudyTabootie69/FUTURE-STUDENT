export type Gender =
  | "male"
  | "female"
  | "non_binary"
  | "prefer_not_to_say"
  | "";

export type firstInFamily = | "yes" | "no" | "prefer_not_to_say";
export type indigenous = | "yes" | "no" | "prefer_not_to_say";
// ---------------------------------------------------------------------------
// Base user
// ---------------------------------------------------------------------------
export class User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string; // optional — not all user types require it at onboarding
  dob: string; // YYYY-MM-DD
  gender: Gender;
  address: string;
  userType = "Undefined";
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    dob: string,
    address: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.dob = dob;
    this.gender = "";
    this.address = address;
  }

  static default = Object.assign(new User(0, "John", "Doe", "Johndoe1234", "johndoe@outlook.com", "10-10-2009", "42 Wallaby Way Sydney"));
}

// ---------------------------------------------------------------------------
// Student
// ---------------------------------------------------------------------------

export interface LinkedSupervisor {
  id: number;
  supfirstName: string;
  suplastName: string;
}

export class Student extends User {
  nesaNumber: string;
  uacId?: string;
  usi?: string;
  entryYear: number;
  schoolName: string;
  firstInFamily?: firstInFamily;
  indigenous?: indigenous;
  culturalBackground?: string;
  supervisors: LinkedSupervisor[];
  userType = "Student" as const
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    dob: string,
    address: string,
    nesaNumber: string,
    entryYear: number,
    schoolName: string,
    supervisors: LinkedSupervisor[] = [],
  ) {
    super(id, firstName, lastName, username, email, dob, address);
    this.nesaNumber = nesaNumber;
    this.entryYear = entryYear;
    this.schoolName = schoolName;
    this.supervisors = supervisors
  }
}

export function studenttoString(s: Student): string {
  return `${s.nesaNumber}__${s.id}__${s.firstName}__${s.lastName}`;
}
// ---------------------------------------------------------------------------
// SecondaryRep — representative of a secondary (school) institution
// ---------------------------------------------------------------------------
export class SecondaryRep extends User {
  schoolName: string;
  schoolAddress: string;
  nesaSchoolCode?: string;
  role: string;
  userType = "Secondary Representative" as const
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    dob: string,
    address: string,
    schoolName: string,
    schoolAddress: string,
    role: string,
  ) {
    super(id, firstName, lastName, username, email, dob, address);
    this.schoolName = schoolName;
    this.schoolAddress = schoolAddress;
    this.role = role;
  }
}

export interface SecondaryRepFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  schoolName: string;
}

export const defaultSecondaryRepFormData: SecondaryRepFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  schoolName: ""
};

// ---------------------------------------------------------------------------
// TertiaryRep — representative of a tertiary institution (uni, TAFE, college)
// ---------------------------------------------------------------------------
export type TertiaryInstitutionType =
  | "university"
  | "tafe"
  | "private_college"
  | "";

export class TertiaryRep extends User {
  institutionName: string;
  institutionType: TertiaryInstitutionType;
  institutionAddress: string;
  role: string;
  department?: string;
  userType = "Tertiary Representative";
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    dob: string,
    address: string,
    institutionName: string,
    institutionType: TertiaryInstitutionType,
    institutionAddress: string,
    role: string,
  ) {
    super(id, firstName, lastName, username, email, dob, address);
    this.institutionName = institutionName;
    this.institutionType = institutionType;
    this.institutionAddress = institutionAddress;
    this.role = role;
  }
}

export interface TertiaryRepFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  institutionName: string;
  institutionType: TertiaryInstitutionType;
  institutionAddress: string;
}

export const defaultTertiaryRepFormData: TertiaryRepFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  department: "",
  institutionName: "",
  institutionType: "",
  institutionAddress: "",
};

// ---------------------------------------------------------------------------
// Parent — caregiver of one or more Year 12 students.
// Children invite their parents via their ID
// ---------------------------------------------------------------------------

export class Parent extends User {
  userType = "Parent" as const;
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    dob: string,
    address: string
  ) {
    super(id, firstName, lastName, username, email, dob, address);
  }
}

// ---------------------------------------------------------------------------
// ParentFormData — plain object for React form state.
// ---------------------------------------------------------------------------
export interface ParentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export const defaultParentFormData: ParentFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
};

// ---------------------------------------------------------------------------
// StudentFormData — plain object for React form state.
// Never put class instances in React state; use this for the onboarding form
// and construct a Student instance from it on submit.
// ---------------------------------------------------------------------------
export interface StudentFormData {
  firstName: string;
  lastName: string;
  nesaNumber: string;
  uacId: string;
  usi: string;
  entryYear: number;
  dob: string;
  gender: Gender;
  schoolName: string;
  address: string;
  firstInFamily: firstInFamily;
  indigenous: indigenous;
  culturalBackground: string;
  supervisors: LinkedSupervisor[];
}

export const defaultStudentFormData: StudentFormData = {
  firstName: "",
  lastName: "",
  nesaNumber: "",
  uacId: "",
  usi: "",
  entryYear: new Date().getFullYear() + 1,
  dob: "",
  gender: "",
  schoolName: "",
  address: "",
  firstInFamily: "prefer_not_to_say",
  indigenous: "prefer_not_to_say",
  culturalBackground: "",
  supervisors: [],
};

export type Profile  = Student | Parent | SecondaryRep | TertiaryRep;

export function isStudent(profile : Profile): profile is Student {
  return profile.userType === "Student"
}

export function isParent(profile: Profile): profile is Parent {
  return profile.userType === "Parent"
}

export function isSecStaff(profile: Profile): profile is SecondaryRep {
  return profile.userType === "Secondary Representative"
}

export function isTertStaff(profile: Profile): profile is TertiaryRep {
  return profile.userType === "Tertiary Representative"
}

export function getUserType(user: User): string {
  if(user instanceof Student){
    return "Student"
  }
  if(user instanceof Parent){
    return "Parent"
  }
  if(user instanceof SecondaryRep){
    return "Secondary Representative"
  }
  if(user instanceof TertiaryRep){
    return "Tertiary Representative"
  }
  return "Undefined"
}

export function toString(user: User): string {
  return `${user.firstName}__${user.lastName}__${user.id}`;
}