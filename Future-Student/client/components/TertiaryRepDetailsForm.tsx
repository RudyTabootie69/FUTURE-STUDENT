import Field, { fieldInputClass } from "./InputField";
import type {
  TertiaryRepFormData,
  TertiaryInstitutionType,
} from "shared/types/user";

export type TertiaryRepFormErrors = Partial<
  Record<keyof TertiaryRepFormData, string>
>;

interface TertiaryRepFormProps {
  form: TertiaryRepFormData;
  errors: TertiaryRepFormErrors;
  onChange: (updates: Partial<TertiaryRepFormData>) => void;
  onBlur: (field: keyof TertiaryRepFormData) => void;
}

function OptionalTag() {
  return (
    <span className="ml-1 text-xs font-normal text-grey-300">(optional)</span>
  );
}

const INSTITUTION_TYPES: { value: TertiaryInstitutionType; label: string }[] = [
  { value: "university", label: "University" },
  { value: "tafe", label: "TAFE" },
  { value: "private_college", label: "Private College" },
];

// Common tertiary roles — broad enough to cover most institutions
const TERTIARY_ROLES = [
  "Vice-Chancellor / CEO",
  "Faculty Dean",
  "Department Head",
  "Admissions Officer",
  "Student Recruitment Officer",
  "Careers & Pathways Adviser",
  "Student Services Officer",
  "Academic Staff",
  "Administration Staff",
  "Other",
];

export default function TertiaryRepForm({
  form,
  errors,
  onChange,
  onBlur,
}: TertiaryRepFormProps) {
  const blur = (field: keyof TertiaryRepFormData) => ({
    onBlur: () => onBlur(field),
  });

  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-black">A few more details</h2>
        <p className="text-sm text-grey-300 mt-1">
          Tell us about yourself and your institution so we can tailor your
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
            placeholder="you@institution.edu.au"
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

        <Field label="Your role" error={errors.role}>
          <select
            className={fieldInputClass}
            value={form.role}
            onChange={(e) => onChange({ role: e.target.value })}
            {...blur("role")}
          >
            <option value="">Select your role</option>
            {TERTIARY_ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label={
            <>
              Department <OptionalTag />
            </>
          }
          error={errors.department}
        >
          <input
            className={fieldInputClass}
            placeholder="e.g. Faculty of Engineering"
            value={form.department}
            onChange={(e) => onChange({ department: e.target.value })}
            {...blur("department")}
          />
        </Field>

        {/* Institution details */}
        <div className="sm:col-span-2 pt-2 border-t">
          <p className="text-sm font-semibold text-black">
            Institution details
          </p>
        </div>

        <Field label="Institution type" error={errors.institutionType}>
          <select
            className={fieldInputClass}
            value={form.institutionType}
            onChange={(e) =>
              onChange({
                institutionType: e.target.value as TertiaryInstitutionType,
              })
            }
            {...blur("institutionType")}
          >
            <option value="">Select institution type</option>
            {INSTITUTION_TYPES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Institution name" error={errors.institutionName}>
          <input
            className={fieldInputClass}
            placeholder="e.g. Charles Sturt University"
            value={form.institutionName}
            onChange={(e) => onChange({ institutionName: e.target.value })}
            {...blur("institutionName")}
          />
        </Field>

        <Field
          label="Institution address"
          error={errors.institutionAddress}
          colSpan="full"
        >
          <input
            className={fieldInputClass}
            placeholder="Street address, suburb, state, postcode"
            value={form.institutionAddress}
            onChange={(e) => onChange({ institutionAddress: e.target.value })}
            {...blur("institutionAddress")}
          />
        </Field>
      </div>
    </div>
  );
}
