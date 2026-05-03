import { useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import type { Course } from "@/types/course";
import { toString } from "@/types/course";
import { useWishlist } from "@/context/WishlistContext";
import { useNavigate } from "react-router-dom";

export default function CourseFinder() {
  const navigate = useNavigate();
  // Filters & sort
  const [search, setSearch] = useState<string>("");
  const [fieldFilter, setFieldFilter] = useState<string>("All Fields");
  const [universityFilter, setUniversityFilter] =
    useState<string>("All Universities");
  const [atarMin, setAtarMin] = useState<number>(30);
  const [atarMax, setAtarMax] = useState<number>(99.95);
  const [sortBy, setSortBy] = useState<"none" | "uni" | "course">("none");

  //The functionality here needs to be replaced with searching and saving universities
  //Make iterable loadedUniversities and loadedDegrees
  const universities = [
    {
      name: "University of Wollongong",
      location: "Wollongong, NSW",
      abbr: "UOW",
    },
    {
      name: "Australian National University",
      location: "Acton, CBR",
      abbr: "ANU",
    },
    {
      name: "University of New South Wales",
      location: "Kensington, NSW",
      abbr: "UNSW",
    },
    { name: "University of Sydney", location: "Camperdown, NSW", abbr: "USYD" },
    {
      name: "University of Technology Sydney",
      location: "Ultimo, NSW",
      abbr: "UTS",
    },
    {
      name: "Macquarie University",
      location: "Macquarie Park, NSW",
      abbr: "MQ",
    },
    {
      name: "Western Sydney University",
      location: "Parramatta, NSW",
      abbr: "WSU",
    },
    {
      name: "University of Newcastle",
      location: "Callaghan, NSW",
      abbr: "UON",
    },
    { name: "University of Canberra", location: "Bruce, ACT", abbr: "UC" },
    {
      name: "Charles Sturt University",
      location: "Wagga Wagga, NSW",
      abbr: "CSU",
    },
    {
      name: "Australian Catholic University",
      location: "North Sydney, NSW",
      abbr: "ACU",
    },
    {
      name: "University of New England",
      location: "Armidale, NSW",
      abbr: "UNE",
    },
  ];

  const degrees = [
    {
      title: "Bachelor of Computer Science",
      abbr: "CS",
      field: "Computing & IT",
    },
    {
      title: "Bachelor of Information Technology",
      abbr: "IT",
      field: "Computing & IT",
    },
    { title: "Bachelor of Data Science", abbr: "DS", field: "Computing & IT" },
    {
      title: "Bachelor of Software Engineering",
      abbr: "SE",
      field: "Computing & IT",
    },
    {
      title: "Bachelor of Electrical Engineering",
      abbr: "EE",
      field: "Engineering",
    },
    {
      title: "Bachelor of Mechanical Engineering",
      abbr: "ME",
      field: "Engineering",
    },
    {
      title: "Bachelor of Civil Engineering",
      abbr: "CE",
      field: "Engineering",
    },
    { title: "Bachelor of Business", abbr: "BUS", field: "Business" },
    { title: "Bachelor of Commerce", abbr: "BCOM", field: "Business" },
    { title: "Bachelor of Accounting", abbr: "ACC", field: "Business" },
    { title: "Bachelor of Finance", abbr: "FIN", field: "Business" },
    { title: "Bachelor of Law", abbr: "LLB", field: "Law" },
    { title: "Bachelor of Arts", abbr: "BA", field: "Arts & Design" },
    { title: "Bachelor of Design", abbr: "DES", field: "Arts & Design" },
    { title: "Bachelor of Architecture", abbr: "ARCH", field: "Arts & Design" },
    {
      title: "Bachelor of Education",
      abbr: "EDU",
      field: "Education & Health",
    },
    { title: "Bachelor of Nursing", abbr: "NURS", field: "Education & Health" },
    {
      title: "Bachelor of Psychology",
      abbr: "PSY",
      field: "Education & Health",
    },
    { title: "Bachelor of Biomedical Science", abbr: "BIOM", field: "Science" },
    { title: "Bachelor of Pharmacy", abbr: "PHAR", field: "Science" },
    {
      title: "Bachelor of Environmental Science",
      abbr: "ENV",
      field: "Science",
    },
    {
      title: "Bachelor of Communication",
      abbr: "COMM",
      field: "Arts & Design",
    },
  ];

  const sem1 = { start: "26-FEB-2026", close: "31-JAN-2026" };
  const sem2 = { start: "22-JUL-2026", close: "30-JUN-2026" };

  // Date helpers for D-MMM-YYYY strings
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
  function parseDMY(s: string): Date {
    // expects like 26-FEB-2026
    const [dd, mmm, yyyy] = s.split("-");
    const d = parseInt(dd, 10);
    const m = MONTHS[mmm as keyof typeof MONTHS] ?? 0;
    const y = parseInt(yyyy, 10);
    return new Date(y, m, d);
  }
  function fmtDMY(d: Date): string {
    const inv: string[] = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const dd = String(d.getDate()).padStart(2, "0");
    const mmm = inv[d.getMonth()];
    const yyyy = d.getFullYear();
    return `${dd}-${mmm}-${yyyy}`;
  }
  function addDays(base: Date, days: number): Date {
    const d = new Date(base);
    d.setDate(d.getDate() + days);
    return d;
  }

  // Generate varied entries (12 universities x 12 degrees = 144)
  //Replace with call for ALL courses?
  const courses: Course[] = useMemo(() => {
    const chosenDegrees = degrees;
    const out: Course[] = [];
    let i = 0;
    universities.forEach((uni, ui) => {
      chosenDegrees.forEach((deg, di) => {
        const sem = (ui + di) % 2 === 0 ? sem1 : sem2;
        const atar = 50 + ((ui * 13 + di * 7) % 50); // ~50–99
        const startD = parseDMY(sem.start);
        const closeD = parseDMY(sem.close);
        const appOpenD = addDays(closeD, -90 - ((ui * 3 + di) % 15));
        const openDayD = addDays(startD, -45 + ((ui + di) % 10));
        const offerRelD = addDays(startD, -10 + ((ui * 2 + di) % 5));
        const expoD = addDays(closeD, -60 + ((ui * 5 + di) % 7));
        out.push({
          uacID: i++,
          university: uni.name,
          location: uni.location,
          title: deg.title,
          code: `${uni.abbr}-${deg.abbr}-${String(di + 1).padStart(2, "0")}`,
          startDate: sem.start,
          closingDate: sem.close,
          applicationOpenDate: fmtDMY(appOpenD),
          openDayDate: fmtDMY(openDayD),
          offerReleaseDate: fmtDMY(offerRelD),
          expoDate: fmtDMY(expoD),
          atar,
          field: deg.field,
        });
      });
    });
    return out;
  }, []);

  const universityNames = useMemo(() => universities.map((u) => u.name), []);
  const fieldOptions = useMemo(
    () => [...Array.from(new Set(degrees.map((d) => d.field)))],
    [],
  );

  const { add, has } = useWishlist();

  // Filtering + sorting pipeline
  const filteredCourses = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = courses.filter(
      (c) => c.atar === undefined || (c.atar >= atarMin && c.atar <= atarMax),
    );

    if (q) {
      list = list.filter(
        (c) =>
          c.university.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q),
      );
    }

    if (fieldFilter !== "All Fields")
      list = list.filter((c) => c.field === fieldFilter);
    if (universityFilter !== "All Universities")
      list = list.filter((c) => c.university === universityFilter);

    if (sortBy === "uni")
      list = [...list].sort((a, b) => a.university.localeCompare(b.university));
    if (sortBy === "course")
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [
    courses,
    search,
    fieldFilter,
    universityFilter,
    atarMin,
    atarMax,
    sortBy,
  ]);

  const goToCourse = (course: Course) => {
    if(course){
      navigate("/course",{state: { course: course }});
    }
  }

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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter by course, institution, or code"
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
                  {fieldOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
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
                  {universityNames.map((u) => (
                    <option key={u}>{u}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-400 pointer-events-none" />
              </div>
            </div>

            {/* ATAR Slider */}
            <div className="space-y-3">
              <label className="block text-base text-[#1E1E1E]">
                ATAR Requirement: {atarMin.toFixed(2)} – {atarMax.toFixed(2)}
              </label>
              <div className="relative">
                <input
                  type="range"
                  min={30}
                  max={99.95}
                  step={0.05}
                  value={atarMin}
                  onChange={(e) =>
                    setAtarMin(Math.min(Number(e.target.value), atarMax))
                  }
                  className="w-full h-2 bg-[#E6E6E6] rounded-full appearance-none"
                />
                <input
                  type="range"
                  min={30}
                  max={99.95}
                  step={0.05}
                  value={atarMax}
                  onChange={(e) =>
                    setAtarMax(Math.max(Number(e.target.value), atarMin))
                  }
                  className="w-full h-2 bg-transparent -mt-2 appearance-none"
                />
              </div>
              <div className="flex justify-between text-sm text-[#777]">
                <span>{atarMin.toFixed(2)}</span>
                <span>{atarMax.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Table */}
        <div className="flex-1 overflow-hidden">
          <div className="bg-white border border-[#E9E8FC] rounded-2xl overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-end gap-3 p-3 border-b border-[#E9E8FC]">
              <label className="text-sm text-grey-400">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2 py-1 border border-[#E1E8F0] rounded text-sm"
              >
                <option value="none">None</option>
                <option value="uni">University (A–Z)</option>
                <option value="course">Course (A–Z)</option>
              </select>
            </div>

            {/* Scrollable vertical list */}
            <div className="h-[632px] overflow-x-auto overflow-y-auto">
              <table className="w-full">
                <tbody className="divide-y divide-[#E9E8FC]">
                  {filteredCourses.map((course, index) => (
                    <tr
                      key={toString(course) + index}
                      className="hover:bg-gray-50 transition-colors"
                      onClick = {() => goToCourse(course)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                        
                          <div className="w-12 h-12 rounded-full bg-primary-blue flex-shrink-0" />
                          <div className="min-w-0 flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
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
                                {course.title}
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
                            <div className="text-right">
                              {has(toString(course)) ? (
                                <button
                                  className="px-3 py-2 text-sm border border-gray-300 text-gray-400 rounded-md cursor-default"
                                  disabled
                                >
                                  Added
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => {e.stopPropagation(), add(course)}}
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
