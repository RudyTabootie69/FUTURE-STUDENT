import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import type { Course } from "@shared/types/course";
import { toString } from "@shared/types/course";
import {useAuth} from "@/context/AuthContext"
import { requestdelay } from "@/pages/data/connection-data";

interface DisplayCourse{}
interface CourseContextValue {
  courses: Course[];
  scrollCourses: () => void;
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
  setScroll: Dispatch<SetStateAction<number>>
}

const CourseContext = createContext<CourseContextValue | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState<string>(" ");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scroll, setScroll] = useState(0);
  const [fieldFilter, setFieldFilter] = useState<string>("All Fields");
  const [universityFilter, setUniversityFilter] = useState<string>("All Universities");
  const [atarMin, setAtarMin] = useState<number>(30);
  const [atarMax, setAtarMax] = useState<number>(99.95);
  const [sortBy, setSortBy] = useState<"none" | "uni" | "course">("none");
  
  useEffect(() => {
    if (search.trim().length < 0) {
      return;
    }

    const timeout = setTimeout(() => {
      fetchCourses(search, fieldFilter, universityFilter, atarMin, atarMax, sortBy);
    }, requestdelay);

    return () => clearTimeout(timeout);
  }, [
    search,
    fieldFilter,
    universityFilter,
    atarMin,
    atarMax,
    sortBy
  ]);

  async function fetchCourses(search, fieldFilter, universityFilter, atarMin, atarMax, sortBy) {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/backend/coursesearch", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: 
          JSON.stringify({"search": search, "fieldFilter": fieldFilter, "universityFilter": universityFilter, "atarMin": atarMin, "atarMax": atarMax, "sortBy": sortBy, "offset": 0}), 
      });
      const res = await response.json();
      if (!res.data) {
        throw new Error("Failed to fetch results");
      }

      const data = res.data;
      console.log(data);
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  const scrollCourses = async ()  => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/backend/coursesearch", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: 
          JSON.stringify({"search": search, "fieldFilter": fieldFilter, "universityFilter": universityFilter, "atarMin": atarMin, "atarMax": atarMax, "sortBy": sortBy, "offset": scroll*20}), 
      });

      const res = await response.json();
      if (!res.data) {
        throw new Error("Failed to fetch results");
      }

      const data = res.data;
      setCourses(prev => [...prev, ...data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return <CourseContext.Provider value={{courses, loading, error, search, fieldFilter, universityFilter, atarMin, atarMax, sortBy, scrollCourses, setScroll, setSearch, setFieldFilter, setUniversityFilter, setAtarMin, setAtarMax, setSortBy}}>{children}</CourseContext.Provider>;
}

export function useCourseFinder() {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourse must be used within CourseProvider");
  return ctx;
}
