import Field, { fieldInputClass } from "./InputField";
import type { SecondaryRepFormData } from "@/types/user";

export type SecondaryRepFormErrors = Partial<
  Record<keyof SecondaryRepFormData, string>
>;

interface SecondaryRepFormProps {
  form: SecondaryRepFormData;
  errors: SecondaryRepFormErrors;
  onChange: (updates: Partial<SecondaryRepFormData>) => void;
  onBlur: (field: keyof SecondaryRepFormData) => void;
}

function OptionalTag() {
  return (
    <span className="ml-1 text-xs font-normal text-grey-300">(optional)</span>
  );
}

// Common secondary school roles — user can still type their own via the input
const SECONDARY_ROLES = [
  "Principal",
  "Deputy Principal",
  "Head of Year 12",
  "Careers Adviser",
  "School Counsellor",
  "Subject Coordinator",
  "Classroom Teacher",
  "Administration Staff",
  "Other",
];

export default function SecondaryRepForm({
  form,
  errors,
  onChange,
  onBlur,
}: SecondaryRepFormProps) {
  const blur = (field: keyof SecondaryRepFormData) => ({
    onBlur: () => onBlur(field),
  });

  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-black">A few more details</h2>
        <p className="text-sm text-grey-300 mt-1">
          Tell us about yourself and your school so we can tailor your
          experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Personal details */}
        <Field label="First name" error={errors.firstName}>
          <input
            className={fieldInputClass}
            autoComplete="given-name"
            value={form.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            {...blur("firstName")}
          />
        </Field>

        <Field label="Last name" error={errors.lastName}>
          <input
            className={fieldInputClass}
            autoComplete="family-name"
            value={form.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            {...blur("lastName")}
          />
        </Field>

        <Field label="Work email address" error={errors.email}>
          <input
            type="email"
            className={fieldInputClass}
            autoComplete="email"
            placeholder="you@school.nsw.edu.au"
            value={form.email}
            onChange={(e) => onChange({ email: e.target.value })}
            {...blur("email")}
          />
        </Field>

        <Field label="Work phone number" error={errors.phone}>
          <input
            type="tel"
            className={fieldInputClass}
            autoComplete="tel"
            placeholder="e.g. 02 6021 1234"
            inputMode="tel"
            value={form.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            {...blur("phone")}
          />
        </Field>

        <Field label="Your role" error={errors.role} colSpan="full">
          <select
            className={fieldInputClass}
            value={form.role}
            onChange={(e) => onChange({ role: e.target.value })}
            {...blur("role")}
          >
            <option value="">Select your role</option>
            {SECONDARY_ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>

        {/* School details */}
        <div className="sm:col-span-2 pt-2 border-t">
          <p className="text-sm font-semibold text-black">School details</p>
        </div>

        <Field label="School name" error={errors.schoolName} colSpan="full">
          <input
            className={fieldInputClass}
            placeholder="e.g. Albury High School"
            value={form.schoolName}
            onChange={(e) => onChange({ schoolName: e.target.value })}
            {...blur("schoolName")}
          />
        </Field>

        <Field
          label="School address"
          error={errors.schoolAddress}
          colSpan="full"
        >
          <input
            className={fieldInputClass}
            placeholder="Street address, suburb, state, postcode"
            value={form.schoolAddress}
            onChange={(e) => onChange({ schoolAddress: e.target.value })}
            {...blur("schoolAddress")}
          />
        </Field>

        <Field
          label={
            <>
              NESA school code <OptionalTag />
            </>
          }
          error={errors.nesaSchoolCode}
        >
          <input
            className={fieldInputClass}
            inputMode="numeric"
            placeholder="e.g. 4321"
            value={form.nesaSchoolCode}
            onChange={(e) => onChange({ nesaSchoolCode: e.target.value })}
            {...blur("nesaSchoolCode")}
          />
        </Field>
      </div>
    </div>
  );
}
