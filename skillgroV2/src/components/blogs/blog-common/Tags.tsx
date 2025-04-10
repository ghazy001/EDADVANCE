import { Link } from "react-router-dom";

const tags: string[] = ["Education", "Training", "Online", "Learn", "Course", "LMS"];

const Tags = () => {
   return (
      <div className="blog-widget">
         <h4 className="widget-title">Tags</h4>
         <div className="tagcloud">
            {tags.map((tag, i) => (
               <Link key={i} to="#">{tag}</Link>
            ))}
         </div>
      </div>
   )
}

export default Tags
