import { useState } from "react";
import Navigation from "@/components/Navigation";
import { useStuProfile, useParentProfile, useStaffProfile } from "@/context/ProfileContext";
import { ProfileSectionCard } from "@/components/InputCard";
import { ProfileInput } from "@/components/ProfileInput";
import { ProfileSelect } from "@/components/ProfileSelect";

export default function Profile() {
  const { stuprofile, stuupdate } = useStuProfile();
  const { parprofile, parupdate } = useParentProfile();
  const { staffprofile, staffupdate } = useStaffProfile();
  const [atar, setAtar] = useState("");
  const [hscSubject, setHscSubject] = useState("");
  const [fieldOfInterest, setFieldOfInterest] = useState("");
  const [location, setLocation] = useState("");
  
  if(stuprofile){
  return (
      <div className="min-h-screen bg-bg-soft">
        <Navigation />

        {/* Header */}
        <div className="w-full h-[140px] bg-primary-blue flex flex-col justify-center px-6 lg:px-80">
          <h1 className="text-white text-3xl font-bold mb-1">
            {stuprofile?.firstName || " " || stuprofile?.lastName || "Your Name"}
          </h1>
          <p className="text-white text-sm">{stuprofile?.getUserType() || ""}</p>
        </div>

        {/* Personal Details */}
        <ProfileSectionCard title="Personal Details">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ProfileInput
              className="sm:col-span-2"
              label="Full Name"
              value={stuprofile?.firstName || ""}
              onChange={(value) => stuupdate({ firstName: value })}
            />
            <ProfileInput
              className="sm:col-span-2"
              label="Full Name"
              value={stuprofile?.lastName || ""}
              onChange={(value) => stuupdate({ lastName: value })}
            />

            <ProfileInput
              label="NESA account number"
              value={stuprofile?.nesaNumber || ""}
              onChange={(value) => stuupdate({ nesaNumber: value })}
            />

            <ProfileInput
              label="UAC ID"
              value={stuprofile?.uacId || ""}
              onChange={(value) => stuupdate({ uacId: value })}
            />

            <ProfileInput
              label="USI"
              value={stuprofile?.usi || ""}
              onChange={(value) => stuupdate({ usi: value })}
            />

            <ProfileInput
              label="Anticipated entry year"
              type="number"
              value={stuprofile?.entryYear ?? ""}
              onChange={(value) => stuupdate({ entryYear: Number(value) })}
            />

            <ProfileInput
              label="Date of birth"
              type="date"
              value={stuprofile?.dob || ""}
              onChange={(value) => stuupdate({ dob: value })}
            />

            <ProfileSelect
              label="Sex"
              value={stuprofile?.sex || ""}
              onChange={(value) => stuupdate({ sex: value as any })}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
            />

            <ProfileInput
              label="School name"
              value={stuprofile?.schoolName || ""}
              onChange={(value) => stuupdate({ schoolName: value })}
            />

            <ProfileInput
              className="sm:col-span-2"
              label="Home address"
              value={stuprofile?.address || ""}
              onChange={(value) => stuupdate({ address: value })}
            />

            <ProfileSelect
              label="First in family to attend higher education?"
              value={stuprofile?.firstInFamily || ""}
              onChange={(value) => stuupdate({ firstInFamily: value })}
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
                { label: "Prefer not to say", value: "Prefer not to say" },
              ]}
            />

            <ProfileSelect
              label="Indigenous or Torres Strait Islander?"
              value={stuprofile?.indigenous || ""}
              onChange={(value) => stuupdate({ indigenous: value })}
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
                { label: "Prefer not to say", value: "Prefer not to say" },
              ]}
            />

            <ProfileInput
              className="sm:col-span-2"
              label="Cultural Background"
              value={stuprofile?.culturalBackground || ""}
              onChange={(value) => stuupdate({ culturalBackground: value })}
            />
          </div>
        </ProfileSectionCard>

        {/* Payment Summary */}
        {stuprofile?.payment && (
          <div className="mt-6 p-4 border rounded-lg bg-bg-soft">
            <div className="text-sm text-[#1A1A1A]">Payment method on file</div>
            <div className="text-sm text-[#777]">
              {stuprofile.payment.brand} •••• {stuprofile.payment.last4}
            </div>
          </div>
        )}

        <ProfileSectionCard title="Your Profile Preferences">
          <div className="space-y-6">
            <ProfileInput
              className="sm:col-span-2"
              label="Estimated ATAR"
              value={atar}
              onChange={setAtar}
            />

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
        </ProfileSectionCard>
      </div>
    );
  }
  else if(parprofile){
  return (
      <div className="min-h-screen bg-bg-soft">
        <Navigation />

        {/* Header */}
        <div className="w-full h-[140px] bg-primary-blue flex flex-col justify-center px-6 lg:px-80">
          <h1 className="text-white text-3xl font-bold mb-1">
            {parprofile?.firstName || " " || parprofile?.lastName || "Your Name"}
          </h1>
          <p className="text-white text-sm">{parprofile?.getUserType() || ""}</p>
        </div>

        {/* Personal Details */}
        <ProfileSectionCard title="Personal Details">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ProfileInput
              className="sm:col-span-2"
              label="Full Name"
              value={parprofile?.firstName || ""}
              onChange={(value) => parupdate({ firstName: value })}
            />
            <ProfileInput
              className="sm:col-span-2"
              label="Full Name"
              value={parprofile?.lastName || ""}
              onChange={(value) => parupdate({ lastName: value })}
            />

            <ProfileInput
              label="Date of birth"
              type="date"
              value={parprofile?.dob || ""}
              onChange={(value) => parupdate({ dob: value })}
            />

            <ProfileSelect
              label="Sex"
              value={parprofile?.sex || ""}
              onChange={(value) => parupdate({ sex: value as any })}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
            />

            <ProfileInput
              label="School name"
              value={parprofile?.schoolName || ""}
              onChange={(value) => parupdate({ schoolName: value })}
            />

            <ProfileInput
              className="sm:col-span-2"
              label="Home address"
              value={parprofile?.address || ""}
              onChange={(value) => parupdate({ address: value })}
            />
          </div>
        </ProfileSectionCard>

        {/* Payment Summary */}
        {parprofile?.payment && (
          <div className="mt-6 p-4 border rounded-lg bg-bg-soft">
            <div className="text-sm text-[#1A1A1A]">Payment method on file</div>
            <div className="text-sm text-[#777]">
              {parprofile.payment.brand} •••• {parprofile.payment.last4}
            </div>
          </div>
        )}

        <ProfileSectionCard title="Your Profile Preferences">
          <div className="space-y-6">
            <ProfileInput
              className="sm:col-span-2"
              label="Estimated ATAR"
              value={atar}
              onChange={setAtar}
            />

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
        </ProfileSectionCard>
      </div>
    );
  }
  else if(staffprofile){
  return (
      <div className="min-h-screen bg-bg-soft">
        <Navigation />

        {/* Header */}
        <div className="w-full h-[140px] bg-primary-blue flex flex-col justify-center px-6 lg:px-80">
          <h1 className="text-white text-3xl font-bold mb-1">
            {staffprofile?.firstName || " " || staffprofile?.lastName || "Your Name"}
          </h1>
          <p className="text-white text-sm">{staffprofile?.getUserType() || ""}</p>
        </div>

        {/* Personal Details */}
        <ProfileSectionCard title="Personal Details">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ProfileInput
              className="sm:col-span-2"
              label="Full Name"
              value={staffprofile?.firstName || ""}
              onChange={(value) => staffupdate({ firstName: value })}
            />
            <ProfileInput
              className="sm:col-span-2"
              label="Full Name"
              value={staffprofile?.lastName || ""}
              onChange={(value) => staffupdate({ lastName: value })}
            />


            <ProfileInput
              label="Date of birth"
              type="date"
              value={staffprofile?.dob || ""}
              onChange={(value) => staffupdate({ dob: value })}
            />

            <ProfileSelect
              label="Sex"
              value={staffprofile?.sex || ""}
              onChange={(value) => staffupdate({ sex: value as any })}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
            />

            <ProfileInput
              label="School name"
              value={staffprofile?.schoolName || ""}
              onChange={(value) => staffupdate({ schoolName: value })}
            />

            <ProfileInput
              className="sm:col-span-2"
              label="Home address"
              value={staffprofile?.address || ""}
              onChange={(value) => staffupdate({ address: value })}
            />
          </div>
        </ProfileSectionCard>

        {/* Payment Summary */}
        {staffprofile?.payment && (
          <div className="mt-6 p-4 border rounded-lg bg-bg-soft">
            <div className="text-sm text-[#1A1A1A]">Payment method on file</div>
            <div className="text-sm text-[#777]">
              {staffprofile.payment.brand} •••• {staffprofile.payment.last4}
            </div>
          </div>
        )}

        <ProfileSectionCard title="Your Profile Preferences">
          <div className="space-y-6">
            <ProfileInput
              className="sm:col-span-2"
              label="Estimated ATAR"
              value={atar}
              onChange={setAtar}
            />

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
        </ProfileSectionCard>
      </div>
    );
  }

}
