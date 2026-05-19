import Navigation from "@/components/Navigation";
import { useLocation, useNavigate } from "react-router-dom";
import type { Course } from "@shared/types/course";

type State = {
  course?: Course;
};

export default function CoursePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as State | null;

  const mockCourse: Course = {
    title: "Bachelor of Computer Science",
    university: "University of Wollongong",
    code: "UOW-CS-2026",
    location: "Wollongong Campus",
    field: "Software Engineering",
    startDate: "Autumn Session 2026",
    closingDate: "31 January 2026",
    atar: 75.0,
    description: "An intensive program covering software architecture, cloud networks, DevOps pipelines, and full-stack microservices design."
  };

  const course = state?.course || mockCourse;

  return (
    <div className="min-h-screen bg-bg-soft">
      <Navigation />

      <div className="w-full h-[140px] bg-primary-blue flex items-center justify-start px-6 lg:px-36">
        <div>
          <h1 className="text-white text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-white text-sm">
            {course.university}
            {course.location ? ` • ${course.location}` : ""}
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
        <div className="bg-white border border-[#E9E8FC] rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <p className="text-sm text-gray-500 mb-1">University</p>
              <p className="text-lg font-medium text-[#27273F]">
                {course.university}
              </p>
            </div>

            {course.code && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Course Code</p>
                <p className="text-lg font-medium text-[#27273F]">
                  {course.code}
                </p>
              </div>
            )}

            {course.location && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="text-lg font-medium text-[#27273F]">
                  {course.location}
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

            {course.closingDate && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Closing Date</p>
                <p className="text-lg font-medium text-[#27273F]">
                  {course.closingDate}
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
