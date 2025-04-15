import { Link } from "react-router-dom"

const BlogAuthor = () => {
   return (
      <div className="blog__post-author">
         <div className="blog__post-author-thumb">
            <Link to="#"><img src="/assets/img/blog/author.png" alt="img" /></Link>
         </div>
         <div className="blog__post-author-content">
            <span className="designation">Author</span>
            <h5 className="name">Brooklyn Simmons</h5>
            <p>Finanappreciate your trust greatly Our clients choose dentace ducts a curae in tristique liberois ultrices diamraesent varius diam dui. Class aptent taciti sociosqu ad litora torquent per.</p>
         </div>
      </div>
   )
}

export default BlogAuthor
