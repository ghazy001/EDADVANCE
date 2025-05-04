import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCourses, Course } from "../../../redux/features/courseSlice";
import InjectableSvg from "../../../hooks/InjectableSvg";
import BtnArrow from "../../../svg/BtnArrow";
import VideoPopup from "../../../modals/VideoPopup";

type RouteParams = {
  category?: string;
};

const Sidebar = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { category } = useParams<RouteParams>();
  const allCourses = useSelector(selectCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (category) {
      const course = allCourses.find((course) => course.category === category);
      setSelectedCourse(course || null);
    }
  }, [category, allCourses]);

  if (!selectedCourse) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="col-xl-3 col-lg-4">
        <div className="courses__details-sidebar">
          <div className="courses__details-video">
            <img src={selectedCourse.thumb} alt="Course Thumbnail" />
            <a
              onClick={() => setIsVideoOpen(true)}
              style={{ cursor: "pointer" }}
              className="popup-video"
            >
              <i className="fas fa-play"></i>
            </a>
          </div>

          <div className="courses__cost-wrap">
            <span>This Course Fee:</span>
            <h2 className="title">
              {selectedCourse.price}
              {/* Si tu veux montrer l'ancien prix barré, ajoute une propriété comme `old_price` */}
              {/* <del>{selectedCourse.old_price}</del> */}
            </h2>
          </div>

          <div className="courses__information-wrap">
            <h5 className="title">Course includes:</h5>
            <ul className="list-wrap">
              <li>
                <InjectableSvg
                  src="/assets/img/icons/course_icon01.svg"
                  alt="Level Icon"
                  className="injectable"
                />
                Level <span>{selectedCourse.skill_level}</span>
              </li>
              <li>
                <InjectableSvg
                  src="/assets/img/icons/course_icon02.svg"
                  alt="Duration Icon"
                  className="injectable"
                />
                Duration <span>11h 20m</span>
              </li>
              <li>
                <InjectableSvg
                  src="/assets/img/icons/course_icon03.svg"
                  alt="Lessons Icon"
                  className="injectable"
                />
                Lessons <span>12</span>
              </li>
              <li>
                <InjectableSvg
                  src="/assets/img/icons/course_icon04.svg"
                  alt="Quizzes Icon"
                  className="injectable"
                />
                Quizzes <span>145</span>
              </li>
              <li>
                <InjectableSvg
                  src="/assets/img/icons/course_icon05.svg"
                  alt="Certifications Icon"
                  className="injectable"
                />
                Certifications <span>Yes</span>
              </li>
              <li>
                <InjectableSvg
                  src="/assets/img/icons/course_icon06.svg"
                  alt="Graduation Icon"
                  className="injectable"
                />
                Graduation <span>25K</span>
              </li>
            </ul>

            <div className="courses__payment">
              <h5 className="title">Secure Payment:</h5>
              <img
                src="/assets/img/others/payment.png"
                alt="Payment Methods"
              />
            </div>

            <div className="courses__details-social">
              <h5 className="title">Share this course:</h5>
              <ul className="list-wrap">
                <li>
                  <Link to="#">
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fab fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fab fa-whatsapp"></i>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fab fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fab fa-youtube"></i>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="courses__details-enroll">
              <div className="tg-button-wrap">
                <Link to={`/courses/${category}`} className="btn btn-two arrow-btn">
                  See All Instructors <BtnArrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isVideoOpen && (
        <VideoPopup
          isVideoOpen={isVideoOpen}
          setIsVideoOpen={setIsVideoOpen}
          videoId="Ml4XCF-JS0k"
        />
      )}
    </>
  );
};

export default Sidebar;
