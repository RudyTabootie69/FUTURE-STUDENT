import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { useProfile } from "@/context/ProfileContext";
import { ProfileSectionCard } from "@/components/InputCard";
import { ProfileInput } from "@/components/ProfileInput";
import { ProfileSelect } from "@/components/ProfileSelect";
import { useNavigate } from "react-router-dom";
import {User, Student, Parent, SecondaryRep, TertiaryRep, isStudent, isParent, isSecStaff, isTertStaff, indigenous, firstInFamily, getUserType} from "@shared/types/user";

export default function Profile() {
  const navigate = useNavigate();
  const { profile, update } = useProfile();
  const [atar, setAtar] = useState("");
  const [hscSubject, setHscSubject] = useState("");
  const [fieldOfInterest, setFieldOfInterest] = useState("");
  const [location, setLocation] = useState("");
  

  if(isStudent(profile)){
  return (
      <div className="min-h-screen bg-bg-soft" >
        <Navigation />

        {/* Header */}
        <div className="w-full h-[140px] bg-primary-blue flex flex-col justify-center px-6 lg:px-80" id = "profile">
          <h1 className="text-white text-3xl font-bold mb-1">
            {profile?.firstName || " " || profile?.lastName || "Your Name"}
          </h1>
          <p className="text-white text-sm">{getUserType(profile) || ""}</p>
        </div>

        {/* Personal Details */}
        <ProfileSectionCard title="Personal Details" >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ProfileInput
              className="sm:col-span-2"
              label="First Name"
              value={profile?.firstName || ""}
              onChange={(value) => update({ firstName: value })}
            />
            <ProfileInput
              className="sm:col-span-2"
              label="Last Name"
              value={profile?.lastName || ""}
              onChange={(value) => update({ lastName: value })}
            />

            <ProfileInput
              label="NESA account number"
              value={profile?.nesaNumber || ""}
              onChange={(value) => {
                const filterNonNumbers = value.replace(/\D/g, "");
                update({nesaNumber: filterNonNumbers} as Partial<Student>)}}
            />

            <ProfileInput
              label="UAC ID"
              value={profile?.uacId || ""}
              onChange={(value) => update({ uacId: value }as Partial<Student>)}
            />

            <ProfileInput
              label="USI"
              value={profile?.usi || ""}
              onChange={(value) => update({ usi: value }as Partial<Student>)}
            />

            <ProfileInput
              label="Anticipated entry year"
              type="number"
              value={profile?.entryYear ?? ""}
              onChange={(value) => update({ entryYear: Number(value) }as Partial<Student>)}
            />

            <ProfileInput
              label="Date of birth"
              type="date"
              value={profile?.dob || ""}
              onChange={(value) => update({ dob: value })}
            />

            <ProfileSelect
              label="Sex"
              value={profile?.gender || ""}
              onChange={(value) => update({ gender: value as any })}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
            />

            <ProfileInput
              label="School name"
              value={profile?.schoolName || ""}
              onChange={(value) => update({ schoolName: value }as Partial<Student>)}
            />

            <ProfileInput
              className="sm:col-span-2"
              label="Home address"
              value={profile?.address || ""}
              onChange={(value) => update({ address: value })}
            />

            <ProfileSelect
              label="First in family to attend higher education?"
              value={profile?.firstInFamily || ""}
              onChange={(value) => update({ firstInFamily: value as firstInFamily }as Partial<Student>)}
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
                { label: "Prefer not to say", value: "Prefer not to say" },
              ]}
            />

            <ProfileSelect
              label="Indigenous or Torres Strait Islander?"
              value={profile?.indigenous || ""}
              onChange={(value) => update({ indigenous: value as indigenous }as Partial<Student>)}
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
                { label: "Prefer not to say", value: "Prefer not to say" },
              ]}
            />

            <ProfileInput
              className="sm:col-span-2"
              label="Cultural Background"
              value={profile?.culturalBackground || ""}
              onChange={(value) => update({ culturalBackground: value }as Partial<Student>)}
            />
          </div>
        </ProfileSectionCard>

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
                  maxLength={20}
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
  else if(isParent(profile)){
  return (
      <div className="min-h-screen bg-bg-soft">
        <Navigation />

        {/* Header */}
        <div className="w-full h-[140px] bg-primary-blue flex flex-col justify-center px-6 lg:px-80" id = "profile">
          <h1 className="text-white text-3xl font-bold mb-1">
            {profile?.firstName || " " || profile?.lastName || "Your Name"}
          </h1>
          <p className="text-white text-sm">{getUserType(profile) || ""}</p>
        </div>

        {/* Personal Details */}
        <div id = "profile">
        <ProfileSectionCard title="Personal Details">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" >
            <ProfileInput
              className="sm:col-span-2"
              label="First Name"
              value={profile?.firstName || ""}
              onChange={(value) => update({ firstName: value })}
            />
            <ProfileInput
              className="sm:col-span-2"
              label="Last Name"
              value={profile?.lastName || ""}
              onChange={(value) => update({ lastName: value })}
            />

            <ProfileInput
              label="Date of birth"
              type="date"
              value={profile?.dob || ""}
              onChange={(value) => update({ dob: value })}
            />

            <ProfileSelect
              label="Sex"
              value={profile?.gender || ""}
              onChange={(value) => update({ gender: value as any })}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
            />

            <ProfileInput
              className="sm:col-span-2"
              label="Home address"
              value={profile?.address || ""}
              onChange={(value) => update({ address: value })}
            />
          </div>
        </ProfileSectionCard>
        </div>
        {/* Payment Summary */}
        {/*
        {profile?.payment && (
          <div className="mt-6 p-4 border rounded-lg bg-bg-soft">
            <div className="text-sm text-[#1A1A1A]">Payment method on file</div>
            <div className="text-sm text-[#777]">
              {profile.payment.brand} •••• {profile.payment.last4}
            </div>
          </div>
        )}
        */}
      </div>
    );
  }
  else if(isSecStaff(profile)){
  return (
      <div className="min-h-screen bg-bg-soft">
        <Navigation />

        {/* Header */}
        <div className="w-full h-[140px] bg-primary-blue flex flex-col justify-center px-6 lg:px-80" id = "profile">
          <h1 className="text-white text-3xl font-bold mb-1">
            {profile?.firstName || " " || profile?.lastName || "Your Name"}
          </h1>
          <p className="text-white text-sm">{getUserType(profile) || ""}</p>
        </div>

        {/* Personal Details */}
        <div id = "profile">
        <ProfileSectionCard title="Personal Details">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" id = "profile">
            <ProfileInput
              className="sm:col-span-2"
              label="First Name"
              value={profile?.firstName || ""}
              onChange={(value) => update({ firstName: value })}
            />
            <ProfileInput
              className="sm:col-span-2"
              label="Last Name"
              value={profile?.lastName || ""}
              onChange={(value) => update({ lastName: value })}
            />


            <ProfileInput
              label="Date of birth"
              type="date"
              value={profile?.dob || ""}
              onChange={(value) => update({ dob: value })}
            />

            <ProfileSelect
              label="Sex"
              value={profile?.gender || ""}
              onChange={(value) => update({ gender: value as any })}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
            />

            <ProfileInput
              label="School name"
              value={profile?.schoolName || ""}
              onChange={(value) => update({ schoolName: value } as Partial<SecondaryRep> )}
            />

            <ProfileInput
              className="sm:col-span-2"
              label="Home address"
              value={profile?.address || ""}
              onChange={(value) => update({ address: value })}
            />
          </div>
        </ProfileSectionCard>
        </div>
        {/* Payment Summary */}
        {/*
        {profile?.payment && (
          <div className="mt-6 p-4 border rounded-lg bg-bg-soft">
            <div className="text-sm text-[#1A1A1A]">Payment method on file</div>
            <div className="text-sm text-[#777]">
              {profile.payment.brand} •••• {profile.payment.last4}
            </div>
          </div>
        )}
        */}
      </div>
    );
  }

}
