import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Student } from "@/types/user";
import type { Parent } from "@/types/user";
import type { Staff } from "@/types/user";

interface StuProfileContextValue {
  stuprofile: Student | null;
  stusave: (p: Student) => void;
  stuupdate: (p: Partial<Student>) => void;
  stuclear: () => void;
}

interface ParProfileContextValue {
  parprofile: Parent | null;
  parsave: (p: Parent) => void;
  parupdate: (p: Partial<Parent>) => void;
  parclear: () => void;
}

interface StaffProfileContextValue {
  staffprofile: Staff | null;
  staffsave: (p: Staff) => void;
  staffupdate: (p: Partial<Staff>) => void;
  staffclear: () => void;
}

const STORAGE_KEY = "user.profile";
const stuProfileContext = createContext<StuProfileContextValue | undefined>(undefined);
const parProfileContext = createContext<ParProfileContextValue | undefined>(undefined);
const staffProfileContext = createContext<StaffProfileContextValue | undefined>(undefined);

export const StuProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [stuprofile, setStuProfile] = useState<Student | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setStuProfile(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (stuprofile) localStorage.setItem(STORAGE_KEY, JSON.stringify(stuprofile));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, [stuprofile]);

  const value = useMemo<StuProfileContextValue>(() => ({
    stuprofile,
    stusave: (p) => setStuProfile(p),
    stuupdate: (p) => setStuProfile((prev) => ({ ...(prev ?? {} as Student), ...p } as Student)),
    stuclear: () => setStuProfile(null),
  }), [stuprofile]);

  return <stuProfileContext.Provider value={value}> {children} </stuProfileContext.Provider>;
}

export function useStuProfile() {
  const ctx = useContext(stuProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}


export const ParProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [parprofile, setProfile] = useState<Parent | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProfile(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (parprofile) localStorage.setItem(STORAGE_KEY, JSON.stringify(parprofile));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, [parprofile]);

  const value = useMemo<ParProfileContextValue>(() => ({
    parprofile,
    parsave: (p) => setProfile(p),
    parupdate: (p) => setProfile((prev) => ({ ...(prev ?? {} as Parent), ...p } as Parent)),
    parclear: () => setProfile(null),
  }), [parprofile]);

  return <parProfileContext.Provider value={value}>{children}</parProfileContext.Provider>;
}

export function useParentProfile() {
  const ctx = useContext(parProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}

export const StaffProfileProvider = ({ children }: { children: React.ReactNode }) =>{
  const [staffprofile, setProfile] = useState<Staff | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProfile(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (staffprofile) localStorage.setItem(STORAGE_KEY, JSON.stringify(staffprofile));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, [staffprofile]);

  const value = useMemo<StaffProfileContextValue>(() => ({
    staffprofile,
    staffsave: (p) => setProfile(p),
    staffupdate: (p) => setProfile((prev) => ({ ...(prev ?? {} as Staff), ...p } as Staff)),
    staffclear: () => setProfile(null),
  }), [staffprofile]);

  return <staffProfileContext.Provider value={value}>{children}</staffProfileContext.Provider>;
}

export function useStaffProfile() {
  const ctx = useContext(staffProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
