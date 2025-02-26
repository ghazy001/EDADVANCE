import { useEffect, useState } from "react";
import axios from "axios";
import Course from "../../data/home-data/Cours";
import "./style.css"; // Import CSS file for styling
import HeaderOne from "../../layouts/headers/HeaderOne"

import FooterOne from "../../layouts/footers/FooterOne"
import SEO from '../SEO';
function CoursList() {
  const [Cours, setCours] = useState<Course[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/cours") // Update with your backend URL
      .then((response) => {
        setCours(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  return (
    <> <HeaderOne />
    <SEO pageTitle={'EdAdvance Courses'} />
    <div className="cours-list-container">
      <h2 className="cours-list-title">Our Courses</h2>
      <ul className="cours-list">
        {Cours.map((course) => (
          <li key={course._id} className="cours-item">
            <img src={course.image_url} alt={course.title} className="cours-item-image" /> {/* NEW IMAGE */}
            <h3 className="cours-item-title">{course.title}</h3>
            <p className="cours-item-content">{course.content}</p>
            {course.video_url && (
              <a href={course.video_url} className="cours-item-video" target="_blank" rel="noopener noreferrer">
                Watch Video 📺
              </a>
            )}
            {course.chapter && <p className="cours-item-chapter">Chapter: {course.chapter}</p>}
          </li>
        ))}
      </ul>
    </div>
    <FooterOne style={false} style_2={false} />
    </> );
}

export default CoursList;
