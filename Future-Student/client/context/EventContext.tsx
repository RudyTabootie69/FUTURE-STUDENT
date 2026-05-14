import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Event } from "@/types/event";

interface EventContextValue {
  events: Event[];
  loading: boolean;
  fetchEvents: () => Promise<void>;
}

const EventContext = createContext<EventContextValue | undefined>(undefined);


export function EventProvider({ children }: { children: React.ReactNode })
 {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events", {
        credentials: "include",
      });

      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Failed to load events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);



  return <EventContext.Provider value={{events, loading, fetchEvents}}>{children}</EventContext.Provider>;
}

export function useEvents() {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useevent must be used within eventProvider");
  return ctx;
}
