import ModalVideo from "react-modal-video";
import { Dispatch, SetStateAction } from "react";

interface VideoPopupProps {
  isVideoOpen: boolean;
  setIsVideoOpen: Dispatch<SetStateAction<boolean>>;
  videoId?: string;
}

const VideoPopup: React.FC<VideoPopupProps> = ({
  isVideoOpen,
  setIsVideoOpen,
  videoId = "bgMEvrd2E",
}) => {
  return (
    <ModalVideo
      channel="youtube"
      isOpen={isVideoOpen}
      videoId={videoId}
      onClose={() => setIsVideoOpen(false)}
    />
  );
};

export default VideoPopup;
