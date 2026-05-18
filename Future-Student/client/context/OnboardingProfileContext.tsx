import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import type { User } from "@shared/types/user";;

interface OnboardingProfileContextValue {
  profile: User | null;
}

const OnboardingProfileContext = createContext<OnboardingProfileContextValue | undefined>(undefined);


export const OnboardingProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setOnboardingProfile] = useState<User | null>(null);
  const { token } = useAuth();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setOnboardingProfile(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("/backend/users/autologin", {
          credentials: "include",
        });

        const data = await res.json();
        setOnboardingProfile(data);
      } catch (err) {
        console.error(err);
        setOnboardingProfile(null);
      }
    };
    fetchUser();

  }, [isAuthenticated]);

  const refreshProfile = async () => {
    if (!isAuthenticated) return;

    try {
      const res = await fetch("/backend/users/refresh", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setOnboardingProfile(data);
    } catch (err) {
      console.error(err);
      setOnboardingProfile(null);
    }
  }

  return <OnboardingProfileContext.Provider value={{profile, ...refreshProfile}}> {children} </OnboardingProfileContext.Provider>;
}

export function useOnboardingProfile() {
  const ctx = useContext(OnboardingProfileContext);
  if (!ctx) throw new Error("useOnboardingProfile must be used within OnboardingProfileProvider");
  return ctx;
}
