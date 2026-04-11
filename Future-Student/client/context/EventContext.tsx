import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Event } from "@/types/event";
import { toString } from "@/types/event";

interface eventContextValue {
  event: Event[];
  add: (c: Event) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

const eventContext = createContext<eventContextValue | undefined>(undefined);

const STORAGE_KEY = "eventEvents";

export function eventProvider({ children }: { children: React.ReactNode })
 {
  const [event, setevent] = useState<Event[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setevent(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(event));
    } catch {
      // ignore
    }
  }, [event]);

  const value = useMemo<eventContextValue>(() => ({
    event,
    add: (c: Event) =>
      setevent((prev) => (prev.find((p) => toString(p) === toString(c)) ? prev : [...prev, c])),
    remove: (id: string) => setevent((prev) => prev.filter((p) => toString(p) !== id)),
    has: (id: string) => event.some((p) => toString(p) === id),
    clear: () => setevent([]),
  }), [event]);

  return <eventContext.Provider value={value}>{children}</eventContext.Provider>;
}

export function useevent() {
  const ctx = useContext(eventContext);
  if (!ctx) throw new Error("useevent must be used within eventProvider");
  return ctx;
}
