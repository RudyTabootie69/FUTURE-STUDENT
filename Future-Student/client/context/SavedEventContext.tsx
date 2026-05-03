import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Event } from "@/types/event";
import { toString } from "@/types/event";

interface savedEventContextValue {
  savedevents: Event[];
  add: (e: Event) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

const SavedEventContext = createContext<savedEventContextValue | undefined>(undefined);

const STORAGE_KEY = "savedEvents";

export function SavedEventProvider({ children }: { children: React.ReactNode })
 {
  const [savedevents, setsavedevent] = useState<Event[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setsavedevent(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedevents));
    } catch {
      // ignore
    }
  }, [savedevents]);

  const value = useMemo<savedEventContextValue>(() => ({
    savedevents,
    add: (e: Event) =>
      setsavedevent((prev) => (prev.find((p) => toString(p) === toString(e)) ? prev : [...prev, e])),
    remove: (id: string) => setsavedevent((prev) => prev.filter((p) => toString(p) !== id)),
    has: (id: string) => savedevents.some((p) => toString(p) === id),
    clear: () => setsavedevent([]),
  }), [savedevents]);

  return <SavedEventContext.Provider value={value}>{children}</SavedEventContext.Provider>;
}

export function useSavedEvents() {
  const ctx = useContext(SavedEventContext);
  if (!ctx) throw new Error("useevent must be used within savedEventProvider");
  return ctx;
}
