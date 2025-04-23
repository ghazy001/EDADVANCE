import { useEffect, useRef } from "react";
import Plyr from "plyr";

interface LessonVideoProps {
  videoUrl?: string;
}

const LessonVideo = ({ videoUrl }: LessonVideoProps) => {
  const playerRef = useRef<Plyr | null>(null);

  // Function to detect if the URL is a YouTube video
  const isYouTubeUrl = (url: string) => {
    return (
      url.includes("youtube.com/watch?v=") ||
      url.includes("youtu.be/")
    );
  };

  // Function to convert YouTube URL to embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = "";
    if (url.includes("youtube.com/watch?v=")) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get("v") || "";
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0` : "";
  };

  // Initialize Plyr for non-YouTube videos
  useEffect(() => {
    if (videoUrl && !isYouTubeUrl(videoUrl)) {
      playerRef.current = new Plyr("#player", {
        controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "settings", "fullscreen"],
      });

      return () => {
        playerRef.current?.destroy();
      };
    }
  }, [videoUrl]);

  // If no videoUrl, show a placeholder message
  if (!videoUrl) {
    return <div>No video available.</div>;
  }

  // Render YouTube player if it's a YouTube URL
  if (isYouTubeUrl(videoUrl)) {
    const embedUrl = getYouTubeEmbedUrl(videoUrl);
    if (!embedUrl) {
      return <div>Invalid YouTube URL.</div>;
    }

    return (
      <div className="relative w-full" style={{ paddingBottom: "56.25%" /* 16:9 Aspect Ratio */ }}>
        <iframe
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    );
  }

  // Render Plyr player for direct video files
  return (
    <video
      id="player"
      playsInline
      controls
      data-poster="/assets/img/bg/video_bg.webp"
      className="w-full"
    >
      <source src={videoUrl} type="video/mp4" />
      <source src="/path/to/video.webm" type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
};

export default LessonVideo;