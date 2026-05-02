import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/context/ProfileContext";
import type { User } from "@/types/user";

export default function Onboarding() {
  const navigate = useNavigate();
  const { save } = useProfile();
  const [selected, setSelected] = useState<string>("");

  const options = [
    "Current Year 12 Student",
    "Parent / Caregiver of current Year 12 Student",
    "Representative of a Secondary Institution"
  ];

  const defaultEntryYear = useMemo(() => new Date().getFullYear() + 1, []);

  const [stuform, setForm] = useState<Partial<User>>({
    firstName: "",
    lastName: "",
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

  const [parform, setParForm] = useState<Partial<User>>({
    firstName: "",
    lastName: "",
    dob: "",
    sex: "",
    schoolName: "",
    address: "",
    payment: null,
  });

  const [staffform, setStaffForm] = useState<Partial<User>>({
    firstName: "",
    lastName: "",
    dob: "",
    sex: "",
    schoolName: "",
    address: "",
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

  const handleSubmit = (selected: string) => {
    if (!selected) return;
    const payment = addPayment && cardInput
      ? { brand: detectBrand(cardInput), last4: cardInput.replace(/\s+/g, "").slice(-4) }
      : null;

    if (selected === "Current Year 12 Student"){
      const studentPayload: User = {
        id: 0,
        firstName: stuform.firstName || "",
        lastName: stuform.firstName || "",
        username: stuform.lastName || "",
        email: stuform.lastName || "",
        dob: stuform.dob || "",
        sex: (stuform.sex as any) || "",
        address: stuform.address || "",
        payment,
        nesaNumber: stuform.nesaNumber || "",
        uacId: stuform.uacId || "",
        usi: stuform.usi || "",
        entryYear: Number(stuform.entryYear) || defaultEntryYear,
        schoolName: stuform.schoolName || "",
        firstInFamily: stuform.firstInFamily || "",
        indigenous: stuform.indigenous || "",
        culturalBackground: stuform.culturalBackground || "",
        userType: "Student"
        
      };
    
      save(studentPayload);
    }
    else if (selected === "Parent / Caregiver of current Year 12 Student"){
      const parentPayload: User = {
        id: 0,
        firstName: parform.firstName || "",
        lastName: parform.firstName || "",
        username: parform.lastName || "",
        email: parform.lastName || "",
        dob: parform.dob || "",
        sex: (parform.sex as any) || "",
        address: parform.address || "",
        payment,
        schoolName: parform.schoolName || "",
        userType: "Parent"
      };
    
      save(parentPayload);
    }
    else if (selected === "Representative of a Secondary Institution"){
      const staffPayload: User = {
        id: 0,
        firstName: staffform.firstName || "",
        lastName: staffform.firstName || "",
        username: staffform.lastName || "",
        email: staffform.lastName || "",
        dob: staffform.dob || "",
        sex: (staffform.sex as any) || "",
        address: staffform.address,
        payment,
        schoolName: staffform.schoolName,
        userType: "Staff Member"
      };
      save(staffPayload);
    }
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - stuform */}
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
              <h2 className="text-xl font-bold text-black">Tell us a bit more (Student)</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-black">First Name</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={stuform.firstName || ""} onChange={(e)=>setForm({...stuform, firstName:e.target.value})} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-black">Last Name</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={stuform.lastName || ""} onChange={(e)=>setForm({...stuform, lastName:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">NESA account number</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={stuform.nesaNumber || ""} onChange={(e)=>setForm({...stuform, nesaNumber:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">UAC ID (if known)</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={stuform.uacId || ""} onChange={(e)=>setForm({...stuform, uacId:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">USI (if known)</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={stuform.usi || ""} onChange={(e)=>setForm({...stuform, usi:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Year of anticipated university entry</label>
                  <input type="number" className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={stuform.entryYear as number} onChange={(e)=>setForm({...stuform, entryYear:Number(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Date of birth</label>
                  <input type="date" className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={stuform.dob || ""} onChange={(e)=>setForm({...stuform, dob:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Sex</label>
                  <select className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={stuform.sex || ""} onChange={(e)=>setForm({...stuform, sex:e.target.value as any})}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">School name</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={stuform.schoolName || ""} onChange={(e)=>setForm({...stuform, schoolName:e.target.value})} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-black">Home address</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={stuform.address || ""} onChange={(e)=>setForm({...stuform, address:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">First in the family to go on to higher education?</label>
                  <select className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={stuform.firstInFamily || ""} onChange={(e)=>setForm({...stuform, firstInFamily:e.target.value})}>
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Indigenous or Torres Strait Islander?</label>
                  <select className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={stuform.indigenous || ""} onChange={(e)=>setForm({...stuform, indigenous:e.target.value})}>
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-black">Cultural Background</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={stuform.culturalBackground || ""} onChange={(e)=>setForm({...stuform, culturalBackground:e.target.value})} />
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

          {selected === "Parent / Caregiver of current Year 12 Student" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-black">Tell us a bit more (Parent)</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-black">First Name</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={parform.firstName || ""} onChange={(e)=>setParForm({...parform, firstName:e.target.value})} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-black">Last Name</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={parform.lastName || ""} onChange={(e)=>setParForm({...parform, lastName:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Date of birth</label>
                  <input type="date" className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={parform.dob || ""} onChange={(e)=>setParForm({...parform, dob:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Sex</label>
                  <select className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={parform.sex || ""} onChange={(e)=>setParForm({...parform, sex:e.target.value as any})}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">School name</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={parform.schoolName || ""} onChange={(e)=>setParForm({...parform, schoolName:e.target.value})} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-black">Home address</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={parform.address || ""} onChange={(e)=>setParForm({...parform, address:e.target.value})} />
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

          {selected === "Representative of a Secondary Institution" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-black">Tell us a bit more (Staff)</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-black">First Name</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={staffform.firstName || ""} onChange={(e)=>setStaffForm({...staffform, firstName:e.target.value})} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-black">Last Name</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={staffform.lastName || ""} onChange={(e)=>setStaffForm({...staffform, lastName:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Date of birth</label>
                  <input type="date" className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={staffform.dob || ""} onChange={(e)=>setStaffForm({...staffform, dob:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">Sex</label>
                  <select className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={staffform.sex || ""} onChange={(e)=>setStaffForm({...staffform, sex:e.target.value as any})}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black">School name</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={staffform.schoolName || ""} onChange={(e)=>setStaffForm({...staffform, schoolName:e.target.value})} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-black">Home address</label>
                  <input className="w-full px-3 py-2 border rounded-lg bg-bg-soft" value={staffform.address || ""} onChange={(e)=>setStaffForm({...staffform, address:e.target.value})} />
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
            onClick={() => this.handleSubmit(selected)}
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
