import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LessonFaq from "./LessonFaq";
import LessonNavTav from "./LessonNavTav";
import LessonVideo from "./LessonVideo";

interface LessonAreaProps {
  courseId: string;
}

const LessonArea = ({ courseId }: LessonAreaProps) => {
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const BASE_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        console.log("Fetching lessons for course ID:", courseId); // Debug log
        setLoading(true);
        const response = await fetch(`${BASE_URL}/course/getLessons/${courseId}`);
        if (!response.ok) throw new Error(`Failed to fetch lessons: ${response.statusText}`);
        const data = await response.json();
        console.log("Lessons fetched:", data); // Debug log
        if (!data || data.length === 0) {
          throw new Error("No lessons found for this course");
        }
        setLessons(data);
        const firstUnlocked = data.find((lesson: any) => !lesson.isLocked) || data[0];
        setCurrentLesson(firstUnlocked);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching lessons:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (courseId) fetchLessons();
    else setError("No course ID provided");
  }, [courseId]);

  const handlePrev = () => {
    const currentIndex = lessons.findIndex((lesson) => lesson._id === currentLesson._id);
    if (currentIndex > 0) setCurrentLesson(lessons[currentIndex - 1]);
  };

  const handleNext = () => {
    const currentIndex = lessons.findIndex((lesson) => lesson._id === currentLesson._id);
    if (currentIndex < lessons.length - 1) setCurrentLesson(lessons[currentIndex + 1]);
  };

  const currentIndex = lessons.findIndex((lesson) => lesson._id === currentLesson?._id);

  if (loading) return <div>Loading lessons...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="lesson__area section-pb-120">
      <div className="container-fluid p-0">
        <div className="row gx-0">
          <div className="col-xl-3 col-lg-4">
            <div className="lesson__content">
              <h2 className="title">Course Content</h2>
              <LessonFaq lessons={lessons} />
            </div>
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="lesson__video-wrap">
              <div className="lesson__video-wrap-top">
                <div className="lesson__video-wrap-top-left">
                  <Link to="#"><i className="flaticon-arrow-right"></i></Link>
                  <span>{currentLesson?.title || "No Lesson Selected"}</span>
                </div>
                <div className="lesson__video-wrap-top-right">
                  <Link to="#"><i className="fas fa-times"></i></Link>
                </div>
              </div>
              <LessonVideo videoUrl={currentLesson?.videoUrl || ""} />
              <div className="lesson__next-prev-button">
                <button
                  className="prev-button"
                  title={lessons[currentIndex - 1]?.title || "Previous"}
                  onClick={handlePrev}
                  disabled={currentIndex <= 0}
                >
                  <i className="flaticon-arrow-right"></i>
                </button>
                <button
                  className="next-button"
                  title={lessons[currentIndex + 1]?.title || "Next"}
                  onClick={handleNext}
                  disabled={currentIndex >= lessons.length - 1}
                >
                  <i className="flaticon-arrow-right"></i>
                </button>
              </div>
            </div>
            <LessonNavTav />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonArea;