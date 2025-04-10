import { useState, useEffect } from "react"; // Add useEffect
import { Link } from "react-router-dom";
import Overview from "./Overview";
import Sidebar from "./Sidebar";
import Curriculum from "./Curriculum";
import Reviews from "./Reviews";
import Instructors from "./Instructors";
import Chatbot from "../../chatbot/Chatbot";
import { Course } from "../../../types/course";
import QuizComponent from "../../Quiz/Quiz"; // Ensure this import is correct

const tab_title: string[] = ["Overview", "Curriculum", "Instructors", "Reviews"];

const CourseDetailsArea = ({ single_course }: { single_course: Course | null }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [zoomMeetingUrl, setZoomMeetingUrl] = useState<string | null>(null);
  const [isLoadingMeeting, setIsLoadingMeeting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quizId, setQuizId] = useState<string | null>(null); // Add state for quizId

  const handleTabClick = (index: number) => setActiveTab(index);
  const toggleChatbot = () => setIsChatbotOpen((prev) => !prev);
  const toggleQuiz = () => setIsQuizOpen((prev) => !prev);

  // Fetch the quiz ID for the course
  useEffect(() => {
    const fetchQuizForCourse = async () => {
      if (!single_course?._id) return;

      try {
        console.log(`Fetching quizzes for course ID: ${single_course._id}`);
        const response = await fetch(`http://localhost:3000/quizzes/byCourse/${single_course._id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Quizzes API Response:", result);

        if (result.status === "SUCCESS" && result.data.length > 0) {
          // Assuming the first quiz is the one we want (you may need to adjust this logic)
          setQuizId(result.data[0]._id);
        } else {
          setError("No quiz found for this course.");
        }
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError("Failed to load quiz for this course.");
      }
    };

    fetchQuizForCourse();
  }, [single_course?._id]);

  const launchZoomMeeting = async () => {
    setIsLoadingMeeting(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/zoom/meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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
      console.error(err);
      setError("An error occurred while creating the Zoom meeting");
    } finally {
      setIsLoadingMeeting(false);
    }
  };

  return (
    <section className="courses__details-area section-py-120">
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            {/* Image */}
            <div className="courses__details-thumb">
              <img
                src={
                  single_course?.thumb?.startsWith("http")
                    ? single_course.thumb
                    : `http://localhost:3000${single_course?.thumb || "/uploads/default.jpg"}`
                }
                alt={single_course?.title || "Course Image"}
                onError={(e) => {
                  e.currentTarget.src = "http://localhost:3000/uploads/default.jpg";
                }}
                style={{ width: "100%", maxWidth: "900px", height: "auto" }}
              />
            </div>

            {/* Meta */}
            <div className="courses__details-content">
              <ul className="courses__item-meta list-wrap">
                <li className="courses__item-tag">
                  <Link to="/courses">{single_course?.category || "Development"}</Link>
                </li>
                <li className="avg-rating">
                  <i className="fas fa-star"></i> ({single_course?.rating || "0"} Reviews)
                </li>
              </ul>

              {/* Title & Chatbot */}
              <h2 className="title">
                {single_course?.title || "Resolving Conflicts Between Designers And Engineers"}
                <button className="chatbot-trigger-btn" onClick={toggleChatbot}>
                  <i className="fas fa-comment-alt"></i>
                  <span>Chat Now</span>
                </button>
              </h2>

              {/* Author & date */}
              <div className="courses__details-meta">
                <ul className="list-wrap">
                  <li className="author-two">
                    <img src="/assets/img/courses/course_author001.png" alt="Author" />
                    By <Link to="#">{single_course?.instructors || "David Millar"}</Link>
                  </li>
                  <li className="date">
                    <i className="flaticon-calendar"></i>
                    {single_course?.createdAt
                      ? new Date(single_course.createdAt).toLocaleDateString()
                      : "24/07/2024"}
                  </li>
                  <li>
                    <i className="flaticon-mortarboard"></i>2,250 Students
                  </li>
                </ul>
              </div>

              {/* Zoom button */}
              <div className="zoom-meeting-button" style={{ marginBottom: "20px" }}>
                <button
                  className="btn btn-primary"
                  onClick={launchZoomMeeting}
                  disabled={isLoadingMeeting}
                >
                  {isLoadingMeeting ? "Creating Meeting..." : "Launch Zoom Meeting"}
                </button>
                {error && (
                  <p className="text-danger" style={{ marginTop: "10px" }}>
                    {error}
                  </p>
                )}
                {zoomMeetingUrl && !error && (
                  <p className="text-success" style={{ marginTop: "10px" }}>
                    Meeting created!{" "}
                    <a href={zoomMeetingUrl} target="_blank" rel="noopener noreferrer">
                      Join here
                    </a>
                  </p>
                )}
              </div>

              {/* Quiz button */}
              {single_course?._id && (
                <div style={{ margin: "20px 0" }}>
                  <button className="btn btn-success" onClick={toggleQuiz}>
                    {isQuizOpen ? "Close Quiz" : "Start Quiz"}
                  </button>
                </div>
              )}

              {/* Quiz component */}
              {isQuizOpen && quizId && (
                <div className="quiz-section" style={{ marginBottom: "30px" }}>
                  <QuizComponent quizId={quizId} />
                </div>
              )}

              {/* Display error if no quiz is found */}
              {isQuizOpen && !quizId && error && (
                <div className="alert alert-danger mt-3">{error}</div>
              )}

              {/* Tabs */}
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                {single_course?._id && (
                  <li className="nav-item" role="presentation">
                    <Link
                      to={`/lesson/${single_course._id}`}
                      className={`nav-link ${activeTab === -1 ? "active" : ""}`}
                      onClick={() =>
                        console.log("Navigating to lesson with ID:", single_course._id)
                      }
                    >
                      Start Lessons Now
                    </Link>
                  </li>
                )}
                {tab_title.map((tab, index) => (
                  <li
                    key={index}
                    className="nav-item"
                    role="presentation"
                    onClick={() => handleTabClick(index)}
                  >
                    <button
                      className={`nav-link ${activeTab === index ? "active" : ""}`}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="tab-content" id="myTabContent">
                <div
                  className={`tab-pane fade ${activeTab === 0 ? "show active" : ""}`}
                  id="overview-tab-pane"
                >
                  <Overview single_course={single_course} />
                </div>
                <div
                  className={`tab-pane fade ${activeTab === 1 ? "show active" : ""}`}
                  id="curriculum-tab-pane"
                >
                  <Curriculum single_course={single_course} />
                </div>
                <div
                  className={`tab-pane fade ${activeTab === 2 ? "show active" : ""}`}
                  id="instructors-tab-pane"
                >
                  <Instructors single_course={single_course} />
                </div>
                <div
                  className={`tab-pane fade ${activeTab === 3 ? "show active" : ""}`}
                  id="reviews-tab-pane"
                >
                  <Reviews singlecourse={single_course} />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <Sidebar singlecourse={single_course} />
        </div>
      </div>

      {/* Chatbot panel */}
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