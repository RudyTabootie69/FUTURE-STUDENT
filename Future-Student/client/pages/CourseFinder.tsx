import { useMemo, useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import type { Course } from "@shared/types/course";
import { toString } from "@shared/types/course";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCourseFinder } from "@/context/CourseContext";
import {useTags} from "@/context/TagContext"
import { universities } from "./data/universities";
import { useRef } from "react";

export default function CourseFinder() {
  const navigate = useNavigate();
  const { courses, search, fieldFilter, universityFilter, atarMin, atarMax, sortBy, setSearch, scrollCourses, setScroll, setFieldFilter, setUniversityFilter, setAtarMin, setAtarMax, setSortBy} = useCourseFinder();
  const { add, has, remove } = useWishlist();
  const tags = useTags();
  const coursetags = tags.courseTags;
  const tableRef = useRef(null);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTop = 0;
    }
    setScroll(0);
  }, []);

  const handleScroll = () => {
      const el = tableRef.current;

      const nearBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - 50;

      if (nearBottom) {
        scrollCourses();
      }
  };

  const universityNames = useMemo(() => universities.map((u) => u.name), []);
  
  /*
  const fieldOptions = useMemo(
    () => [...Array.from(new Set(coursetags.map((d) => d.title)))],
    [],
  );
  */

  const goToCourse = (variantID: string) => {
    if(variantID){
      navigate("/course",{state: { variantID: variantID }});
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
                placeholder="Filter by course or institution"
                className="flex-1 bg-transparent text-sm text-primary-blue placeholder:text-primary-blue outline-none"
              />
            </div>

            {/* Field of Study
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
            */}      

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
                ATAR Range:{' '}
                <span className="inline-block w-[5ch] text-right tabular-nums">
                  {atarMin.toFixed(2)}
                </span>
                {' – '}
                <span className="inline-block w-[5ch] text-right tabular-nums">
                  {atarMax.toFixed(2)}
                </span>
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
            <div ref={tableRef} className="h-[632px] overflow-x-auto overflow-y-auto" onScroll={handleScroll}>
              <table className="w-full">
                <tbody className="divide-y divide-[#E9E8FC]">
                  {courses.map((course, index) => (
                    <tr
                      key={toString(course) + index}
                      className="hover:bg-gray-50 transition-colors"
                      onClick = {() => goToCourse(course.variantID)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                        
                          <div className="w-12 h-12 rounded-full bg-primary-blue flex-shrink-0" />
                          <div className="min-w-0 flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                            <div className="space-y-1">
                              <div className="font-normal text-[#27273F] text-base">
                                {course.uniName}
                              </div>
                              <div className="text-grey-400 text-base">
                                {course.campus}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="font-normal text-[#27273F] text-base">
                                {course.title}
                              </div>
                              <div className="text-grey-400 text-base">
                                {course.variantID}
                              </div>
                            </div>
                            {course.startDate &&
                            <div className="space-y-1 text-right">
                              <div className="font-normal text-[#27273F] text-base">
                                Course Starts        
                              </div>
                              <div className="text-grey-400 text-base">
                                {course.startDate}
                              </div>
                            </div>
                            }
                            {course.lastDate &&
                            <div className="space-y-1 text-right">
                              
                              <div className="font-normal text-[#27273F] text-base">
                                Final Closing
                              </div>
                              <div className="text-grey-400 text-base">
                                {course.lastDate}
                              </div>
                            </div>
                            }
                            <div className="ml-auto">
                              {has(toString(course)) ? (
                                <button
                                  onClick={(e) => {e.stopPropagation(), remove(toString(course))}}
                                  className="px-3 py-2 text-sm border border-gray-300 text-gray-400 rounded-md cursor-default hover:border-deadline-red hover:text-deadline-red"               
                                >
                                  Remove
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
