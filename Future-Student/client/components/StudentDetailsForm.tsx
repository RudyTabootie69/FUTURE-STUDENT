import { number } from "zod/v4";
import { useMemo } from "react";
import Field, { fieldInputClass } from "./InputField";
import { Search, ChevronDown } from "lucide-react";
import type { StudentFormData, Gender, LinkedSupervisor } from "shared/types/user";

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

const schools = [
    { value: "Airds High School", label: "Airds High School"},
    { value: "Albury High School", label: "Albury High School"},
    { value: "Armidale Secondary College", label: "Armidale Secondary College"},
    { value: "Ballina Coast High School", label: "Ballina Coast High School"},
    { value: "Banora Point High School", label: "Banora Point High School"},
    { value: "Batemans Bay High School", label: "Batemans Bay High School"},
    { value: "Bathurst High Campus", label: "Bathurst High Campus"},
    { value: "Blaxland High School", label: "Blaxland High School"},
    { value: "Bowral High School", label: "Bowral High School"},
    { value: "Brisbane Water Secondary College", label: "Brisbane Water Secondary College"},
    { value: "Bulli High School", label: "Bulli High School"},
    { value: "Byron Bay High School", label: "Byron Bay High School"},
    { value: "Camden Haven High School", label: "Camden Haven High School"},
    { value: "Camden High School (New South Wales)", label: "Camden High School (New South Wales)"},
    { value: "Canobolas Rural Technology High School", label: "Canobolas Rural Technology High School"},
    { value: "Carenne School", label: "Carenne School"},
    { value: "Cessnock High School", label: "Cessnock High School"},
    { value: "Chatham High School (New South Wales)", label: "Chatham High School (New South Wales)"},
    { value: "Coffs Harbour High School", label: "Coffs Harbour High School"},
    { value: "Coffs Harbour Senior College", label: "Coffs Harbour Senior College"},
    { value: "Coonabarabran High School", label: "Coonabarabran High School"},
    { value: "Cootamundra High School", label: "Cootamundra High School"},
    { value: "Corrimal High School", label: "Corrimal High School"},
    { value: "Dapto High School", label: "Dapto High School"},
    { value: "Deniliquin High School", label: "Deniliquin High School"},
    { value: "Denison College of Secondary Education", label: "Denison College of Secondary Education"},
    { value: "Dubbo College", label: "Dubbo College"},
    { value: "Duval High School", label: "Duval High School"},
    { value: "Erina High School", label: "Erina High School"},
    { value: "Farrer Memorial Agricultural High School", label: "Farrer Memorial Agricultural High School"},
    { value: "Figtree High School", label: "Figtree High School"},
    { value: "Finley High School", label: "Finley High School"},
    { value: "Gorokan High School", label: "Gorokan High School"},
    { value: "Gosford High School", label: "Gosford High School"},
    { value: "Goulburn High School", label: "Goulburn High School"},
    { value: "Grafton High School (New South Wales)", label: "Grafton High School (New South Wales)"},
    { value: "Great Lakes College", label: "Great Lakes College"},
    { value: "Hay War Memorial High School", label: "Hay War Memorial High School"},
    { value: "Henry Kendall High School", label: "Henry Kendall High School"},
    { value: "Henry Lawson High School", label: "Henry Lawson High School"},
    { value: "Hillston Central School", label: "Hillston Central School"},
    { value: "Illawarra Sports High School", label: "Illawarra Sports High School"},
    { value: "James Fallon High School", label: "James Fallon High School"},
    { value: "Jindabyne Central School", label: "Jindabyne Central School"},
    { value: "Kadina High Campus", label: "Kadina High Campus"},
    { value: "Kanahooka High School", label: "Kanahooka High School"},
    { value: "Karabar High School", label: "Karabar High School"},
    { value: "Kariong Mountains High School", label: "Kariong Mountains High School"},
    { value: "Keira High School", label: "Keira High School"},
    { value: "Kelso High Campus", label: "Kelso High Campus"},
    { value: "Kiama High School", label: "Kiama High School"},
    { value: "Kincumber High School", label: "Kincumber High School"},
    { value: "Kingscliff High School", label: "Kingscliff High School"},
    { value: "Kooringal High School", label: "Kooringal High School"},
    { value: "Lake Illawarra High School", label: "Lake Illawarra High School"},
    { value: "Leeton High School", label: "Leeton High School"},
    { value: "Lismore High Campus", label: "Lismore High Campus"},
    { value: "Lurnea High School", label: "Lurnea High School"},
    { value: "Macksville High School", label: "Macksville High School"},
    { value: "Maitland Grossmann High School", label: "Maitland Grossmann High School"},
    { value: "Maitland High School", label: "Maitland High School"},
    { value: "Moruya High School", label: "Moruya High School"},
    { value: "Moss Vale High School", label: "Moss Vale High School"},
    { value: "Mount Austin High School", label: "Mount Austin High School"},
    { value: "Mount View High School (Cessnock)", label: "Mount View High School (Cessnock)"},
    { value: "Mudgee High School", label: "Mudgee High School"},
    { value: "Murray High School, Lavington", label: "Murray High School, Lavington"},
    { value: "Murrumbidgee Regional High School", label: "Murrumbidgee Regional High School"},
    { value: "Murwillumbah High School", label: "Murwillumbah High School"},
    { value: "Narara Valley High School", label: "Narara Valley High School"},
    { value: "Nowra High School", label: "Nowra High School"},
    { value: "Orange High School (New South Wales)", label: "Orange High School (New South Wales)"},
    { value: "Orara High School", label: "Orara High School"},
    { value: "Oxley High School", label: "Oxley High School"},
    { value: "Parkes High School", label: "Parkes High School"},
    { value: "Peak Hill Central School", label: "Peak Hill Central School"},
    { value: "Peel High School", label: "Peel High School"},
    { value: "Port Macquarie Campus", label: "Port Macquarie Campus"},
    { value: "Queanbeyan High School", label: "Queanbeyan High School"},
    { value: "Richmond River High Campus", label: "Richmond River High Campus"},
    { value: "Rivers Secondary College", label: "Rivers Secondary College"},
    { value: "Robert Townson High School", label: "Robert Townson High School"},
    { value: "Rutherford Technology High School", label: "Rutherford Technology High School"},
    { value: "Scone High School", label: "Scone High School"},
    { value: "Singleton High School", label: "Singleton High School"},
    { value: "Smith's Hill High School", label: "Smith's Hill High School"},
    { value: "South Grafton High School", label: "South Grafton High School"},
    { value: "Springwood High School (New South Wales)", label: "Springwood High School (New South Wales)"},
    { value: "Tamworth High School", label: "Tamworth High School"},
    { value: "Taree High School", label: "Taree High School"},
    { value: "Tumut High School", label: "Tumut High School"},
    { value: "Ulladulla High School", label: "Ulladulla High School"},
    { value: "Vincentia High School", label: "Vincentia High School"},
    { value: "Wagga Wagga High School", label: "Wagga Wagga High School"},
    { value: "Warilla High School", label: "Warilla High School"},
    { value: "Westfields Sports High School", label: "Westfields Sports High School"},
    { value: "Winmalee High School", label: "Winmalee High School"},
    { value: "Wollongong High School of the Performing Arts", label: "Wollongong High School of the Performing Arts"},
    { value: "Woolgoolga High School", label: "Woolgoolga High School"},
    { value: "Yanco Agricultural High School", label: "Yanco Agricultural High School"}
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

        <Field label="NESA number" error={errors.nesaNumber}>
          <input
            className={fieldInputClass}
            inputMode="numeric"
            placeholder="e.g. 1234567890"
            value={form.nesaNumber}
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
              School <OptionalTag />
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
