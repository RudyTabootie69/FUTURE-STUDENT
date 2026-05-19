import { useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Course } from "@shared/types/course";
import { toString } from "@shared/types/course";
import { useWishlist } from "@/context/WishlistContext";
import { useLocation, useNavigate } from "react-router-dom";

type State = {
  course: Course;
};


export default function CoursePage() {
  const location = useLocation();
  const state = location.state as State | null
  const navigate = useNavigate();
  const testing = true;
  let course: Course;

  if(testing){
    course = Course.default
  }else{  
    if (!state.course) {
      navigate("*");
    }
    
    course = state.course
  }

  return(
    <div>
      <p>Course: {course.title}</p>
    </div>
  );
}
