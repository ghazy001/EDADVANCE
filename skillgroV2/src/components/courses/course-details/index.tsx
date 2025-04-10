import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FooterOne from "../../../layouts/footers/FooterOne";
import HeaderOne from "../../../layouts/headers/HeaderOne";
import BreadcrumbTwo from "../../common/breadcrumb/BreadcrumbTwo";
import CourseDetailsArea from "./CourseDetailsArea";

const BASE_URL = "http://localhost:3000";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [singleCourse, setSingleCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log("Fetching course with ID:", id); // Debug log
        const response = await fetch(`${BASE_URL}/course/getCourse/${id}`);
        if (!response.ok) throw new Error("Course not found");
        const data = await response.json();
        console.log("Course data fetched:", data); // Debug log
        setSingleCourse(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    if (id) fetchCourse();
    else setError("No course ID provided in URL");
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <HeaderOne />
      <main className="main-area fix">
        <BreadcrumbTwo
          title={singleCourse?.title || "Course Details"}
          sub_title="Courses"
        />
        <CourseDetailsArea single_course={singleCourse} />
      </main>
      <FooterOne style={false} style_2={true} />
    </>
  );
};

export default CourseDetails;