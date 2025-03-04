import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCourses } from "../redux/features/courseSlice";

const UseCourses = () => {
   const [courses, setCourses] = useState(useSelector(selectCourses))
   return {
      courses,
      setCourses
   }
}

export default UseCourses