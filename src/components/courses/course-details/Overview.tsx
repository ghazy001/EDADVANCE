// Overview.tsx
import { Course } from "../../../types/course"; // Adjust path based on your structure

const Overview = ({ single_course }: { single_course: Course | null }) => {
  return (
    <div className="courses__overview-wrap">
      <h3 className="title">Course Description</h3>
      <p>{single_course?.description || "Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis."}</p>
      <h3 className="title">What you'll learn in this course?</h3>
    
    </div>
  );
};

export default Overview;