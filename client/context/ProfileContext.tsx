import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { StudentProfile } from "@/types/user";

interface ProfileContextValue {
  profile: StudentProfile | null;
  save: (p: StudentProfile) => void;
  update: (p: Partial<StudentProfile>) => void;
  clear: () => void;
}

const STORAGE_KEY = "user.profile";
const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProfile(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (profile) localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, [profile]);

  const value = useMemo<ProfileContextValue>(() => ({
    profile,
    save: (p) => setProfile(p),
    update: (p) => setProfile((prev) => ({ ...(prev ?? {} as StudentProfile), ...p } as StudentProfile)),
    clear: () => setProfile(null),
  }), [profile]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
