import { useState } from "react";
import Navigation from "@/components/Navigation";

export default function Profile() {
  const [atar, setAtar] = useState("");
  const [hscSubject, setHscSubject] = useState("");
  const [fieldOfInterest, setFieldOfInterest] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="min-h-screen bg-bg-soft">
      <Navigation />

      {/* Header */}
      <div className="w-full h-[140px] bg-primary-blue flex flex-col justify-center px-6 lg:px-80">
        <h1 className="text-white text-3xl font-bold mb-1">Lachlan Grogan</h1>
        <p className="text-white text-sm">lachlangrogan@email.com</p>
      </div>

      {/* Profile Form */}
      <div className="max-w-[821px] mx-auto px-4 -mt-8 pb-20 relative z-10">
        <div className="bg-white rounded-xl shadow-[0_10px_40px_0_rgba(49,133,252,0.20)] p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-black mb-8">Your Profile</h2>

          <div className="space-y-6">
            {/* Estimated ATAR */}
            <div className="space-y-2 max-w-[345px]">
              <label className="block text-sm font-medium text-black">
                Estimated ATAR
              </label>
              <input
                type="text"
                value={atar}
                onChange={(e) => setAtar(e.target.value)}
                placeholder="Enter Input"
                className="w-full px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm text-[#5D5D5D] placeholder:text-[#5D5D5D] focus:outline-none focus:ring-2 focus:ring-primary-blue"
              />
              <p className="text-[#777] text-xs">
                This helps us show you courses that match your expected score
              </p>
            </div>

            {/* HSC Subjects */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">
                HSC Subjects
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={hscSubject}
                  onChange={(e) => setHscSubject(e.target.value)}
                  placeholder="e.g Mathematics Advanced"
                  className="flex-1 px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm text-[#5D5D5D] placeholder:text-[#5D5D5D] focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary-blue rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap">
                  Add
                </button>
              </div>
            </div>

            {/* Fields of Interest */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">
                Fields of Interest
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={fieldOfInterest}
                  onChange={(e) => setFieldOfInterest(e.target.value)}
                  placeholder="e.g Engineering, Medicine"
                  className="flex-1 px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm text-[#5D5D5D] placeholder:text-[#5D5D5D] focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary-blue rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap">
                  Add
                </button>
              </div>
            </div>

            {/* Preferred Location */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">
                Preferred Location
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g Sydney, Wollongong, Newcastle"
                  className="flex-1 px-3 py-2.5 border border-[#1A1818] rounded-lg bg-bg-soft text-sm text-[#5D5D5D] placeholder:text-[#5D5D5D] focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary-blue rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap">
                  Add
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button className="px-4 py-2 text-sm font-medium text-white bg-primary-blue rounded-lg hover:bg-blue-600 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
