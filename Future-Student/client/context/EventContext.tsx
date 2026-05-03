import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Event } from "@/types/event";
import { toString } from "@/types/event";

interface EventContextValue {
  events: Event[];
  add: (e: Event) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

const EventContext = createContext<EventContextValue | undefined>(undefined);


export function EventProvider({ children }: { children: React.ReactNode })
 {
  const [events, setevent] = useState<Event[]>([]);

  const value = useMemo<EventContextValue>(() => ({
    events,
    add: (e: Event) =>
      setevent((prev) => (prev.find((p) => toString(p) === toString(e)) ? prev : [...prev, e])),
    remove: (id: string) => setevent((prev) => prev.filter((p) => toString(p) !== id)),
    has: (id: string) => events.some((p) => toString(p) === id),
    clear: () => setevent([]),
  }), [events]);

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}

export function useEvents() {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useevent must be used within eventProvider");
  return ctx;
}
