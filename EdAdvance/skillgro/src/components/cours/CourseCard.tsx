// src/components/CourseCard.tsx
import React from "react";
import Course from "../../data/home-data/Cours";
import "./style.css"; // Ensure your CSS file is imported if needed

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <li className="cours-item">
      <h3 className="cours-item-title">{course.title}</h3>
      <p className="cours-item-content">{course.content}</p>
      {course.video_url && (
        <a className="cours-item-video" href={course.video_url} target="_blank" rel="noopener noreferrer">
          Watch Video
        </a>
      )}
      {course.chapter && <p className="cours-item-chapter">Chapter: {course.chapter}</p>}
    </li>
  );
};

export default CourseCard;
