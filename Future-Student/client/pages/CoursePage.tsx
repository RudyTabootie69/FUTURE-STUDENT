import Navigation from "@/components/Navigation";
import { Course } from "@shared/types/course";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type State = {
  variantID: string;
};

export default function CoursePage() {
  const [course, setCourse] = useState<Course>(Course.default);
  const navigate = useNavigate();
  const location = useLocation();
  
  const state = location.state as State | null;
  const testing = false;
  useEffect(() => {
      if (!state.variantID) {
        navigate("/course-finder");
      }
      try{
        const fetchCourse = async () => {
          const response = await fetch("/backend/course/id", {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: 
                JSON.stringify({"variantID": state.variantID}), 
            });
            const res = await response.json();
            if (!res.data) {
              throw new Error("Failed to fetch results");
            }

            const data = res.data;
            console.log(data);
            setCourse(data)
        }
        fetchCourse()
      } catch (err) {
        console.log(err.message);
        navigate("/course-finder")
      }
    
  }, []);
  
  

  return (
    <div className="min-h-screen bg-bg-soft">
      <Navigation />

      <div className="w-full h-[140px] bg-primary-blue flex items-center justify-start px-6 lg:px-36">
        <div>
          <h1 className="text-white text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-white text-sm">
            {course.uniName}
            {course.campus ? ` • ${course.campus}` : ""}
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
        <div className="bg-white border border-[#E9E8FC] rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <p className="text-sm text-gray-500 mb-1">University</p>
              <p className="text-lg font-medium text-[#27273F]">
                {course.uniName}
              </p>
            </div>

            {course.courseID && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Course Code</p>
                <p className="text-lg font-medium text-[#27273F]">
                  {course.courseID}
                </p>
              </div>
            )}

            {course.campus && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="text-lg font-medium text-[#27273F]">
                  {course.campus}
                </p>
              </div>
            )}

            {course.field && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Field</p>
                <p className="text-lg font-medium text-[#27273F]">
                  {course.field}
                </p>
              </div>
            )}

            {course.startDate && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Start Date</p>
                <p className="text-lg font-medium text-[#27273F]">
                  {course.startDate}
                </p>
              </div>
            )}

            {course.lastDate && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Closing Date</p>
                <p className="text-lg font-medium text-[#27273F]">
                  {course.lastDate}
                </p>
              </div>
            )}

            {course.atar !== undefined && course.atar !== null && (
              <div>
                <p className="text-sm text-gray-500 mb-1">ATAR</p>
                <p className="text-lg font-medium text-[#27273F]">
                  {course.atar}
                </p>
              </div>
            )}
          </div>

          {course.description && (
            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-2">Description</p>
              <p className="text-[#27273F] leading-7">{course.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
