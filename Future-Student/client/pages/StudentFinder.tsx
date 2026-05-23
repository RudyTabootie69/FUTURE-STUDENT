import { useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import type { Student } from "@shared/types/user";
import { toString } from "@shared/types/user";
import { useStudentTracker } from "@/context/StudentContext";
import { useNavigate } from "react-router-dom";
import {useTags} from "@/context/TagContext"

export default function StudentFinder() {
  const navigate = useNavigate();
  // Filters & sort
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<"none" | "school" | "firstname" | "lastname" >("none");

  const students = []
  const { add, has } = useStudentTracker();


  const filteredStudents = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = []

    if (q) {
      list = list.filter(
        (c) =>
          c.firstname.toLowerCase().includes(q) ||
          c.lastname.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q),
      );
    }
    
    if (sortBy === "school")
      list = [...list].sort((a, b) => a.schoolName.localeCompare(b.schoolName));
    if (sortBy === "firstname")
      list = [...list].sort((a, b) => a.firstName.localeCompare(b.firstName));
    if (sortBy === "lastname")
      list = [...list].sort((a, b) => a.lastName.localeCompare(b.lastName));
    return list;
  }, [
    students,
    search,
  ]);
  

  const goToStudent = (student: Student) => {
    if(student){
      navigate("/student",{state: { student: student }});
    }
  }

  return (
    <div className="min-h-screen bg-bg-soft">
      <Navigation />

      {/* Header */}
      <div className="w-full h-[140px] bg-primary-blue flex items-center justify-start px-6 lg:px-36">
        <div>
          <h1 className="text-white text-3xl font-bold mb-2">
            Student Tracker
          </h1>
          <p className="text-white text-sm">
            Click on a student to see their details
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8 flex gap-6">
        {/* Student Table */}
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
                <option value="school">School (A–Z)</option>
                <option value="firstname">First Name (A–Z)</option>
                <option value="lastname">Last Name (A–Z)</option>
              </select>
            </div>

            {/* Scrollable vertical list */}
            <div className="h-[632px] overflow-x-auto overflow-y-auto">
              <table className="w-full">
                <tbody className="divide-y divide-[#E9E8FC]">
                  {filteredStudents.map((student, index) => (
                    <tr
                      key={toString(student) + index}
                      className="hover:bg-gray-50 transition-colors"
                      onClick = {() => goToStudent(student)}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                        
                          <div className="w-12 h-12 rounded-full bg-primary-blue flex-shrink-0" />
                          <div className="min-w-0 flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                            <div className="space-y-1">
                              <div className="font-normal text-[#27273F] text-base">
                                {student.firstName}
                              </div>
                              <div className="text-grey-400 text-base">
                                {student.lastName}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="font-normal text-[#27273F] text-base">
                                {student.schoolName}
                              </div>
                              <div className="text-grey-400 text-base">
                                {student.id}
                              </div>
                            </div>
                            <div className="space-y-1 text-right">
                              <div className="font-normal text-[#27273F] text-base">
                                NESA Number
                              </div>
                              <div className="text-grey-400 text-base">
                                {student.nesaNumber}
                              </div>
                            </div>
                            <div className="space-y-1 text-right">
                              <div className="font-normal text-[#27273F] text-base">
                                Entry Year
                              </div>
                              <div className="text-grey-400 text-base">
                                {student.entryYear}
                              </div>
                            </div>
                            <div className="text-right">
                              {has(toString(student)) ? (
                                <button
                                  className="px-3 py-2 text-sm border border-gray-300 text-gray-400 rounded-md cursor-default"
                                  disabled
                                >
                                  Added
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => {e.stopPropagation(), add(student)}}
                                  className="px-3 py-2 text-sm border border-primary-blue text-primary-blue rounded-md hover:bg-blue-50"
                                >
                                  Track Student
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
