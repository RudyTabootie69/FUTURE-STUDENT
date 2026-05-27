import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboardingProfile } from "@/context/OnboardingProfileContext";
import {
  Gender,
  Student,
  Parent,
  LinkedSupervisor,
  SecondaryRep,
  TertiaryRep,
  StudentFormData,
  defaultStudentFormData,
  ParentFormData,
  defaultParentFormData,
  SecondaryRepFormData,
  defaultSecondaryRepFormData,
  TertiaryRepFormData,
  defaultTertiaryRepFormData,
  TertiaryInstitutionType,
} from "@shared/types/user";
import UserTypeSelector from "@/components/UserTypeSelector";
import StudentDetailsForm from "@/components/StudentDetailsForm";
import ParentDetailsForm from "@/components/ParentDetailsForm";
import SecondaryRepForm from "@/components/SecondaryRepDetailsForm";
import TertiaryRepForm from "@/components/TertiaryRepDetailsForm";
import type { StudentFormErrors } from "@/components/StudentDetailsForm";
import type { ParentFormErrors } from "@/components/ParentDetailsForm";
import type { SecondaryRepFormErrors } from "@/components/SecondaryRepDetailsForm";
import type { TertiaryRepFormErrors } from "@/components/TertiaryRepDetailsForm";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const USER_TYPE_OPTIONS = [
  "Current Year 12 Student",
  "Parent / Caregiver of current Year 12 Student",
  "Representative of a Tertiary Institution",
  "Representative of a Secondary Institution",
];

const REQUIRED_STUDENT_FIELDS: (keyof StudentFormData)[] = [
  "firstName",
  "lastName",
  "nesaNumber",
  "entryYear",
  "dob",
  "schoolName",
  "address",
];

const REQUIRED_PARENT_FIELDS: (keyof ParentFormData)[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
];

const REQUIRED_SECONDARY_FIELDS: (keyof SecondaryRepFormData)[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "role",
  "schoolName",
  "schoolAddress",
];

const REQUIRED_TERTIARY_FIELDS: (keyof TertiaryRepFormData)[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "role",
  "institutionType",
  "institutionName",
  "institutionAddress",
];

// ---------------------------------------------------------------------------
// Shared validators
// ---------------------------------------------------------------------------

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isValidPhone(v: string) {
  return /^[\d\s()+\-]{8,15}$/.test(v);
}

// ---------------------------------------------------------------------------
// Validation — Student
// ---------------------------------------------------------------------------

function validateStudentField(
  field: keyof StudentFormData,
  value: unknown,
): string {
  if (REQUIRED_STUDENT_FIELDS.includes(field) && !value)
    return "This field is required.";
  
  if (field === "dob" && value) {
    const age =
      new Date().getFullYear() - new Date(value as string).getFullYear();
    if (age < 14 || age > 25) return "Please enter a valid date of birth.";
  }
  if (field === "entryYear" && value) {
    const year = Number(value);
    const current = new Date().getFullYear();
    if (year < current || year > current + 5)
      return "Please enter a valid entry year.";
  }
  return "";
}

function validateAllStudent(form: StudentFormData): StudentFormErrors {
  const topLevel = Object.fromEntries(
    (Object.keys(form) as (keyof Omit<StudentFormData, "supervisors">)[])
      .map((f) => [f, validateStudentField(f, form[f as keyof typeof form])])
      .filter(([, e]) => e),
  );
  return { ...topLevel};
}

function hasSupervisorErrors(errors: StudentFormErrors): boolean {
  const topLevel = Object.entries(errors)
    .filter(([k]) => k !== "supervisors")
    .some(([, v]) => !!v);
  const supervisorErrors = (errors.supervisors ?? []).some((c) =>
    Object.values(c ?? {}).some(Boolean),
  );
  return topLevel || supervisorErrors;
}

// ---------------------------------------------------------------------------
// Validation — Parent
// ---------------------------------------------------------------------------

function validateParentField(
  field: keyof ParentFormData,
  value: unknown,
): string {
  if (REQUIRED_PARENT_FIELDS.includes(field) && !value)
    return "This field is required.";
  if (field === "email" && value && !isValidEmail(value as string))
    return "Please enter a valid email address.";
  if (field === "phone" && value && !isValidPhone(value as string))
    return "Please enter a valid phone number.";
  return "";
}

function validateAllParent(
  form: ParentFormData,
): ParentFormErrors {
  return Object.fromEntries(
    (Object.keys(form) as (keyof ParentFormData)[])
      .map((f) => [f, validateParentField(f, form[f])])
      .filter(([, e]) => e),
  );
}

// ---------------------------------------------------------------------------
// Validation — Secondary rep
// ---------------------------------------------------------------------------

function validateSecondaryField(
  field: keyof SecondaryRepFormData,
  value: unknown,
): string {
  if (REQUIRED_SECONDARY_FIELDS.includes(field) && !value)
    return "This field is required.";
  if (field === "email" && value && !isValidEmail(value as string))
    return "Please enter a valid email address.";
  if (field === "phone" && value && !isValidPhone(value as string))
    return "Please enter a valid phone number.";
  return "";
}

function validateAllSecondary(
  form: SecondaryRepFormData,
): SecondaryRepFormErrors {
  return Object.fromEntries(
    (Object.keys(form) as (keyof SecondaryRepFormData)[])
      .map((f) => [f, validateSecondaryField(f, form[f])])
      .filter(([, e]) => e),
  );
}

// ---------------------------------------------------------------------------
// Validation — Tertiary rep
// ---------------------------------------------------------------------------

function validateTertiaryField(
  field: keyof TertiaryRepFormData,
  value: unknown,
): string {
  if (REQUIRED_TERTIARY_FIELDS.includes(field) && !value)
    return "This field is required.";
  if (field === "email" && value && !isValidEmail(value as string))
    return "Please enter a valid email address.";
  if (field === "phone" && value && !isValidPhone(value as string))
    return "Please enter a valid phone number.";
  return "";
}

function validateAllTertiary(form: TertiaryRepFormData): TertiaryRepFormErrors {
  return Object.fromEntries(
    (Object.keys(form) as (keyof TertiaryRepFormData)[])
      .map((f) => [f, validateTertiaryField(f, form[f])])
      .filter(([, e]) => e),
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Onboarding() {
  const navigate = useNavigate();
  const {save} = useOnboardingProfile();

  const [userType, setUserType] = useState("");

  // Per-type form state — kept separate so switching never bleeds data
  const [studentForm, setStudentForm] = useState<StudentFormData>(
    defaultStudentFormData,
  );
  const [studentErrors, setStudentErrors] = useState<StudentFormErrors>({});

  const [parentForm, setParentForm] = useState<ParentFormData>(
    defaultParentFormData,
  );
  const [parentErrors, setParentErrors] = useState<ParentFormErrors>({});

  const [secondaryForm, setSecondaryForm] = useState<SecondaryRepFormData>(
    defaultSecondaryRepFormData,
  );
  const [secondaryErrors, setSecondaryErrors] =
    useState<SecondaryRepFormErrors>({});

  const [tertiaryForm, setTertiaryForm] = useState<TertiaryRepFormData>(
    defaultTertiaryRepFormData,
  );
  const [tertiaryErrors, setTertiaryErrors] = useState<TertiaryRepFormErrors>(
    {},
  );

  const isStudent = userType === "Current Year 12 Student";
  const isParent = userType === "Parent / Caregiver of current Year 12 Student";
  const isSecondary = userType === "Representative of a Secondary Institution";
  const isTertiary = userType === "Representative of a Tertiary Institution";

  // -- Student handlers --
  function handleStudentChange(updates: Partial<StudentFormData>) {
    setStudentForm((prev) => ({ ...prev, ...updates }));
  }
  function handleStudentBlur(field: keyof Omit<StudentFormData, "supervisors">) {
    setStudentErrors((prev) => ({
      ...prev,
      [field]: validateStudentField(field, studentForm[field]),
    }));
  }

  // -- Parent handlers --
  function handleParentChange(updates: Partial<ParentFormData>) {
    setParentForm((prev) => ({ ...prev, ...updates }));
  }
  function handleParentBlur(field: keyof ParentFormData) {
    setParentErrors((prev) => ({
      ...prev,
      [field]: validateParentField(
        field,
        parentForm[field as keyof typeof parentForm] as string,
      ),
    }));
  }

  function handleSupervisorChange(index: number, updates: Partial<LinkedSupervisor>) {
    setStudentForm((prev) => {
      const supervisors = [...prev.supervisors];
      supervisors[index] = { ...supervisors[index], ...updates };
      return { ...prev, supervisors };
    });
  }

  function handleSupervisorBlur(index: number, field: keyof LinkedSupervisor) {
    const error = studentForm.supervisors[index][field]
      ? ""
      : "This field is required.";
    setStudentErrors((prev) => {
      const supervisors = [
        ...(prev.supervisors ?? studentForm.supervisors.map(() => ({}))),
      ];
      supervisors[index] = { ...supervisors[index], [field]: error };
      return { ...prev, supervisors };
    });
  }
  function handleAddSupervisor() {
    setStudentForm((prev) => ({
      ...prev,
      supervisors: [
        ...prev.supervisors,
        { id: Number(), supfirstName: "", suplastName: ""},
      ],
    }));
  }
  function handleRemoveSupervisor(index: number) {
    setStudentForm((prev) => ({
      ...prev,
      supervisors: prev.supervisors.filter((_, i) => i !== index),
    }));
  }

  // -- Secondary rep handlers --
  function handleSecondaryChange(updates: Partial<SecondaryRepFormData>) {
    setSecondaryForm((prev) => ({ ...prev, ...updates }));
  }
  function handleSecondaryBlur(field: keyof SecondaryRepFormData) {
    setSecondaryErrors((prev) => ({
      ...prev,
      [field]: validateSecondaryField(field, secondaryForm[field]),
    }));
  }

  // -- Tertiary rep handlers --
  function handleTertiaryChange(updates: Partial<TertiaryRepFormData>) {
    setTertiaryForm((prev) => ({ ...prev, ...updates }));
  }
  function handleTertiaryBlur(field: keyof TertiaryRepFormData) {
    setTertiaryErrors((prev) => ({
      ...prev,
      [field]: validateTertiaryField(field, tertiaryForm[field]),
    }));
  }

  // -- Submit --
  function handleSubmit() {
    if (!userType) return;

    if (isStudent) {
      const errors = validateAllStudent(studentForm);
      if (hasSupervisorErrors(errors) || Object.keys(errors).length > 0) {
        setStudentErrors(errors);
        return;
      }
      const student = new Student(
        Date.now(),
        studentForm.firstName,
        studentForm.lastName,
        "",
        "",
        studentForm.dob,
        studentForm.address,
        studentForm.nesaNumber,
        studentForm.entryYear,
        studentForm.schoolName,
        studentForm.supervisors,
      );
      student.gender = studentForm.gender as Gender;
      student.uacId = studentForm.uacId || undefined;
      student.usi = studentForm.usi || undefined;
      student.firstInFamily = studentForm.firstInFamily || undefined;
      student.indigenous = studentForm.indigenous || undefined;
      student.culturalBackground = studentForm.culturalBackground || undefined;
      save(student);
    } else if (isParent) {
      const errors = validateAllParent(parentForm);
      const parent = new Parent(
        Date.now(),
        parentForm.firstName,
        parentForm.lastName,
        "",
        parentForm.email,
        "",
        parentForm.address,
      );
      parent.phone = parentForm.phone;
      save(parent);
    } else if (isSecondary) {
      const errors = validateAllSecondary(secondaryForm);
      if (Object.keys(errors).length > 0) {
        setSecondaryErrors(errors);
        return;
      }
      const rep = new SecondaryRep(
        Date.now(),
        secondaryForm.firstName,
        secondaryForm.lastName,
        "",
        secondaryForm.email,
        "",
        "",
        secondaryForm.schoolName,
        secondaryForm.schoolAddress,
        secondaryForm.role,
      );
      rep.phone = secondaryForm.phone;
      rep.nesaSchoolCode = secondaryForm.nesaSchoolCode || undefined;
      save(rep);
    } else if (isTertiary) {
      const errors = validateAllTertiary(tertiaryForm);
      if (Object.keys(errors).length > 0) {
        setTertiaryErrors(errors);
        return;
      }
      const rep = new TertiaryRep(
        Date.now(),
        tertiaryForm.firstName,
        tertiaryForm.lastName,
        "",
        tertiaryForm.email,
        "",
        "",
        tertiaryForm.institutionName,
        tertiaryForm.institutionType as TertiaryInstitutionType,
        tertiaryForm.institutionAddress,
        tertiaryForm.role,
      );
      rep.phone = tertiaryForm.phone;
      rep.department = tertiaryForm.department || undefined;
      save(rep);
    }

    navigate("/onboarding/home");
  }

  const buttonLabel = isStudent
    ? "Create my profile"
    : isParent
      ? "Create my account"
      : isSecondary
        ? "Register my school"
        : isTertiary
          ? "Register my institution"
          : "Continue";

  return (
    <div className="min-h-screen flex">
      {/* Left — form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-[560px]">
          <h1 className="text-2xl font-bold text-black mb-2">
            Let's get you set up
          </h1>
          <p className="text-sm text-grey-300 mb-8">
            Select the option that best describes you to get started.
          </p>

          <UserTypeSelector
            options={USER_TYPE_OPTIONS}
            selected={userType}
            onChange={setUserType}
          />

          {isStudent && (
            <StudentDetailsForm
              form={studentForm}
              errors={studentErrors}
              onChange={handleStudentChange}
              onBlur={handleStudentBlur}
              onSupervisorChange={handleSupervisorChange}
              onSupervisorBlur={handleSupervisorBlur}
              onAddSupervisor={handleAddSupervisor}
              onRemoveSupervisor={handleRemoveSupervisor}
            />
          )}

          {isParent && (
            <ParentDetailsForm
              form={parentForm}
              errors={parentErrors}
              onChange={handleParentChange}
              onBlur={handleParentBlur}
            />
          )}

          {isSecondary && (
            <SecondaryRepForm
              form={secondaryForm}
              errors={secondaryErrors}
              onChange={handleSecondaryChange}
              onBlur={handleSecondaryBlur}
            />
          )}

          {isTertiary && (
            <TertiaryRepForm
              form={tertiaryForm}
              errors={tertiaryErrors}
              onChange={handleTertiaryChange}
              onBlur={handleTertiaryBlur}
            />
          )}

          <button
            onClick={handleSubmit}
            disabled={!userType}
            className="w-full mt-8 px-6 py-3 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {buttonLabel}
          </button>
        </div>
      </div>

      {/* Right — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-blue items-center justify-center p-12">
        <img
          src="/logos/brandinglogo.png"
          alt="Future Student"
          className="w-full max-w-[500px] h-auto rounded-2xl"
        />
      </div>
    </div>
  );
}
