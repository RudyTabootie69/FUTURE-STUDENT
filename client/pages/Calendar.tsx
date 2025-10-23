import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState("October 2025");

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const calendarDays = [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 31, null],
  ];

  const eventMarkers = {
    24: { type: "event", color: "#3185FC" },
  };

  const legendItems = [
    { label: "Deadlines", color: "#FF4757", bgColor: "#FFE8EA" },
    { label: "Events", color: "#3185FC", bgColor: "#E8F4FF" },
    { label: "Start Dates", color: "#2ED573", bgColor: "#E8FFE8" },
    { label: "Important Dates", color: "#FFA726", bgColor: "#FFF3E0" },
  ];

  return (
    <div className="min-h-screen bg-bg-soft relative overflow-hidden">
      <Navigation />

      {/* Decorative background circles */}
      <div className="absolute left-6 top-[131px] w-[279px] h-[279px] rounded-full bg-[#B3D8FF] opacity-40 pointer-events-none" />
      <div className="absolute left-[42px] top-[835px] w-[662px] h-[662px] rounded-full bg-[#B3D8FF] opacity-40 pointer-events-none" />
      <div className="absolute right-[88px] top-[657px] w-[150px] h-[150px] rounded-full bg-[#B3D8FF] opacity-40 pointer-events-none" />

      {/* Main calendar container */}
      <div className="relative z-10 max-w-[1153px] w-full mx-auto mt-12 lg:mt-[107px] mb-20 px-4 sm:px-6 lg:px-8">
        <div className="shadow-[0_10px_40px_0_rgba(49,133,252,0.20)] rounded-2xl overflow-hidden">
          {/* Header section */}
          <div className="bg-primary-blue px-4 sm:px-8 pt-6 pb-8">
            <h1 className="text-white text-2xl sm:text-[32px] font-bold leading-normal mb-2">
              My Calendar
            </h1>
            <p className="text-[#B3D8FF] text-sm sm:text-base font-normal">
              Track your NSW university application deadlines and important dates
            </p>
          </div>

          {/* Calendar content */}
          <div className="bg-white rounded-b-2xl px-4 sm:px-8 py-6">
            {/* Calendar controls and legend */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
              {/* Month navigation */}
              <div className="flex items-center gap-4">
                <button className="w-10 h-10 rounded-lg border border-[#E1E8F0] bg-bg-soft flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h2 className="text-[#1A1A1A] text-xl font-bold min-w-[147px]">
                  {currentMonth}
                </h2>
                <button className="w-10 h-10 rounded-lg border border-[#E1E8F0] bg-bg-soft flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Legend */}
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

            {/* Calendar grid */}
            <div className="rounded-xl overflow-hidden border border-[#E1E8F0]">
              {/* Day headers */}
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

              {/* Calendar days */}
              {calendarDays.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="h-20 sm:h-24 lg:h-[120px] bg-white border-r border-b border-[#F1F5F9] last:border-r-0 p-2 hover:bg-gray-50 transition-colors relative"
                    >
                      {day && (
                        <>
                          <span
                            className={`text-[13px] font-bold ${
                              eventMarkers[day]
                                ? "text-primary-blue"
                                : "text-[#1A1A1A]"
                            }`}
                          >
                            {day}
                          </span>
                          {eventMarkers[day] && (
                            <div
                              className="absolute top-6 left-2 w-1.5 h-1.5 rounded-full"
                              style={{
                                backgroundColor: eventMarkers[day].color,
                              }}
                            />
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
