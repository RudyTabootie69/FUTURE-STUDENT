import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "@shared/types/user";

interface OnboardingProfileContextValue {
  onboardingprofile: User | null;
  save: (p: User) => void;
  update: (p: Partial<User>) => void;
  clear: () => void;
  onboardingprogress: number;
  increment: (n: number) => void;
  decrement: (n: number) => void;
  setProgress: (n: number) => void;
}


const STORAGE_KEY = "user.onboardingprofile";
const OnboardingProfileContext = createContext<OnboardingProfileContextValue | undefined>(undefined);

export function OnboardingProfileProvider({ children }: { children: React.ReactNode }) {
  const [onboardingprofile, setOnboardingProfile] = useState<User | null>(null);
  const [onboardingprogress, changeProgress] = useState(0);  

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setOnboardingProfile(JSON.parse(raw));
    } catch {}
  }, []);

  const value = useMemo<OnboardingProfileContextValue>(() => ({
    onboardingprofile,
    save: (p) => setOnboardingProfile(p),
    update: (p) =>
      setOnboardingProfile((prev) => {
        if (!prev) return prev
        
        return {
          ...prev,
          ...p,
        }
      }),
    clear: () => setOnboardingProfile(null),
    onboardingprogress,
    increment: () => changeProgress(onboardingprogress + 1),
    decrement: () => changeProgress(onboardingprogress - 1),
    setProgress: (n) => changeProgress(n)
  }), [onboardingprofile]);

  return <OnboardingProfileContext.Provider value={value}>{children}</OnboardingProfileContext.Provider>;
}

export function useOnboardingProfile() {
  const ctx = useContext(OnboardingProfileContext);
  if (!ctx) throw new Error("useOnboardingProfile must be used within OnboardingProfileProvider");
  return ctx;
}
