import { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import type { Course } from "@/types/course";
import { courseId } from "@/types/course";
import { useWishlist } from "@/context/WishlistContext";

export default function CourseFinder() {
  const [fieldFilter, setFieldFilter] = useState("All Fields");
  const [universityFilter, setUniversityFilter] = useState("All Universities");

  const universities = [
    { name: "University of Wollongong", location: "Wollongong, NSW", abbr: "UOW" },
    { name: "Australian National University", location: "Acton, CBR", abbr: "ANU" },
    { name: "University of New South Wales", location: "Kensington, NSW", abbr: "UNSW" },
    { name: "University of Sydney", location: "Camperdown, NSW", abbr: "USYD" },
    { name: "University of Technology Sydney", location: "Ultimo, NSW", abbr: "UTS" },
    { name: "Macquarie University", location: "Macquarie Park, NSW", abbr: "MQ" },
    { name: "Western Sydney University", location: "Parramatta, NSW", abbr: "WSU" },
    { name: "University of Newcastle", location: "Callaghan, NSW", abbr: "UON" },
    { name: "University of Canberra", location: "Bruce, ACT", abbr: "UC" },
    { name: "Charles Sturt University", location: "Wagga Wagga, NSW", abbr: "CSU" },
    { name: "Australian Catholic University", location: "North Sydney, NSW", abbr: "ACU" },
    { name: "University of New England", location: "Armidale, NSW", abbr: "UNE" },
  ];

  const degrees = [
    { title: "Bachelor of Computer Science", abbr: "CS" },
    { title: "Bachelor of Information Technology", abbr: "IT" },
    { title: "Bachelor of Data Science", abbr: "DS" },
    { title: "Bachelor of Software Engineering", abbr: "SE" },
    { title: "Bachelor of Electrical Engineering", abbr: "EE" },
    { title: "Bachelor of Mechanical Engineering", abbr: "ME" },
    { title: "Bachelor of Civil Engineering", abbr: "CE" },
    { title: "Bachelor of Business", abbr: "BUS" },
    { title: "Bachelor of Commerce", abbr: "BCOM" },
    { title: "Bachelor of Accounting", abbr: "ACC" },
    { title: "Bachelor of Finance", abbr: "FIN" },
    { title: "Bachelor of Law", abbr: "LLB" },
    { title: "Bachelor of Arts", abbr: "BA" },
    { title: "Bachelor of Design", abbr: "DES" },
    { title: "Bachelor of Architecture", abbr: "ARCH" },
    { title: "Bachelor of Education", abbr: "EDU" },
    { title: "Bachelor of Nursing", abbr: "NURS" },
    { title: "Bachelor of Psychology", abbr: "PSY" },
    { title: "Bachelor of Biomedical Science", abbr: "BIOM" },
    { title: "Bachelor of Pharmacy", abbr: "PHAR" },
    { title: "Bachelor of Environmental Science", abbr: "ENV" },
    { title: "Bachelor of Communication", abbr: "COMM" },
  ];

  const sem1 = { start: "26-FEB-2026", close: "31-JAN-2026" };
  const sem2 = { start: "22-JUL-2026", close: "30-JUN-2026" };

  // Generate ~144 varied entries (12 universities x 12 selected degrees)
  const courses: Course[] = useMemo(() => {
    const chosenDegrees = degrees.slice(0, 12); // pick 12 diverse degrees
    const out: Course[] = [];
    universities.forEach((uni, ui) => {
      chosenDegrees.forEach((deg, di) => {
        const sem = (ui + di) % 2 === 0 ? sem1 : sem2;
        out.push({
          university: uni.name,
          location: uni.location,
          degree: deg.title,
          code: `${uni.abbr}-${deg.abbr}-${String(di + 1).padStart(2, "0")}`,
          startDate: sem.start,
          closingDate: sem.close,
        });
      });
    });
    return out; // 12*12 = 144 entries
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
          <div className="bg-white border border-[#E9E8FC] rounded-2xl shadow-[1px_1px_3px_0_rgba(0,0,0,1)] overflow-hidden">
            {/* Scrollable vertical list */}
            <div className="h-[632px] overflow-y-auto">
              <table className="w-full">
                <tbody className="divide-y divide-[#E9E8FC]">
                  {courses.map((course, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary-blue flex-shrink-0" />
                          <div className="min-w-0 flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                            <div className="space-y-1">
                              <div className="font-normal text-[#27273F] text-base">{course.university}</div>
                              <div className="text-grey-400 text-base">{course.location}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="font-normal text-[#27273F] text-base">{course.degree}</div>
                              <div className="text-grey-400 text-base">{course.code}</div>
                            </div>
                            <div className="space-y-1 text-right">
                              <div className="font-normal text-[#27273F] text-base">Course Starts</div>
                              <div className="text-grey-400 text-base">{course.startDate}</div>
                            </div>
                            <div className="space-y-1 text-right">
                              <div className="font-normal text-[#27273F] text-base">Final Closing</div>
                              <div className="text-grey-400 text-base">{course.closingDate}</div>
                            </div>
                            <div className="text-right">
                              {has(courseId(course)) ? (
                                <button className="px-3 py-2 text-sm border border-gray-300 text-gray-400 rounded-md cursor-default" disabled>
                                  Added
                                </button>
                              ) : (
                                <button
                                  onClick={() => add(course)}
                                  className="px-3 py-2 text-sm border border-primary-blue text-primary-blue rounded-md hover:bg-blue-50"
                                >
                                  Add to Wishlist
                                </button>
                              )}
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
