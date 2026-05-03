import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Course } from "@/types/course";
import { toString } from "@/types/course";

interface CourseContextValue {
  courses: Course[];
  add: (c: Course) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

const CourseContext = createContext<CourseContextValue | undefined>(undefined);

const STORAGE_KEY = "coursesCourses";

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourse] = useState<Course[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCourse(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);
  
  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
    } catch {
      // ignore
    }
  }, [courses]);

  const value = useMemo<CourseContextValue>(() => ({
    courses,
    add: (c: Course) =>
      setCourse((prev) => (prev.find((p) => toString(p) === toString(c)) ? prev : [...prev, c])),
    remove: (id: string) => setCourse((prev) => prev.filter((p) => toString(p) !== id)),
    has: (id: string) => courses.some((p) => toString(p) === id),
    clear: () => setCourse([]),
  }), [courses]);

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export function useCourse() {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourse must be used within CourseProvider");
  return ctx;
}
