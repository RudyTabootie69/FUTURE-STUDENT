import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import type { Course } from "@shared/types/course";
import { toString } from "@shared/types/course";
import {useAuth} from "@/context/AuthContext"
import { requestdelay } from "@/pages/data/connection-data";

interface CourseContextValue {
  courses: Course[];
  loading: boolean;
  error: string;
  search: string;
  fieldFilter: string;
  universityFilter: string;
  atarMin: number;
  atarMax: number;
  sortBy: "none" | "uni" | "course"
  setSearch:  Dispatch<SetStateAction<string>>;
  setFieldFilter:  Dispatch<SetStateAction<string>>;
  setUniversityFilter:  Dispatch<SetStateAction<string>>;
  setAtarMin: Dispatch<SetStateAction<number>>
  setAtarMax: Dispatch<SetStateAction<number>>
  setSortBy: Dispatch<SetStateAction<"none" | "uni" | "course">>
}

const CourseContext = createContext<CourseContextValue | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fieldFilter, setFieldFilter] = useState<string>("All Fields");
  const [universityFilter, setUniversityFilter] = useState<string>("All Universities");
  const [atarMin, setAtarMin] = useState<number>(30);
  const [atarMax, setAtarMax] = useState<number>(99.95);
  const [sortBy, setSortBy] = useState<"none" | "uni" | "course">("none");
  
  useEffect(() => {
    if (search.trim().length < 4) {
      return;
    }

    const timeout = setTimeout(() => {
      fetchCourses(search);
    }, requestdelay);

    return () => clearTimeout(timeout);
  }, [
    courses,
    search,
    fieldFilter,
    universityFilter,
    atarMin,
    atarMax,
    sortBy
  ]);

  async function fetchCourses(search) {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `/courseSearch=${encodeURIComponent(search)}`, {
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
  

  const filteredCourses = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = courses.filter(
      (c) => c.atar === undefined || (c.atar >= atarMin && c.atar <= atarMax),
    );

    if (q) {
      list = list.filter(
        (c) =>
          c.university.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q),
      );
    }

    if (fieldFilter !== "All Fields")
      list = list.filter((c) => c.field === fieldFilter);
    if (universityFilter !== "All Universities")
      list = list.filter((c) => c.university === universityFilter);

    if (sortBy === "uni")
      list = [...list].sort((a, b) => a.university.localeCompare(b.university));
    if (sortBy === "course")
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [
    courses,
    search,
    fieldFilter,
    universityFilter,
    atarMin,
    atarMax,
    sortBy,
  ]);


  return <CourseContext.Provider value={{courses, loading, error, search, fieldFilter, universityFilter, atarMin, atarMax, sortBy, setSearch, setFieldFilter, setUniversityFilter, setAtarMin, setAtarMax, setSortBy}}>{children}</CourseContext.Provider>;
}

export function useCourseFinder() {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourse must be used within CourseProvider");
  return ctx;
}
