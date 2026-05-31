import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Student, studenttoString } from "@shared/types/user";

interface StudentTrackerContextValue {
  trackedstudents: Student[];
  add: (c: Student) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

const StudentTrackerContext = createContext<StudentTrackerContextValue | undefined>(undefined);

const STORAGE_KEY = "trackedstudentsStudents";

export function StudentTrackerProvider({ children }: { children: React.ReactNode }) {
  const [trackedstudents, setStudentTracker] = useState<Student[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setStudentTracker(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trackedstudents));
    } catch {
      // ignore
    }
  }, [trackedstudents]);

  const value = useMemo<StudentTrackerContextValue>(() => ({
    trackedstudents,
    add: (c: Student) =>
      setStudentTracker((prev) => (prev.find((s) => studenttoString(s) === studenttoString(c)) ? prev : [...prev, c])),
    remove: (id: string) => setStudentTracker((prev) => prev.filter((s) => studenttoString(s) !== id)),
    has: (id: string) => trackedstudents.some((s) => studenttoString(s) === id),
    clear: () => setStudentTracker([]),
  }), [trackedstudents]);

  return <StudentTrackerContext.Provider value={value}>{children}</StudentTrackerContext.Provider>;
}

export function useStudentTracker() {
  const ctx = useContext(StudentTrackerContext);
  if (!ctx) throw new Error("useStudentTracker must be used within StudentTrackerProvider");
  return ctx;
}
