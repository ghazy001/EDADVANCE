import { useEffect, useState } from "react";
import axios from "axios";
import Course from "../../data/home-data/Cours";
import "./style.css"; // Import CSS file for styling
import HeaderOne from "../../layouts/headers/HeaderOne";
import FooterOne from "../../layouts/footers/FooterOne";
import SEO from "../SEO";
import VideoPopup from "../../modals/VideoPopup"; // Import du composant VideoPopup

function CoursList() {
  const [Cours, setCours] = useState<Course[]>([]);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/cours") // Update with your backend URL
      .then((response) => {
        setCours(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const openVideoPopup = (videoUrl: string) => {
    // Extraire l'ID de la vidéo YouTube à partir de l'URL
    const match = videoUrl.match("/(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/");
    if (match && match[1]) {
      setSelectedVideoId(match[1]);
      setIsVideoOpen(true);
    } else {
      console.error("Invalid YouTube URL:", videoUrl);
    }
  };

  return (
    <>
      <HeaderOne />
      <SEO pageTitle={"EdAdvance Courses"} />
      <div className="cours-list-container">
        <h2 className="cours-list-title">Our Courses</h2>
        <ul className="cours-list">
          {Cours.map((course) => (
            <li key={course._id} className="cours-item">
              <img
                src={course.image_url}
                alt={course.title}
                className="cours-item-image"
              />
              <h3 className="cours-item-title">{course.title}</h3>
              <p className="cours-item-content">{course.content}</p>
              {course.video_url && (
                <button
                  className="cours-item-video"
                  onClick={() => openVideoPopup(course.video_url)}
                >
                  Watch Video 📺
                </button>
              )}
              {course.chapter && (
                <p className="cours-item-chapter">Chapter: {course.chapter}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
      <FooterOne style={false} style_2={false} />

      {/* Affichage du composant VideoPopup si une vidéo est sélectionnée */}
      {selectedVideoId && (
        <VideoPopup
          isVideoOpen={isVideoOpen}
          setIsVideoOpen={setIsVideoOpen}
          videoId={selectedVideoId}
        />
      )}
    </>
  );
}

export default CoursList;
