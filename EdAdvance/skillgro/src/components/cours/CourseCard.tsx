import React, { useState } from "react";
import "./style.css"; // Assure-toi que le fichier CSS est bien importé
import VideoPopup from "../../modals/VideoPopup"; // Import du composant VideoPopup

// Définition de l'interface pour les props
interface CourseCardProps {
  course: {
    _id: string;
    title: string;
    content: string;
    image_url: string;
    video_url?: string; // Optionnel
    chapter?: string; // Optionnel
  };
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string>("");

  const openVideoPopup = () => {
    if (course.video_url) {
      // Vérifier si c'est une URL YouTube
      const youtubeMatch = course.video_url.match(
        /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?]+)/
      );

      if (youtubeMatch && youtubeMatch[1]) {
        setSelectedVideoId(youtubeMatch[1]);
        setIsVideoOpen(true);
      } 
      // Vérifier si c'est une vidéo locale (.mp4)
      else if (course.video_url.endsWith(".mp4")) {
        setSelectedVideoId(course.video_url);
        setIsVideoOpen(true);
      } else {
        console.error("Invalid video URL:", course.video_url);
      }
    }
  };

  return (
    <li className="cours-item">
      <img src={course.image_url} alt={course.title} className="cours-item-image" />
      <h3 className="cours-item-title">{course.title}</h3>
      <p className="cours-item-content">{course.content}</p>

      {/* Bouton pour ouvrir la vidéo en modale */}
      {course.video_url && (
        <button className="cours-item-video" onClick={openVideoPopup}>
          📺 Regarder la vidéo
        </button>
      )}

      {/* Afficher le chapitre si disponible */}
      {course.chapter && <p className="cours-item-chapter">Chapitre : {course.chapter}</p>}

      {/* Affichage du composant VideoPopup si une vidéo est sélectionnée */}
      {isVideoOpen && (
        <VideoPopup
          isVideoOpen={isVideoOpen}
          setIsVideoOpen={setIsVideoOpen}
          videoId={selectedVideoId}
        />
      )}
    </li>
  );
};

export default CourseCard;
