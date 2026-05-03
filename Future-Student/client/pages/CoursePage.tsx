import { useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Course } from "@/types/course";
import { toString } from "@/types/course";
import { useWishlist } from "@/context/WishlistContext";
import { useLocation } from "react-router-dom";

type State = {
  course: Course;
};


export default function CoursePage() {
  const location = useLocation();
  const state = location.state as State | null

  if (!state.course) {
  return <p>No course provided</p>;
  }
  
  const course: Course = state.course

  return(
    <div>
      <p>Course: {course.title}</p>
    </div>
  );
}
