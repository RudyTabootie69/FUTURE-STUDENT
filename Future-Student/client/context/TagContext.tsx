import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Tag } from "@shared/types/tag";

interface TagContextValue {
  tags: Tag[];
  courseTags: Tag[];
  eventTags: Tag[];
  fetchTags: () => Promise<void>;
}

const TagContext = createContext<TagContextValue | undefined>(undefined);


export function TagProvider({ children }: { children: React.ReactNode })
 {
  const [tags, setTags] = useState([]);
  const [courseTags, setCourseTags] = useState([]);
  const [eventTags, setEventTags] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchTags = async () => {
    try {
      const res = await fetch("/backend/tags", {
        credentials: "include",
      });

      const data = await res.json();
      setTags(data);
    } catch (err) {
      console.error("Failed to load tags", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);



  return <TagContext.Provider value={{tags, courseTags, eventTags, fetchTags}}>{children}</TagContext.Provider>;
}

export function useTags() {
  const ctx = useContext(TagContext);
  if (!ctx) throw new Error("usetag must be used within tagProvider");
  return ctx;
}
