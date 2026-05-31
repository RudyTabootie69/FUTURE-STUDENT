import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import { Student, studenttoString } from "@shared/types/user";
import { requestdelay } from "@/pages/data/connection-data";
import { isParent, isSecStaff } from "@shared/types/user";
import { useProfile } from "./ProfileContext";

interface StudentContextValue {
  students,
  sortBy,
  setSortBy: Dispatch<SetStateAction<"none" | "school" | "firstname" | "lastname" >>
  setScroll: Dispatch<SetStateAction<number>>
  scrollStudents: () => void;
}

const StudentContext = createContext<StudentContextValue | undefined>(undefined);

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState(null);
  const [scroll, setScroll] = useState(0);
  const [sortBy, setSortBy] = useState<"none" | "school" | "firstname" | "lastname" >("none");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useProfile();

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchStudents(sortBy);
    }, requestdelay);

    return () => clearTimeout(timeout);
  }, [sortBy]);

  useEffect(() => {
    fetchStudents(sortBy)
  }, []);
  
  
  async function fetchStudents(sortBy) {
      setLoading(true);
      setError(null);
      if(isParent(profile)){
        try{
          const response = await fetch("/backend/studentsearch", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: 
              JSON.stringify({"parID": profile.id, "sortBy": sortBy, "offset": 0}), 
              
          });
          if (!response.ok) {
            const res = await response.json();
            throw new Error(res || "Request failed");
            }
            const res = await response.json();
            if (!res.data) {
              throw new Error("Failed to fetch results");
            }

            const data = res.data;
            console.log(data);
            setStudents(data);
          } catch (err) {
            setError(err.message);
          }finally {
        setLoading(false);
    }
      }
      else if(isSecStaff(profile)){
        try{
          const response = await fetch("/backend/studentsearch", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: 
              JSON.stringify({"secID": profile.id, "sortBy": sortBy, "offset": 0}), 
              
          });
          if (!response.ok) {
            const res = await response.json();
            throw new Error(res || "Request failed");
            }
            const res = await response.json();
            if (!res.data) {
              throw new Error("Failed to fetch results");
            }

            const data = res.data;
            console.log(data);
            setStudents(data);
          } catch (err) {
            setError(err.message);
          }finally {
            setLoading(false);
          }
        }
    }

    const scrollStudents = async ()  => {
      try {
        setLoading(true);
        setError(null);
        if(isParent(profile)){
            const response = await fetch("/backend/studentsearch", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: 
                JSON.stringify({"parID": profile.id, "sortBy": sortBy, "offset": scroll*20}), 
            });
            if (!response.ok) {
                const res = await response.json();
                throw new Error(res || "Request failed");
            }
            const res = await response.json();
            if (!res.data) {
              throw new Error("Failed to fetch results");
            }

            const data = await res.json();
            setStudents(prev => [...prev, ...data]);
        }
        else if(isSecStaff(profile)){
            const response = await fetch("/backend/studentsearch", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: 
                JSON.stringify({"secID": profile.id, "sortBy": sortBy, "offset": scroll*20}), 
            });
            if (!response.ok) {
                const res = await response.json();
                throw new Error(res || "Request failed");
            }
            const res = await response.json();
            if (!res.data) {
              throw new Error("Failed to fetch results");
            }

            const data = await res.json();
            setStudents(prev => [...prev, ...data]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
    }

    
  }

  return <StudentContext.Provider value={{students, sortBy, setSortBy, setScroll, scrollStudents}}>{children}</StudentContext.Provider>;
}

export function useStudents() {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("useStudents must be used within StudentProvider");
  return ctx;
}
