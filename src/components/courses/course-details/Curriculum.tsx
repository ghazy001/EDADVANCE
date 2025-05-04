import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

import { Course } from "../../../types/course";
import VideoPopup from "../../../modals/VideoPopup"; // Import VideoPopup

interface CurriculumProps {
  single_course: Course | null;
}
const extractYouTubeId = (url: string) => {
  if (!url) return "";

  const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
  const match = url.match(regex);
  return match ? match[1] : url; // Si l'ID est déjà propre, le retourner tel quel
};


const Curriculum = ({ single_course }: CurriculumProps) => {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false); // State to control the video popup visibility
  const BASE_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchLessons = async () => {
      if (!single_course?._id) {
        setError("Invalid course ID");
        return;
      }
  
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/course/getLessons/${single_course._id}`);
        if (!response.ok) throw new Error("Failed to fetch lessons");
        const data = await response.json();
        setLessons(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (single_course?._id) fetchLessons();
  }, [single_course]);
  

  const handleLessonClick = (lesson: any) => {
    if (lesson.isLocked) {
      alert("This lesson is locked. Please unlock it to watch.");
      return;
    }
    setSelectedLesson(lesson);
    setIsVideoOpen(true); // Open the video popup when a lesson is selected
  };

  if (loading) return <div>Loading curriculum...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="courses__curriculum-wrap">
      <h3 className="title">Course Curriculum</h3>
      {lessons.length === 0 ? (
        <p>No lessons available for this course.</p>
      ) : (
        <>
          <ul className="list-wrap">
            {lessons.map((lesson) => (
              <li
                key={lesson._id}
                className={`course-item ${selectedLesson?._id === lesson._id ? "bg-gray-100" : ""}`}
                onClick={() => handleLessonClick(lesson)}
                style={{ cursor: "pointer" }}
              >
                <div className="course-item-link">
                  <span className="item-name">{lesson.title}</span>
                  <div className="course-item-meta">
                    <span className="item-meta duration">{lesson.duration}</span>
                    {lesson.isLocked && (
                      <span className="item-meta course-item-status">
                        <img src="/assets/img/icons/lock.svg" alt="icon" />
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Video Popup */}
      {selectedLesson && (
        <VideoPopup
          isVideoOpen={isVideoOpen}
          setIsVideoOpen={setIsVideoOpen}
          videoId={extractYouTubeId(selectedLesson.videoUrl)} // Extraction correcte de l'ID

        />
       

      )}

      <div className="mt-4">
        <Link
          to={`/lesson/${single_course?.id}`} 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Full Lessons
        </Link>
      </div>
    </div>
  );
};

export default Curriculum;
