import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import type { User } from "@shared/types/user";;

interface ProfileContextValue {
  profile: User | null;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);


export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<User | null>(null);
  const { token } = useAuth();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setProfile(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/autologin", {
          credentials: "include",
        });

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
        setProfile(null);
      }
    };
    fetchUser();

  }, [isAuthenticated]);

  const refreshProfile = async () => {
    if (!isAuthenticated) return;

    try {
      const res = await fetch("/api/users/refresh", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setProfile(data);
    } catch (err) {
      console.error(err);
      setProfile(null);
    }
  }

  return <ProfileContext.Provider value={{profile, ...refreshProfile}}> {children} </ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
