import Field, { fieldInputClass } from "./InputField";
import type { ParentFormData, LinkedChild } from "shared/types/user";

export type ParentFormErrors = Partial<
  Record<keyof Omit<ParentFormData, "children">, string> & {
    children: Partial<Record<keyof LinkedChild, string>>[];
  }
>;

interface ParentDetailsFormProps {
  form: ParentFormData;
  errors: ParentFormErrors;
  onChange: (updates: Partial<ParentFormData>) => void;
  onBlur: (field: keyof Omit<ParentFormData, "children">) => void;
  onChildChange: (index: number, updates: Partial<LinkedChild>) => void;
  onChildBlur: (index: number, field: keyof LinkedChild) => void;
  onAddChild: () => void;
  onRemoveChild: (index: number) => void;
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
  onChildChange,
  onChildBlur,
  onAddChild,
  onRemoveChild,
}: ParentDetailsFormProps) {
  const blur = (field: keyof Omit<ParentFormData, "children">) => ({
    onBlur: () => onBlur(field),
  });

  const childBlur = (index: number, field: keyof LinkedChild) => ({
    onBlur: () => onChildBlur(index, field),
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

      {/* Children */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-black">
              Your children
            </h3>
            <p className="text-xs text-grey-300 mt-0.5">
              Add basic details for each child. Full linking happens via invite
              code later.
            </p>
          </div>
        </div>

        {form.children.map((child, index) => (
          <div
            key={index}
            className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border rounded-lg bg-bg-soft"
          >
            <p className="sm:col-span-2 text-xs font-semibold text-grey-400 uppercase tracking-wide">
              Child {index + 1}
            </p>

            <Field
              label="First name"
              error={errors.children?.[index]?.firstName}
            >
              <input
                className={fieldInputClass}
                value={child.firstName}
                onChange={(e) =>
                  onChildChange(index, { firstName: e.target.value })
                }
                {...childBlur(index, "firstName")}
              />
            </Field>

            <Field label="Last name" error={errors.children?.[index]?.lastName}>
              <input
                className={fieldInputClass}
                value={child.lastName}
                onChange={(e) =>
                  onChildChange(index, { lastName: e.target.value })
                }
                {...childBlur(index, "lastName")}
              />
            </Field>

            <Field
              label="School name"
              error={errors.children?.[index]?.schoolName}
              colSpan="full"
            >
              <input
                className={fieldInputClass}
                placeholder="e.g. Albury High School"
                value={child.schoolName}
                onChange={(e) =>
                  onChildChange(index, { schoolName: e.target.value })
                }
                {...childBlur(index, "schoolName")}
              />
            </Field>

            {form.children.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveChild(index)}
                className="absolute top-3 right-3 text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={onAddChild}
          className="w-full py-2 border border-dashed border-grey-300 rounded-lg text-sm text-grey-400 hover:border-primary-blue hover:text-primary-blue transition-colors"
        >
          + Add another child
        </button>
      </div>
    </div>
  );
}
