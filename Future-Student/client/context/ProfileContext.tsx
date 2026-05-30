import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Student, Parent, SecondaryRep, TertiaryRep, Profile, isStudent, isParent, isSecStaff, isTertStaff } from "@shared/types/user";
import { clear } from "console";


interface ProfileContextValue {
  profile: Profile;
  save: (p: Profile) => void;
  update: (p: Partial<Profile>) => void;
  logout: () => void;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);


export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { isAuthenticated,  clearCookies } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      setProfile(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("/backend/users/autologin", {
          credentials: "include",
        });

        const data = await res.json();
        setProfile(data);
        navigate("/home");
      } catch (err) {
        navigate("/");
        console.error(err);
        setProfile(null);
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
      setProfile(data);
    } catch (err) {
      console.error(err);
      setProfile(null);
    }
  }



  const value = useMemo<ProfileContextValue>(() => ({
    profile,
    save: (p) => setProfile(p),
    update: (p) =>
      setProfile((prev) => {
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
    logout: () =>{
      clearCookies();
    }
  }), [profile]);

  return <ProfileContext.Provider value={value}> {children} </ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
