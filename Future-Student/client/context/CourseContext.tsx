import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import type { Course } from "@shared/types/course";
import { toString } from "@shared/types/course";
import {useAuth} from "@/context/AuthContext"

interface CourseContextValue {
  courses: Course[];
  loading: boolean;
  search: string;
  error: string;
  setSearch:  Dispatch<SetStateAction<string>>;
}

const CourseContext = createContext<CourseContextValue | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (search.trim().length < 4) {
      setCourses([]);
      return;
    }

    const timeout = setTimeout(() => {
      fetchCourses(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  async function fetchCourses(search) {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `/eventSearch=${encodeURIComponent(search)}`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch results");
      }

      const data = await res.json();

      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
 

  return <CourseContext.Provider value={{courses, loading, search, error, setSearch}}>{children}</CourseContext.Provider>;
}

export function useCourse() {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourse must be used within CourseProvider");
  return ctx;
}
