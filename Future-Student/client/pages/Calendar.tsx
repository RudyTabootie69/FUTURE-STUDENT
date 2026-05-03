import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useSavedEvents } from "@/context/SavedEventContext";
import { useEvents } from "@/context/EventContext";
import { buildMonthMatrix, isoKey, monthLabel } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

  //How to load into this
  //On server start connect to local MySQL database
  //Create function that returns events from MySQL server
  //Call server side function on calendar open

export default function Calendar() {
  const [search, setSearch] = useState<string>("");
  const [fieldFilter, setFieldFilter] = useState<string>("All Fields");
  const [eventFilter, setEventFilter] =
    useState<string>("All Events");
  const [viewDate, setViewDate] = useState(new Date(2026, 3, 26));
  const navigate = useNavigate();

  const weeks = useMemo(() => buildMonthMatrix(viewDate), [viewDate]);

  const legendItems = [
    { label: "Deadlines", color: "#FF4757", bgColor: "#FFE8EA" },
    { label: "Events", color: "#3185FC", bgColor: "#E8F4FF" },
    { label: "Start Dates", color: "#2ED573", bgColor: "#E8FFE8" },
    { label: "Important Dates", color: "#FFA726", bgColor: "#FFF3E0" },
  ] as const;

  const categoryMeta = legendItems.reduce<
    Record<string, { color: string; bgColor: string; order: number }>
  >((acc, item, idx) => {
    acc[item.label] = { color: item.color, bgColor: item.bgColor, order: idx };
    return acc;
  }, {});

  const { savedevents } = useSavedEvents();
  const { events } = useEvents();

  function parseDMY(s?: string | null): Date | null {
    if (!s) return null;
    const parts = s.split("-");
    if (parts.length !== 3) return null;
    const [dd, mmm, yyyy] = parts;
    const MONTHS: Record<string, number> = {
      JAN: 0,
      FEB: 1,
      MAR: 2,
      APR: 3,
      MAY: 4,
      JUN: 5,
      JUL: 6,
      AUG: 7,
      SEP: 8,
      OCT: 9,
      NOV: 10,
      DEC: 11,
    };
    const day = parseInt(dd, 10);
    const month = MONTHS[(mmm || "").toUpperCase()] ?? 0;
    const year = parseInt(yyyy, 10);
    const d = new Date(year, month, day);
    return isNaN(d.getTime()) ? null : d;
  }


  // Filtering + sorting pipeline
  const filteredEvents = useMemo(() => {
    const map: 
    Record<string,{ label: string; color: string; bgColor: string; order: number }[]> = {};
    type Category = "Deadlines" | "Events" | "Start Dates" | "Important Dates";

    const add = (
      dateStr: string | undefined,
      category: Category,
      label: string,
      abbr: string,
    ) => {
      const d = parseDMY(dateStr);
      if (!d) return;
      const key = 
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const meta = categoryMeta[category];
      const entry = {
        label: `${abbr} ${label}`,
        color: meta.color,
        bgColor: meta.bgColor,
        order: meta.order,
      };
      if (!map[key]) map[key] = [entry];
      else map[key].push(entry);
    };

    for (const e of savedevents) {
      const abbr = e.eventID?.toString() || e.title;
      
      add(e.date, e.eventType, e.title, abbr);
      if (e.endDate){
        add(e.endDate, "Deadlines", "End: " + e.title, abbr);
      }
    }

    const q = search.trim().toLowerCase();
    let list = events;

    if (q) {
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.eventID.toString().includes(q) ||
          c.location.toLowerCase().includes(q)
      );
    }

    if (fieldFilter !== "All Event Types")
      list = list.filter((c) => c.eventType === fieldFilter);
    if (fieldFilter !== "All Locations")
      list = list.filter((c) => c.location === fieldFilter);
    return list;

  }, [
    savedevents,
    search,
    fieldFilter,
  ]);

  useEffect(() => {
    const keys = Object.keys(filteredEvents);
    if (keys.length === 0) return;
    const today = new Date();
    const todayYMD = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const allDates = keys.map((k) => new Date(k + "T00:00:00"));
    const future = allDates
      .filter((d) => d >= todayYMD)
      .sort((a, b) => a.getTime() - b.getTime());
    const target =
      future[0] ?? allDates.sort((a, b) => a.getTime() - b.getTime())[0];
    if (target)
      setViewDate(new Date(target.getFullYear(), target.getMonth(), 1));
  }, [filteredEvents]);

  const goPrev = () =>
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const goNext = () =>
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const eventLocations = useMemo(() => events.map((u) => u.location), []);
  const eventTypes = useMemo(() => events.map((u) => u.eventType), []);

  const goToEvent = (eventid: string) => {
    if(eventid && eventid in events){
      navigate("/events/",{state: { eventID: eventid }});
    }
  }

  return (
    <div className="min-h-screen bg-bg-soft relative overflow-hidden">
      
      <Navigation />
      
      <div className="absolute left-6 top-[131px] w-[279px] h-[279px] rounded-full bg-[#B3D8FF] opacity-40 pointer-events-none" />
      <div className="absolute left-[42px] top-[835px] w-[662px] h-[662px] rounded-full bg-[#B3D8FF] opacity-40 pointer-events-none" />
      <div className="absolute right-[88px] top-[657px] w-[150px] h-[150px] rounded-full bg-[#B3D8FF] opacity-40 pointer-events-none" />
      
      
      <div className="relative z-10 max-w-[1178px] w-full mx-auto mt-12 lg:mt-[107px] mb-20 px-4 sm:px-6 lg:px-8">
        
      <div className="shadow-[0_10px_40px_0_rgba(49,133,252,0.20)] rounded-2xl overflow-hidden">
          {/* Side Panel For filters */}
      <div className="absolute left-0 hidden lg:block w-[290px]">
          <div className="bg-white border border-[#B3D8FF] rounded-lg p-4 shadow-[0_0_14px_0_rgba(49,133,252,0.15)] space-y-6">
            {/* Filter Header */}
            <div className="flex items-center gap-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.5 7H8.5C8.22386 7 8 7.22386 8 7.5V9.78005C8 9.9202 8.05882 10.0539 8.16214 10.1486L13.8379 15.3514C13.9412 15.4461 14 15.5798 14 15.72V25.0979C14 25.4906 14.432 25.73 14.765 25.5219L17.765 23.6469C17.9112 23.5555 18 23.3953 18 23.2229V15.72C18 15.5798 18.0588 15.4461 18.1621 15.3514L23.8379 10.1486C23.9412 10.0539 24 9.9202 24 9.78005V7.5C24 7.22386 23.7761 7 23.5 7Z"
                  stroke="#6E7491"
                  strokeWidth="2"
                />
              </svg>
              <h2 className="text-2xl font-bold text-[#1A1A1A]">Filters</h2>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 px-3 py-2 border border-[#777] rounded bg-bg-soft">
              <Search className="w-5 h-5 text-grey-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-transparent text-sm text-primary-blue placeholder:text-primary-blue outline-none"
              />
            </div>

            {/* Event Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">
                Event Types
              </label>
              <div className="relative">
                <select
                  value={fieldFilter}
                  onChange={(e) => setFieldFilter(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[#777] rounded bg-bg-soft text-sm text-[#5D5D5D] appearance-none cursor-pointer"
                >
                  <option>Event Types</option>
                  {eventTypes.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-400 pointer-events-none" />
              </div>
            </div>

            {/* Event Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">
                Filters
              </label>
              <div className="relative">
                <select
                  value={eventFilter}
                  onChange={(e) => setEventFilter(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[#777] rounded bg-bg-soft text-sm text-[#5D5D5D] appearance-none cursor-pointer"
                >
                  <option>All Locations</option>
                  {eventLocations.map((u) => (
                    <option key={u}>{u}</option>
                  
                  ))}
                  
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 hidden lg:block ">
          <div className="bg-primary-blue px-4 sm:px-8 pt-6 pb-8">
            <h1 className="text-white text-2xl sm:text-[32px] font-bold leading-normal mb-2">
              My Calendar
            </h1>
            <p className="text-[#B3D8FF] text-sm sm:text-base font-normal">
              Track your NSW university application deadlines and important
              dates
            </p>
          </div>

          <div className="bg-white rounded-b-2xl px-4 sm:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <button
                  aria-label="Previous month"
                  onClick={goPrev}
                  className="w-10 h-10 rounded-lg border border-[#E1E8F0] bg-bg-soft flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h2 className="text-[#1A1A1A] text-xl font-bold min-w-[147px]">
                  {monthLabel(viewDate)}
                </h2>
                <button
                  aria-label="Next month"
                  onClick={goNext}
                  className="w-10 h-10 rounded-lg border border-[#E1E8F0] bg-bg-soft flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3 lg:ml-auto">
                {legendItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-[20px]"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#E1E8F0]">
              <div className="grid grid-cols-7 bg-[#F8FAFC]">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="h-12 flex items-center justify-center text-grey-400 text-[13px] font-normal"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="grid grid-cols-7">
                  {week.map((day, dIdx) => {
                    const dateKey = day ? isoKey(viewDate, day) : "";
                    const dayEvents = day ? filteredEvents[dateKey] || [] : [];
                    return (
                      <Button
                        key={dIdx}
                        className="h-20 sm:h-24 lg:h-[120px] bg-white border-r border-b border-[#F1F5F9] last:border-r-0 p-2 hover:bg-gray-50 transition-colors relative"
                      >
                        {day && (
                          <>
                            <span className="text-[13px] font-bold text-[#1A1A1A]">
                              {day}
                            </span>
                            {dayEvents.length > 0 && (
                              <div className="mt-1 space-y-1 pr-1 overflow-hidden">
                                {dayEvents.map((ev, i) => (
                                  <div
                                    key={i}
                                    className="text-[10px] leading-tight px-1.5 py-0.5 rounded truncate"
                                    style={{
                                      backgroundColor: ev.bgColor,
                                      color: ev.color,
                                    }}
                                  >
                                    {ev.label}
                                    onClick = {() => goToEvent(ev.eventID)}
                                    
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                       
                      </Button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
