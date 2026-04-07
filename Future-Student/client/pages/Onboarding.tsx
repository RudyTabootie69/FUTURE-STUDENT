import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/context/ProfileContext";
import type { StudentProfile } from "@/types/profile";

export default function Onboarding() {
  const navigate = useNavigate();
  const { save } = useProfile();
  const [selected, setSelected] = useState<string>("");

  const options = [
    "Current Year 12 Student",
    "Parent / Caregiver of current Year 12 Student",
    "Representative of a Tertiary Institution",
    "Representative of a Secondary Institution",
  ];

  const defaultEntryYear = useMemo(() => new Date().getFullYear() + 1, []);

  const [form, setForm] = useState<Partial<StudentProfile>>({
    fullName: "",
    nesaNumber: "",
    uacId: "",
    usi: "",
    entryYear: defaultEntryYear,
    dob: "",
    sex: "",
    schoolName: "",
    address: "",
    firstInFamily: "",
    indigenous: "",
    culturalBackground: "",
    payment: null,
  });

  const [addPayment, setAddPayment] = useState(false);
  const [cardInput, setCardInput] = useState("");

  function detectBrand(num: string): string | null {
    const n = num.replace(/\s+/g, "");
    if (!n) return null;
    if (/^4/.test(n)) return "Visa";
    if (/^(34|37)/.test(n)) return "AmEx";
    if (/^5[1-5]/.test(n)) return "Mastercard";
    return "Card";
  }

  const handleSubmit = () => {
    if (!selected) return;
    const payment = addPayment && cardInput
      ? { brand: detectBrand(cardInput), last4: cardInput.replace(/\s+/g, "").slice(-4) }
      : null;

    const payload: StudentProfile = {
      userType: selected,
      fullName: form.fullName || "",
      nesaNumber: form.nesaNumber || "",
      uacId: form.uacId || "",
      usi: form.usi || "",
      entryYear: Number(form.entryYear) || defaultEntryYear,
      dob: form.dob || "",
      sex: (form.sex as any) || "",
      schoolName: form.schoolName || "",
      address: form.address || "",
      firstInFamily: form.firstInFamily || "",
      indigenous: form.indigenous || "",
      culturalBackground: form.culturalBackground || "",
      payment,
    };

    save(payload);
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-[560px]">
          <h1 className="text-2xl font-bold text-black mb-8">
            Which of these best describes you?
          </h1>

          <div className="space-y-4 mb-8">
            {options.map((option, index) => (
              <label key={index} className="flex items-center gap-2 py-1 cursor-pointer group">
                <input
                  type="radio"
                  name="userType"
                  value={option}
                  checked={selected === option}
                  onChange={(e) => setSelected(e.target.value)}
                  className="w-4 h-4 border border-grey-400 rounded appearance-none checked:bg-primary-blue checked:border-primary-blue cursor-pointer transition-colors"
                />
                <span className="text-base text-grey-400 font-normal">{option}</span>
              </label>
            ))}
          </div>

          {selected === "Current Year 12 Student" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-black">Tell us a bit more</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-black">Full Name</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={form.fullName || ""} onChange={(e)=>setForm({...form, fullName:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">NESA account number</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={form.nesaNumber || ""} onChange={(e)=>setForm({...form, nesaNumber:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">UAC ID (if known)</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={form.uacId || ""} onChange={(e)=>setForm({...form, uacId:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">USI (if known)</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={form.usi || ""} onChange={(e)=>setForm({...form, usi:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Year of anticipated university entry</label>
                  <input type="number" className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={form.entryYear as number} onChange={(e)=>setForm({...form, entryYear:Number(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Date of birth</label>
                  <input type="date" className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={form.dob || ""} onChange={(e)=>setForm({...form, dob:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Sex</label>
                  <select className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={form.sex || ""} onChange={(e)=>setForm({...form, sex:e.target.value as any})}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">School name</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={form.schoolName || ""} onChange={(e)=>setForm({...form, schoolName:e.target.value})} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-black">Home address</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={form.address || ""} onChange={(e)=>setForm({...form, address:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">First in the family to go on to higher education?</label>
                  <select className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={form.firstInFamily || ""} onChange={(e)=>setForm({...form, firstInFamily:e.target.value})}>
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Indigenous or Torres Strait Islander?</label>
                  <select className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={form.indigenous || ""} onChange={(e)=>setForm({...form, indigenous:e.target.value})}>
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-black">Cultural Background</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={form.culturalBackground || ""} onChange={(e)=>setForm({...form, culturalBackground:e.target.value})} />
                </div>
              </div>

              {/* Optional payment */}
              <div className="mt-6 border-t pt-4">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={addPayment} onChange={(e)=>setAddPayment(e.target.checked)} />
                  <span className="text-sm text-[#1A1A1A] font-medium">Add payment details (optional)</span>
                </label>
                {addPayment && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-black">Card Number</label>
                      <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" value={cardInput} onChange={(e)=>setCardInput(e.target.value)} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!selected}
            className="w-full mt-8 px-6 py-3 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-blue items-center justify-center p-12">
        <div className="flex items-center justify-center">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/b25a9f25196a07957d83ef28a0feaea98b4bfb78?width=1000"
            alt="Future Student Logo"
            className="w-full max-w-[500px] h-auto rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
