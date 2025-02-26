interface Course {
  _id: string;
  title: string;
  content: string;
  video_url?: string;
  image_url: string; // Add this field
  chapter?: string; // Adjust type based on your data
}

export default Course;
