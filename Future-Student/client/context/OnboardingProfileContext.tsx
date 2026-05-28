import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Student, Parent, SecondaryRep, TertiaryRep, Profile, isStudent, isParent, isSecStaff, isTertStaff } from "@shared/types/user";

interface OnboardingProfileContextValue {
  onboardingprofile: Profile;
  save: (p: Profile) => void;
  update: (p: Partial<Profile>) => void;
  clear: () => void;
  onboardingprogress: number;
  increment: () => void;
  decrement: () => void;
  setProgress: (n: number) => void;
}

const STORAGE_KEY1 = "user.onboardingprofile";
const STORAGE_KEY2 = "user.onboardingprogress";

const OnboardingProfileContext = createContext<OnboardingProfileContextValue | undefined>(undefined);

export function OnboardingProfileProvider({ children }: { children: React.ReactNode }) {
  const [onboardingprofile, setOnboardingProfile] = useState<Profile | null>(null);
  const [onboardingprogress, changeProgress] = useState(0);  

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY1);
      if (raw) setOnboardingProfile(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
      try {
        localStorage.setItem(STORAGE_KEY1, JSON.stringify(onboardingprofile));
      } catch {
      }
    }, [onboardingprofile]);
  
  
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY2);
      if (raw) changeProgress(JSON.parse(raw));
      if(!onboardingprogress){
        changeProgress(0);
      }
    } catch {}
  }, []);

  useEffect(() => {
      try {
        localStorage.setItem(STORAGE_KEY2, JSON.stringify(onboardingprofile));
      } catch {
      }
  }, [onboardingprogress]);

  const setNProgress = (n) => {
    if (n === onboardingprogress) return; 
    changeProgress(onboardingprogress);
  };

  const value = useMemo<OnboardingProfileContextValue>(() => ({
    onboardingprofile,
    save: (p) => setOnboardingProfile(p),
    update: (p) =>
      setOnboardingProfile((prev) => {
        if (!prev) return prev
        
        // Use a type guard to handle the update based on current state
        if (isStudent(prev)) {
          return { ...prev, ...p } as Student;
        }
        if (isParent(prev)) {
          return { ...prev, ...p } as Parent;
        }
        if (isSecStaff(prev)) {
          return { ...prev, ...p } as SecondaryRep;
        }
        if (isTertStaff(prev)) {
          return { ...prev, ...p } as TertiaryRep;
        }
        const finalCheck: never = prev;
        return finalCheck;
      }),
    clear: () => setOnboardingProfile(null),
    onboardingprogress,
    setProgress: setNProgress,
    increment: () => changeProgress(prev => prev + 1),
    decrement: () => changeProgress(prev => prev - 1),
  }), [onboardingprofile, onboardingprogress]);

  return <OnboardingProfileContext.Provider value={value}>{children}</OnboardingProfileContext.Provider>;
}

export function useOnboardingProfile() {
  const ctx = useContext(OnboardingProfileContext);
  if (!ctx) throw new Error("useOnboardingProfile must be used within OnboardingProfileProvider");
  return ctx;
}
