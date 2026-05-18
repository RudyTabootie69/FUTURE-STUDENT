import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Student } from "shared/types/user";

interface OnboardingProfileContextValue {
  profile: Student | null;
  save: (p: Student) => void;
  update: (p: Partial<Student>) => void;
  clear: () => void;
}

const STORAGE_KEY = "user.profile";
const OnboardingProfileContext = createContext<OnboardingProfileContextValue | undefined>(undefined);

export function OnboardingProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setOnboardingProfile] = useState<Student | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setOnboardingProfile(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (profile) localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, [profile]);

  const value = useMemo<OnboardingProfileContextValue>(() => ({
    profile,
    save: (p) => setOnboardingProfile(p),
    update: (p) => setOnboardingProfile((prev) => ({ ...(prev ?? {} as Student), ...p } as Student)),
    clear: () => setOnboardingProfile(null),
  }), [profile]);

  return <OnboardingProfileContext.Provider value={value}>{children}</OnboardingProfileContext.Provider>;
}

export function useOnboardingProfile() {
  const ctx = useContext(OnboardingProfileContext);
  if (!ctx) throw new Error("useOnboardingProfile must be used within OnboardingProfileProvider");
  return ctx;
}
