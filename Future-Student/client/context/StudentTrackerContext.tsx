import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Course } from "@shared/types/course";
import { toString } from "@shared/types/course";

interface StudentTrackerContextValue {
  trackedstudents: Course[];
  add: (c: Course) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

const StudentTrackerContext = createContext<StudentTrackerContextValue | undefined>(undefined);

const STORAGE_KEY = "trackedstudentsCourses";

export function StudentTrackerProvider({ children }: { children: React.ReactNode }) {
  const [trackedstudents, setStudentTracker] = useState<Course[]>([]);

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
    add: (c: Course) =>
      setStudentTracker((prev) => (prev.find((p) => toString(p) === toString(c)) ? prev : [...prev, c])),
    remove: (id: string) => setStudentTracker((prev) => prev.filter((p) => toString(p) !== id)),
    has: (id: string) => trackedstudents.some((p) => toString(p) === id),
    clear: () => setStudentTracker([]),
  }), [trackedstudents]);

  return <StudentTrackerContext.Provider value={value}>{children}</StudentTrackerContext.Provider>;
}

export function useStudentTracker() {
  const ctx = useContext(StudentTrackerContext);
  if (!ctx) throw new Error("useStudentTracker must be used within StudentTrackerProvider");
  return ctx;
}
