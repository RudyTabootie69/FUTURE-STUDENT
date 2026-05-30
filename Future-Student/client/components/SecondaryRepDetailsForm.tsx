import Field, { fieldInputClass } from "./InputField";
import type { SecondaryRepFormData } from "shared/types/user";
import { schools } from "@/pages/data/highschools";

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
            maxLength={50}
            onChange={(e) => onChange({ firstName: e.target.value })}
            {...blur("firstName")}
          />
        </Field>

        <Field label="Last name" error={errors.lastName}>
          <input
            className={fieldInputClass}
            autoComplete="family-name"
            value={form.lastName}
            maxLength={50}
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
            maxLength={50}
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
            maxLength={20}
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
        <Field
                  label={
                    <>
                      School
                    </>
                  }
                  error={errors.schoolName}
                >
                  <select
                    className={fieldInputClass}
                    value={form.schoolName}
                    onChange={(e) =>
                      onChange({
                        schoolName: e.target
                          .value as SecondaryRepFormData["schoolName"],
                      })
                    }
                    {...blur("schoolName")}
                  >
                    <option value="">Select a school</option>
                    {schools.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
        </Field>
      </div>
    </div>
  );
}
