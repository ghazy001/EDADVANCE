import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FooterOne from "../../../layouts/footers/FooterOne";
import HeaderOne from "../../../layouts/headers/HeaderOne";
import LessonArea from "./LessonArea";

const Lesson = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Lesson ID from params:", id); // Debug log
    if (!id) {
      setError("No course ID provided in URL");
      setLoading(false);
    } else {
      setLoading(false); // Let LessonArea handle data fetching
    }
  }, [id]);

  if (loading) return <div>Loading lessons...</div>;
  if (error) return <div>Error: {error} <br /> Please check the course ID or try again.</div>;

  return (
    <>
      <HeaderOne />
      <main className="main-area fix">
        <LessonArea courseId={id || ""} />
      </main>
      <FooterOne style={false} style_2={true} />
    </>
  );
};

export default Lesson;