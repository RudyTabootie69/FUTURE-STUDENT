import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";

function monthLabel(date: Date) {
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}

function buildMonthMatrix(viewDate: Date) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth(); // 0-based

  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  while (cells.length < 42) cells.push(null);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

function isoKey(date: Date, day: number) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function Calendar() {
  const [viewDate, setViewDate] = useState(new Date(2025, 9, 1)); // October 2025

  const weeks = useMemo(() => buildMonthMatrix(viewDate), [viewDate]);

  const eventMarkers: Record<string, { color: string }> = {
    ["2025-10-24"]: { color: "#3185FC" },
  };

  const legendItems = [
    { label: "Deadlines", color: "#FF4757", bgColor: "#FFE8EA" },
    { label: "Events", color: "#3185FC", bgColor: "#E8F4FF" },
    { label: "Start Dates", color: "#2ED573", bgColor: "#E8FFE8" },
    { label: "Important Dates", color: "#FFA726", bgColor: "#FFF3E0" },
  ];

  const goPrev = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const goNext = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="min-h-screen bg-bg-soft relative overflow-hidden">
      <Navigation />

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
              Track your NSW university application deadlines and important dates
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
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium" style={{ color: item.color }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#E1E8F0]">
              <div className="grid grid-cols-7 bg-[#F8FAFC]">
                {daysOfWeek.map((day) => (
                  <div key={day} className="h-12 flex items-center justify-center text-grey-400 text-[13px] font-normal">
                    {day}
                  </div>
                ))}
              </div>

              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="grid grid-cols-7">
                  {week.map((day, dIdx) => {
                    const dateKey = day ? isoKey(viewDate, day) : "";
                    const marker = day ? eventMarkers[dateKey] : undefined;
                    return (
                      <div
                        key={dIdx}
                        className="h-20 sm:h-24 lg:h-[120px] bg-white border-r border-b border-[#F1F5F9] last:border-r-0 p-2 hover:bg-gray-50 transition-colors relative"
                      >
                        {day && (
                          <>
                            <span className={`text-[13px] font-bold ${marker ? "text-primary-blue" : "text-[#1A1A1A]"}`}>
                              {day}
                            </span>
                            {marker && (
                              <div className="absolute top-6 left-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: marker.color }} />
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
