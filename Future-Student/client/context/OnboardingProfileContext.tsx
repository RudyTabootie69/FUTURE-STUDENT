import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "@shared/types/user";

interface OnboardingProfileContextValue {
  onboardingprofile: User | null;
  save: (p: User) => void;
  update: (p: Partial<User>) => void;
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
  const [onboardingprofile, setOnboardingProfile] = useState<User | null>(null);
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
        
        return {
          ...prev,
          ...p,
        }
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
