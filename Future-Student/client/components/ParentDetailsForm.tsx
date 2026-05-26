import Field, { fieldInputClass } from "./InputField";
import type { ParentFormData } from "shared/types/user";


export type ParentFormErrors = Partial<Record<keyof ParentFormData, string>>;

interface ParentDetailsFormProps {
  form: ParentFormData;
  errors: ParentFormErrors;
  onChange: (updates: Partial<ParentFormData>) => void;
  onBlur: (field: keyof Omit<ParentFormData, "children">) => void;
}

function OptionalTag() {
  return (
    <span className="ml-1 text-xs font-normal text-grey-300">(optional)</span>
  );
}

export default function ParentDetailsForm({
  form,
  errors,
  onChange,
  onBlur,
}: ParentDetailsFormProps) {
  const blur = (field: keyof Omit<ParentFormData, "children">) => ({
    onBlur: () => onBlur(field),
  });

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-black">A few more details</h2>
        <p className="text-sm text-grey-300 mt-1">
          You can link to your child's account after they generate an invite
          code from their profile.
        </p>
      </div>

      {/* Parent contact details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        <Field label="Email address" error={errors.email}>
          <input
            type="email"
            className={fieldInputClass}
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => onChange({ email: e.target.value })}
            {...blur("email")}
          />
        </Field>

        <Field label="Phone number" error={errors.phone}>
          <input
            type="tel"
            className={fieldInputClass}
            autoComplete="tel"
            placeholder="e.g. 0412 345 678"
            inputMode="tel"
            value={form.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            {...blur("phone")}
          />
        </Field>

        <Field
          label={
            <>
              Home address <OptionalTag />
            </>
          }
          error={errors.address}
          colSpan="full"
        >
          <input
            className={fieldInputClass}
            autoComplete="street-address"
            placeholder="Street address, suburb, state, postcode"
            value={form.address}
            onChange={(e) => onChange({ address: e.target.value })}
            {...blur("address")}
          />
        </Field>
      </div>
    </div>
  );
}
