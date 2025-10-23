import { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import type { Course } from "@/types/course";
import { courseId } from "@/types/course";
import { useWishlist } from "@/context/WishlistContext";

export default function CourseFinder() {
  const [fieldFilter, setFieldFilter] = useState("All Fields");
  const [universityFilter, setUniversityFilter] = useState("All Universities");

  const baseCourses: Course[] = [
    {
      university: "University of Wollongong",
      location: "Wollongong, NSW",
      degree: "Bachelor of Computer Science",
      code: "7C8DB0",
      startDate: "02-MAR-2026",
      closingDate: "13-JAN-2026",
    },
    {
      university: "Australian National University",
      location: "Acton, CBR",
      degree: "Bachelor of Computing",
      code: "ANU-COMP",
      startDate: "23-FEB-2026",
      closingDate: "06-FEB-2026",
    },
    {
      university: "University of New South Wales",
      location: "Kensington, NSW",
      degree: "Bachelor of Science (Computer Science)",
      code: "UNSW-CS",
      startDate: "16-FEB-2026",
      closingDate: "22-JAN-2026",
    },
    {
      university: "University of Wollongong",
      location: "Liverpool, NSW",
      degree: "Bachelor of Computer Science Bachelor of Laws",
      code: "UOW-CS-LLB",
      startDate: "02-MAR-2026",
      closingDate: "29-JAN-2026",
    },
    {
      university: "University of Western Sydney",
      location: "Parramatta",
      degree: "Bachelor of Computer Science",
      code: "UWS-CS",
      startDate: "02-MAR-2026",
      closingDate: "06-FEB-2026",
    },
  ];

  // Expand to many entries for scroll demo
  const courses: Course[] = useMemo(() => {
    const out: Course[] = [];
    for (let i = 0; i < 12; i++) {
      for (const c of baseCourses) {
        out.push({
          ...c,
          code: `${c.code}-${i + 1}`,
          startDate: c.startDate,
          closingDate: c.closingDate,
        });
      }
    }
    return out;
  }, []);

  const { add, has } = useWishlist();

  return (
    <div className="min-h-screen bg-bg-soft">
      <Navigation />

      {/* Header */}
      <div className="w-full h-[140px] bg-primary-blue flex items-center justify-start px-6 lg:px-36">
        <div>
          <h1 className="text-white text-3xl font-bold mb-2">
            Find Your Perfect Course
          </h1>
          <p className="text-white text-sm">
            Explore thousands of University courses across NSW
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8 flex gap-6">
        {/* Filters Sidebar */}
        <div className="hidden lg:block w-[290px] flex-shrink-0">
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
                placeholder="Find Your Perfect Course"
                className="flex-1 bg-transparent text-sm text-primary-blue placeholder:text-primary-blue outline-none"
              />
            </div>

            {/* Field of Study */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">
                Field of Study
              </label>
              <div className="relative">
                <select
                  value={fieldFilter}
                  onChange={(e) => setFieldFilter(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[#777] rounded bg-bg-soft text-sm text-[#5D5D5D] appearance-none cursor-pointer"
                >
                  <option>All Fields</option>
                  <option>Computer Science</option>
                  <option>Engineering</option>
                  <option>Medicine</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-400 pointer-events-none" />
              </div>
            </div>

            {/* University */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-black">
                University
              </label>
              <div className="relative">
                <select
                  value={universityFilter}
                  onChange={(e) => setUniversityFilter(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[#777] rounded bg-bg-soft text-sm text-[#5D5D5D] appearance-none cursor-pointer"
                >
                  <option>All Universities</option>
                  <option>University of Wollongong</option>
                  <option>Australian National University</option>
                  <option>University of New South Wales</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-400 pointer-events-none" />
              </div>
            </div>

            {/* ATAR Slider */}
            <div className="space-y-3">
              <label className="block text-base text-[#1E1E1E]">
                ATAR Requirement: Up to 99.95
              </label>
              <div className="relative h-2 bg-[#E6E6E6] rounded-full">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#2C2C2C] rounded-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#2C2C2C] rounded-full" />
              </div>
              <div className="flex justify-between text-sm text-[#777]">
                <span>30</span>
                <span>99.95</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Table */}
        <div className="flex-1 overflow-hidden">
          <div className="bg-white border border-[#E9E8FC] rounded-2xl shadow-[0_11.963px_47.851px_0_rgba(49,133,252,0.20)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <tbody className="divide-y divide-[#E9E8FC]">
                  {courses.map((course, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary-blue flex-shrink-0" />
                          <div className="min-w-0 flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-1">
                              <div className="font-normal text-[#27273F] text-base">
                                {course.university}
                              </div>
                              <div className="text-grey-400 text-base">
                                {course.location}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="font-normal text-[#27273F] text-base">
                                {course.degree}
                              </div>
                              <div className="text-grey-400 text-base">
                                {course.code}
                              </div>
                            </div>
                            <div className="space-y-1 text-right">
                              <div className="font-normal text-[#27273F] text-base">
                                Course Starts
                              </div>
                              <div className="text-grey-400 text-base">
                                {course.startDate}
                              </div>
                            </div>
                            <div className="space-y-1 text-right">
                              <div className="font-normal text-[#27273F] text-base">
                                Final Closing
                              </div>
                              <div className="text-grey-400 text-base">
                                {course.closingDate}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
