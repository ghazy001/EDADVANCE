import { useState } from "react";
import { Link } from "react-router-dom";
import Overview from "./Overview";
import Sidebar from "./Sidebar";
import Curriculum from "./Curriculum";
import Reviews from "./Reviews";
import Instructors from "./Instructors";
import Chatbot from "../../../components/Chatbot";
import { Course } from "../../../types/course";

const tab_title: string[] = ["Overview", "Curriculum", "Instructors", "Reviews"];

const CourseDetailsArea = ({ single_course }: { single_course: Course | null }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [zoomMeetingUrl, setZoomMeetingUrl] = useState<string | null>(null);
  const [isLoadingMeeting, setIsLoadingMeeting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTabClick = (index: number) => setActiveTab(index);
  const toggleChatbot = () => setIsChatbotOpen((prev) => !prev);

  const launchZoomMeeting = async () => {
    setIsLoadingMeeting(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/zoom/meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include session cookies for authentication
        body: JSON.stringify({ courseId: single_course?._id }),
      });

      const data = await response.json();
      if (response.ok) {
        setZoomMeetingUrl(data.join_url);
        window.open(data.join_url, "_blank");
      } else {
        setError(data.message || "Failed to create Zoom meeting");
      }
    } catch (err) {
      setError("An error occurred while creating the Zoom meeting");
      console.error(err);
    } finally {
      setIsLoadingMeeting(false);
    }
  };

  return (
    <section className="courses__details-area section-py-120">
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            {/* Thumbnail dynamique */}
           
          {/* Thumbnail agrandie avec styles inline */}
          <div
  className="courses__details-thumb"
  style={{
    width: "100%",
    maxHeight: "500px",
    overflow: "hidden",
    borderRadius: "10px",
  }}
>
  <img
    src={single_course?.thumb?.startsWith("http") ? single_course.thumb : `http://localhost:3000${single_course?.thumb || "/uploads/default.jpg"}`}
    alt={single_course?.title || "Course Image"}
    onError={(e) => (e.currentTarget.src = "http://localhost:3000/uploads/default.jpg")}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }}
  />
</div>


            <div className="courses__details-content">
              {/* Métadonnées du cours */}
              <ul className="courses__item-meta list-wrap">
                <li className="courses__item-tag">
                  <Link to="/courses">{single_course?.category || "General"}</Link>
                </li>
                <li className="avg-rating">
                  <i className="fas fa-star"></i> ({single_course?.rating || "0"} Reviews)
                </li>
              </ul>

              {/* Titre et chatbot */}
              <h2 className="title">
                {single_course?.title || "Course Title"}
                <button className="chatbot-trigger-btn" onClick={toggleChatbot}>
                  <i className="fas fa-comment-alt"></i>
                  <span>Chat Now</span>
                </button>
              </h2>

              {/* Infos supplémentaires */}
              <div className="courses__details-meta">
                <ul className="list-wrap">
                  <li className="author-two">
                    <img src={single_course?.instructorImage || "/assets/img/courses/course_author001.png"} alt="Instructor" />
                    By <Link to="#">{single_course?.instructors || "Unknown Instructor"}</Link>
                  </li>
                  <li className="date">
                    <i className="flaticon-calendar"></i>
                    {single_course?.createdAt ? new Date(single_course.createdAt).toLocaleDateString() : "Date not available"}
                  </li>
                  <li>
                    <i className="flaticon-mortarboard"></i>
                    {single_course?.studentsCount ? `${single_course.studentsCount} Students` : "No students yet"}
                  </li>
                </ul>
              </div>

              {/* Zoom Meeting Button */}
              <div className="zoom-meeting-button" style={{ marginBottom: "20px" }}>
                <button className="btn btn-primary" onClick={launchZoomMeeting} disabled={isLoadingMeeting}>
                  {isLoadingMeeting ? "Creating Meeting..." : "Launch Zoom Meeting"}
                </button>
                {error && <p className="text-danger" style={{ marginTop: "10px" }}>{error}</p>}
                {zoomMeetingUrl && !error && (
                  <p className="text-success" style={{ marginTop: "10px" }}>
                    Meeting created! <a href={zoomMeetingUrl} target="_blank" rel="noopener noreferrer">Join here</a>
                  </p>
                )}
              </div>

              {/* Tabs dynamiques */}
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                {single_course?._id && (
                  <li className="nav-item" role="presentation">
                    <Link to={`/lesson/${single_course._id}`} className={`nav-link ${activeTab === -1 ? "active" : ""}`}>
                      Start Lessons Now
                    </Link>
                  </li>
                )}
                {tab_title.map((tab, index) => (
                  <li key={index} className="nav-item" role="presentation">
                    <button onClick={() => handleTabClick(index)} className={`nav-link ${activeTab === index ? "active" : ""}`}>
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Contenu des Tabs */}
              <div className="tab-content" id="myTabContent">
                <div className={`tab-pane fade ${activeTab === 0 ? "show active" : ""}`} id="overview-tab-pane">
                  <Overview single_course={single_course} />
                </div>
                <div className={`tab-pane fade ${activeTab === 1 ? "show active" : ""}`} id="curriculum-tab-pane">
                  <Curriculum single_course={single_course} />
                </div>
                <div className={`tab-pane fade ${activeTab === 2 ? "show active" : ""}`} id="instructors-tab-pane">
                  <Instructors single_course={single_course} />
                </div>
                <div className={`tab-pane fade ${activeTab === 3 ? "show active" : ""}`} id="reviews-tab-pane">
                  <Reviews singlecourse={single_course} />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar dynamique */}
          <Sidebar singlecourse={single_course} />
        </div>
      </div>

      {/* Chatbot */}
      {isChatbotOpen && (
        <>
          <div className="chatbot-overlay" onClick={toggleChatbot}></div>
          <div className="chatbot-panel">
            <div className="chatbot-panel-header">
              <h3>Course Assistant</h3>
              <button className="chatbot-close-btn" onClick={toggleChatbot}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <Chatbot />
          </div>
        </>
      )}
    </section>
  );
};

export default CourseDetailsArea;
