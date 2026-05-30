import { number } from "zod/v4";
import { useMemo } from "react";
import Field, { fieldInputClass } from "./InputField";
import { Search, ChevronDown } from "lucide-react";
import type { StudentFormData, Gender, LinkedSupervisor } from "shared/types/user";
import { schools } from "@/pages/data/highschools";

export type StudentFormErrors = Partial<
  Record<keyof Omit<StudentFormData, "supervisors">, string> & {
    supervisors: Partial<Record<keyof LinkedSupervisor, string>>[];
  }
>;

interface StudentDetailsFormProps {
  form: StudentFormData;
  errors: StudentFormErrors;
  onChange: (updates: Partial<StudentFormData>) => void;
  onBlur: (field: keyof StudentFormData) => void;
  onSupervisorChange: (index: number, updates: Partial<LinkedSupervisor>) => void;
  onSupervisorBlur: (index: number, field: keyof LinkedSupervisor) => void;
  onAddSupervisor: () => void;
  onRemoveSupervisor: (index: number) => void;
}

// Consistent hint rendered beneath optional field labels
function OptionalTag() {
  return (
    <span className="ml-1 text-xs font-normal text-grey-300">(optional)</span>
  );
}

const yesNoOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

const genderOptions: { value: Gender; label: string }[] = [
  { value: "female", label: "Woman / Female" },
  { value: "male", label: "Man / Male" },
  { value: "non_binary", label: "Non-binary" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

export default function StudentDetailsForm({
  form,
  errors,
  onChange,
  onBlur,
  onSupervisorChange,
  onSupervisorBlur,
  onAddSupervisor,
  onRemoveSupervisor,
}: StudentDetailsFormProps) {
  const blur = (field: keyof StudentFormData) => ({
    onBlur: () => onBlur(field),
  });

  const supervisorBlur = (index: number, field: keyof LinkedSupervisor) => ({
    onBlur: () => onSupervisorBlur(index, field),
  });

  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-black">A few more details</h2>
        <p className="text-sm text-grey-300 mt-1">
          Fields marked{" "}
          <span className="text-grey-300 text-xs">(optional)</span> can be
          filled in later from your profile.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        <Field label="NESA number" error={errors.nesaNumber}>
          <input
            className={fieldInputClass}
            inputMode="numeric"
            placeholder="e.g. 1234567890"
            value={form.nesaNumber}
            maxLength={20}
            onChange={(e) =>{
                  const filterNonNumbers = e.target.value.replace(/\D/g, "");
                  onChange({nesaNumber:filterNonNumbers})}
                }
            {...blur("nesaNumber")}
          />
        </Field>

        <Field
          label={
            <>
              UAC ID <OptionalTag />
            </>
          }
          error={errors.uacId}
        >
          <input
            className={fieldInputClass}
            inputMode="numeric"
            placeholder="Universities Admissions Centre ID"
            maxLength={15}
            value={form.uacId}
            onChange={(e) => onChange({ uacId: e.target.value })}
            {...blur("uacId")}
          />
        </Field>

        <Field
          label={
            <>
              USI <OptionalTag />
            </>
          }
          error={errors.usi}
        >
          <input
            className={fieldInputClass}
            placeholder="Unique Student Identifier"
            maxLength={15}
            value={form.usi}
            onChange={(e) => onChange({ usi: e.target.value })}
            {...blur("usi")}
          />
        </Field>

        <Field
          label="Anticipated university entry year"
          error={errors.entryYear}
        >
          <input
            type="number"
            className={fieldInputClass}
            value={form.entryYear}
            onChange={(e) => {
                  const filterNonNumbers = e.target.value.replace(/\D/g, "");
                  onChange({entryYear: Number(filterNonNumbers)})}
                }
            {...blur("entryYear")}
          />
        </Field>

        <Field label="Date of birth" error={errors.dob}>
          <input
            type="date"
            className={fieldInputClass}
            autoComplete="bday"
            value={form.dob}
            onChange={(e) => onChange({ dob: e.target.value })}
            {...blur("dob")}
          />
        </Field>

        <Field
          label={
            <>
              Gender <OptionalTag />
            </>
          }
          error={errors.gender}
        >
          <select
            className={fieldInputClass}
            value={form.gender}
            onChange={(e) => onChange({ gender: e.target.value as Gender })}
            {...blur("gender")}
          >
            <option value="">Prefer not to say</option>
            {genderOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
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
                  .value as StudentFormData["schoolName"],
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


        <Field label="Home address" error={errors.address} colSpan="full">
          <input
            className={fieldInputClass}
            autoComplete="street-address"
            placeholder="Street address, suburb, state, postcode"
            value={form.address}
            onChange={(e) => onChange({ address: e.target.value })}
            {...blur("address")}
          />
        </Field>

        <Field
          label={
            <>
              First in family to attend university? <OptionalTag />
            </>
          }
          error={errors.firstInFamily}
        >
          <select
            className={fieldInputClass}
            value={form.firstInFamily}
            onChange={(e) =>
              onChange({
                firstInFamily: e.target
                  .value as StudentFormData["firstInFamily"],
              })
            }
            {...blur("firstInFamily")}
          >
            <option value="">Select an answer</option>
            {yesNoOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label={
            <>
              Aboriginal or Torres Strait Islander? <OptionalTag />
            </>
          }
          error={errors.indigenous}
        >
          <select
            className={fieldInputClass}
            value={form.indigenous}
            onChange={(e) =>
              onChange({
                indigenous: e.target.value as StudentFormData["indigenous"],
              })
            }
            {...blur("indigenous")}
          >
            <option value="">Select an answer</option>
            {yesNoOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label={
            <>
              Cultural background <OptionalTag />
            </>
          }
          error={errors.culturalBackground}
          colSpan="full"
        >
          <input
            className={fieldInputClass}
            placeholder="e.g. Australian, Vietnamese, Lebanese"
            value={form.culturalBackground}
            onChange={(e) => onChange({ culturalBackground: e.target.value })}
            {...blur("culturalBackground")}
          />
        </Field>
      </div>


      {/* Supervisors */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-black">
              Your Parents / Guardians / Supervisors
            </h3>
            <p className="text-xs text-grey-300 mt-0.5">
              Put in the Future Student ID of your supervisors so they can track your Application Journey
            </p>
          </div>
        </div>

        {form.supervisors.map((supervisor, index) => (
          <div
            key={index}
            className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border rounded-lg bg-bg-soft"
          >
            <p className="sm:col-span-2 text-xs font-semibold text-grey-400 uppercase tracking-wide">
              Supervisor {index + 1}
            </p>

            <Field
              label="Future Student ID"
              error={errors.supervisors?.[index]?.id}
            >
              <input
                type = "text"
                className={fieldInputClass}
                value={supervisor.id}
                onChange={(e) =>{
                  const filterNonNumbers = e.target.value.replace(/\D/g, "");
                  onSupervisorChange(index, { id: Number(filterNonNumbers)})}
                }
                {...supervisorBlur(index, "id")}
              />
            </Field>

            <Field
              label="First name"
              error={errors.supervisors?.[index]?.supfirstName}
            >
              <input
                className={fieldInputClass}
                value={supervisor.supfirstName}
                onChange={(e) =>
                  onSupervisorChange(index, { supfirstName: e.target.value })
                }
                {...supervisorBlur(index, "supfirstName")}
              />
            </Field>

            <Field label="Last name" error={errors.supervisors?.[index]?.suplastName}>
              <input
                className={fieldInputClass}
                value={supervisor.suplastName}
                onChange={(e) =>
                  onSupervisorChange(index, { suplastName: e.target.value })
                }
                {...supervisorBlur(index, "suplastName")}
              />
            </Field>


            {form.supervisors.length > 0 && (
              <button
                type="button"
                onClick={() => onRemoveSupervisor(index)}
                className="absolute top-3 right-3 text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={onAddSupervisor}
          className="w-full py-2 border border-dashed border-grey-300 rounded-lg text-sm text-grey-400 hover:border-primary-blue hover:text-primary-blue transition-colors"
        >
          + Add a supervisor
        </button>
      </div>
    </div>
  );
}
