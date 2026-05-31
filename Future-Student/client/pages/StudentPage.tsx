import Navigation from "@/components/Navigation";
import { Student } from "@shared/types/user";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type State = {
  studentID: string;
};

export default function StudentPage() {
  const [student, setStudent] = useState<Student>(Student.default);
  const navigate = useNavigate();
  const location = useLocation();
  
  const state = location.state as State | null;
  const testing = false;
  useEffect(() => {
      if (!state.studentID) {
        navigate("/student-finder");
      }
      try{
        const fetchCourse = async () => {
          const response = await fetch("/backend/student/id", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: 
                JSON.stringify({"studentID": state.studentID}), 
            });
            const res = await response.json();
            if (!res.data) {
              throw new Error("Failed to fetch results");
            }

            const data = res.data;
            console.log(data);
            setStudent(data)
        }
        fetchCourse()
      } catch (err) {
        console.log(err.message);
        navigate("/student-finder")
      }
    
  }, []);

  return (
    <div className="min-h-screen bg-bg-soft">
      <Navigation />

      <div className="w-full h-[140px] bg-primary-blue flex items-center justify-start px-6 lg:px-36">
        <div>
          <h1 className="text-white text-3xl font-bold mb-2">{student.firstName + " " + student.lastName}</h1>
          <p className="text-white text-sm">
            {student.schoolName}
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
        <div className="bg-white border border-[#E9E8FC] rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(student.email || student.phone) &&
            <div>
              <p className="text-sm text-gray-500 mb-1">Contact Details</p>
              <p className="text-lg font-medium text-[#27273F]">
                {student.email}
                {student.phone ? ` • ${student.phone}` : ""}
              </p>
            </div>
            }
            {student.id && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Future Student ID</p>
                <p className="text-lg font-medium text-[#27273F]">
                  {student.id}
                </p>
              </div>
            )}
            {student.uacId && (
              <div>
                <p className="text-sm text-gray-500 mb-1">UAC ID</p>
                <p className="text-lg font-medium text-[#27273F]">
                  {student.uacId}
                </p>
              </div>
            )}
            {student.usi && (
              <div>
                <p className="text-sm text-gray-500 mb-1">USI</p>
                <p className="text-lg font-medium text-[#27273F]">
                  {student.usi}
                </p>
              </div>
            )}
            {student.id && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Student ID</p>
                <p className="text-lg font-medium text-[#27273F]">
                  {student.id}
                </p>
              </div>
            )}

            {student.dob && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                <p className="text-lg font-medium text-[#27273F]">
                  {student.dob}
                </p>
              </div>
            )}

            {student.address && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Address</p>
                <p className="text-lg font-medium text-[#27273F]">
                  {student.address}
                </p>
              </div>
            )}

            {student.entryYear && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Expected Entry Year</p>
                <p className="text-lg font-medium text-[#27273F]">
                  {student.entryYear}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
