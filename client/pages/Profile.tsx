import { useState } from "react";
import Navigation from "@/components/Navigation";
import { useProfile } from "@/context/ProfileContext";

export default function Profile() {
  const { profile, update } = useProfile();
  const [atar, setAtar] = useState("");
  const [hscSubject, setHscSubject] = useState("");
  const [fieldOfInterest, setFieldOfInterest] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="min-h-screen bg-bg-soft">
      <Navigation />

      {/* Header */}
      <div className="w-full h-[140px] bg-primary-blue flex flex-col justify-center px-6 lg:px-80">
        <h1 className="text-white text-3xl font-bold mb-1">{profile?.fullName || "Your Name"}</h1>
        <p className="text-white text-sm">{profile?.userType || ""}</p>
      </div>

      {/* Profile Form */}
      <div className="max-w-[900px] mx-auto px-4 mt-8 pb-20 relative space-y-8">
        {/* Personal Details from Onboarding */}
        <div className="bg-white rounded-xl shadow-[0_10px_40px_0_rgba(49,133,252,0.20)] p-8 lg:p-12">
          <h2 className="text-2xl font-bold text-black mb-6">Personal Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-black">Full Name</label>
              <input className="w-full px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm" value={profile?.fullName || ""} onChange={(e)=>update({ fullName: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">NESA account number</label>
              <input className="w-full px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm" value={profile?.nesaNumber || ""} onChange={(e)=>update({ nesaNumber: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">UAC ID</label>
              <input className="w-full px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm" value={profile?.uacId || ""} onChange={(e)=>update({ uacId: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">USI</label>
              <input className="w-full px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm" value={profile?.usi || ""} onChange={(e)=>update({ usi: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Anticipated entry year</label>
              <input type="number" className="w-full px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm" value={profile?.entryYear ?? ""} onChange={(e)=>update({ entryYear: Number(e.target.value) })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Date of birth</label>
              <input type="date" className="w-full px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm" value={profile?.dob || ""} onChange={(e)=>update({ dob: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Sex</label>
              <select className="w-full px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm" value={profile?.sex || ""} onChange={(e)=>update({ sex: e.target.value as any })}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">School name</label>
              <input className="w-full px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm" value={profile?.schoolName || ""} onChange={(e)=>update({ schoolName: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-black">Home address</label>
              <input className="w-full px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm" value={profile?.address || ""} onChange={(e)=>update({ address: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">First in family to attend higher education?</label>
              <select className="w-full px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm" value={profile?.firstInFamily || ""} onChange={(e)=>update({ firstInFamily: e.target.value })}>
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
                <option>Prefer not to say</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Indigenous or Torres Strait Islander?</label>
              <select className="w-full px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm" value={profile?.indigenous || ""} onChange={(e)=>update({ indigenous: e.target.value })}>
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
                <option>Prefer not to say</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-black">Cultural Background</label>
              <input className="w-full px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm" value={profile?.culturalBackground || ""} onChange={(e)=>update({ culturalBackground: e.target.value })} />
            </div>
          </div>

          {/* Payment Summary */}
          {profile?.payment && (
            <div className="mt-6 p-4 border rounded-lg bg-bg-soft">
              <div className="text-sm text-[#1A1A1A]">Payment method on file</div>
              <div className="text-sm text-[#777]">{profile.payment.brand} •••• {profile.payment.last4}</div>
            </div>
          )}
        </div>

        {/* Existing sections */}
        <div className="bg-white rounded-xl shadow-[0_10px_40px_0_rgba(49,133,252,0.20)] p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-black mb-8">Your Profile Preferences</h2>

          <div className="space-y-6">
            {/* Estimated ATAR */}
            <div className="space-y-2 max-w-[345px]">
              <label className="block text-sm font-medium text-black">Estimated ATAR</label>
              <input type="text" value={atar} onChange={(e) => setAtar(e.target.value)} placeholder="Enter Input" className="w-full px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm text-[#5D5D5D] placeholder:text-[#5D5D5D] focus:outline-none focus:ring-2 focus:ring-primary-blue" />
              <p className="text-[#777] text-xs">This helps us show you courses that match your expected score</p>
            </div>

            {/* HSC Subjects */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">HSC Subjects</label>
              <div className="flex gap-2">
                <input type="text" value={hscSubject} onChange={(e) => setHscSubject(e.target.value)} placeholder="e.g Mathematics Advanced" className="flex-1 px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm text-[#5D5D5D] placeholder:text-[#5D5D5D] focus:outline-none focus:ring-2 focus:ring-primary-blue" />
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary-blue rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap">Add</button>
              </div>
            </div>

            {/* Fields of Interest */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Fields of Interest</label>
              <div className="flex gap-2">
                <input type="text" value={fieldOfInterest} onChange={(e) => setFieldOfInterest(e.target.value)} placeholder="e.g Engineering, Medicine" className="flex-1 px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm text-[#5D5D5D] placeholder:text-[#5D5D5D] focus:outline-none focus:ring-2 focus:ring-primary-blue" />
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary-blue rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap">Add</button>
              </div>
            </div>

            {/* Preferred Location */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">Preferred Location</label>
              <div className="flex gap-2">
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g Sydney, Wollongong, Newcastle" className="flex-1 px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm text-[#5D5D5D] placeholder:text-[#5D5D5D] focus:outline-none focus:ring-2 focus:ring-primary-blue" />
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary-blue rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap">Add</button>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button className="px-4 py-2 text-sm font-medium text-white bg-primary-blue rounded-lg hover:bg-blue-600 transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
