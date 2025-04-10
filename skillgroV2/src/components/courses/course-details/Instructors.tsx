// Instructors.tsx
import { Link } from "react-router-dom";
import { Course } from "../../../types/course";

const Instructors = ({ single_course }: { single_course: Course | null }) => {
  return (
    <div className="courses__instructors-wrap">
      <div className="courses__instructors-thumb">
        <img src="/assets/img/courses/course_instructors.png" alt="img" />
      </div>
      <div className="courses__instructors-content">
        <h2 className="title">{single_course?.instructors || "Mark Jukarberg"}</h2>
        <span className="designation">UX Design Lead</span>
        <p className="avg-rating">
          <i className="fas fa-star"></i> ({single_course?.rating || "4.8"} Ratings)
        </p>
        <p>{single_course?.description || "Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan."}</p>
        <div className="instructor__social">
          <ul className="list-wrap justify-content-start">
            <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
            <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
            <li><Link to="#"><i className="fab fa-whatsapp"></i></Link></li>
            <li><Link to="#"><i className="fab fa-instagram"></i></Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Instructors;