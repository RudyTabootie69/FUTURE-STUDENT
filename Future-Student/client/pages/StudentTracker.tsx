import { useState } from "react";
import Navigation from "@/components/Navigation";
import { studenttoString, Student } from "@shared/types/user";
import { useStudentTracker } from "@/context/StudentTrackerContext";

export default function StudentTracker() {
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);
  const { trackedstudents, remove } = useStudentTracker();

  return (
    <div className="min-h-screen bg-bg-soft">
      <Navigation />

      {/* Header */}
      <div className="w-full h-[140px] bg-primary-blue flex items-center justify-start px-6 lg:px-36">
        <div>
          <h1 className="text-white text-3xl font-bold mb-2">Student Tracker</h1>
          <p className="text-white text-sm">Students you are currently tracking</p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
        <div className="bg-white border border-[#E9E8FC] rounded-2xl shadow-[0_11.963px_47.851px_0_rgba(49,133,252,0.20)] overflow-hidden">
          {/* Scrollable list */}
          <div className="h-[632px] overflow-y-auto" >
            {trackedstudents.length === 0 ? (
              <div className="p-10 text-center text-grey-400">No students have been tracked yet.</div>
            ) : (
              <table className="w-full">
                <tbody className="divide-y divide-[#E9E8FC]">
                  {trackedstudents.map((student) => (
                    <tr key={studenttoString(student)} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary-blue flex-shrink-0" />
                          <div className="min-w-0 flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                            <div className="space-y-1">
                              <div className="text-[#27273F]">{student.firstName}</div>
                              <div className="text-[#27273F]">{student.lastName}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-[#27273F]">{student.schoolName}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-[#27273F]">{student.id}</div>
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
                              <button
                                  onClick={(e) => {
                                    e.stopPropagation();

                                    if (confirmRemove === studenttoString(student)) {
                                      remove(studenttoString(student));
                                      setConfirmRemove(null);
                                    } else {
                                      setConfirmRemove(studenttoString(student));
                                    }
                                  }}
                                  className={`px-3 py-2 text-sm border rounded-md ${
                                    confirmRemove === studenttoString(student)
                                      ? "text-deadline-red border-deadline-red"
                                      : "border-gray-300 text-gray-400 hover:border-deadline-red hover:text-deadline-red"
                                  }`}
                                >
                                  {confirmRemove === studenttoString(student) ? "Are you sure?" : "Stop Tracking"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
