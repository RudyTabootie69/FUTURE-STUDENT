import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import type { Event } from "@shared/types/event";
import { toString } from "@shared/types/event";
import {useAuth} from "@/context/AuthContext"

interface EventContextValue {
  events: Event[];
  loading: boolean;
  search: string;
  error: string;
  setSearch:  Dispatch<SetStateAction<string>>;
}

const EventContext = createContext<EventContextValue | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (search.trim().length < 4) {
      setEvents([]);
      return;
    }

    const timeout = setTimeout(() => {
      fetchEvents(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  async function fetchEvents(search) {
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

      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
 

  return <EventContext.Provider value={{events, loading, search, error, setSearch}}>{children}</EventContext.Provider>;
}

export function useEvent() {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useEvent must be used within EventProvider");
  return ctx;
}
