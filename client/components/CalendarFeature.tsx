import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { buildMonthMatrix, isoKey, monthLabel, parseDMY } from "@/lib/utils";
import { LEGEND_ITEMS } from "@/pages/data/calendar-data";

export function Calendar() {
  const [viewDate, setViewDate] = useState(new Date(2025, 9, 1));

  const weeks = useMemo(() => buildMonthMatrix(viewDate), [viewDate]);

  const categoryMeta = LEGEND_ITEMS.reduce<
    Record<string, { color: string; bgColor: string; order: number }>
  >((acc, item, idx) => {
    acc[item.label] = { color: item.color, bgColor: item.bgColor, order: idx };
    return acc;
  }, {});

  const { wishlist } = useWishlist();

  const eventsMap = useMemo(() => {
    const map: Record<
      string,
      { label: string; color: string; bgColor: string; order: number }[]
    > = {};

    type Category = "Deadlines" | "Events" | "Start Dates" | "Important Dates";
    const add = (
      dateStr: string | undefined,
      category: Category,
      label: string,
      abbr: string,
    ) => {
      const d = parseDMY(dateStr);
      if (!d) return;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
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

    for (const c of wishlist) {
      const abbr = c.code?.split("-")?.[0] || c.university;
      add(c.closingDate, "Deadlines", "Applications Close", abbr);
      add(c.openDayDate, "Events", "Open Day", abbr);
      add(c.expoDate, "Events", "Expo", abbr);
      add(c.startDate, "Start Dates", "Term Starts", abbr);
      add(c.applicationOpenDate, "Important Dates", "Applications Open", abbr);
      add(c.offerReleaseDate, "Important Dates", "Offer Release", abbr);
    }

    for (const key of Object.keys(map)) {
      map[key].sort(
        (a, b) => a.order - b.order || a.label.localeCompare(b.label),
      );
    }

    return map;
  }, [wishlist]);

  useEffect(() => {
    const keys = Object.keys(eventsMap);
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
  }, [eventsMap]);

  const goPrev = () =>
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const goNext = () =>
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="min-h-screen bg-bg-soft relative overflow-hidden">
      <div className="absolute left-6 top-[131px] w-[279px] h-[279px] rounded-full bg-[#B3D8FF] opacity-40 pointer-events-none" />
      <div className="absolute left-[42px] top-[835px] w-[662px] h-[662px] rounded-full bg-[#B3D8FF] opacity-40 pointer-events-none" />
      <div className="absolute right-[88px] top-[657px] w-[150px] h-[150px] rounded-full bg-[#B3D8FF] opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-[1153px] w-full mx-auto mt-12 lg:mt-[107px] mb-20 px-4 sm:px-6 lg:px-8">
        <div className="shadow-[0_10px_40px_0_rgba(49,133,252,0.20)] rounded-2xl overflow-hidden">
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
                {LEGEND_ITEMS.map((item) => (
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
                    const dayEvents = day ? eventsMap[dateKey] || [] : [];
                    return (
                      <div
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
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
