import { Link } from "react-router-dom"
import blog_data from "../../../data/home-data/BlogData"

const Blog = () => {
   return (
      <section className="blog__post-area-six section-pt-140 section-pb-110">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6">
                  <div className="section__title text-center mb-50">
                     <span className="sub-title">News & Blogs</span>
                     <h2 className="title">Our Latest News Feed</h2>
                     <p>when known printer took a galley of type scrambl edmake</p>
                  </div>
               </div>
            </div>
            
            <div className="row justify-content-center">
               {blog_data.filter((items) => items.page === "home_6").map((item) => (
                  <div key={item.id} className="col-lg-4 col-md-6">
                     <div className="blog__post-item-four shine__animate-item">
                        <div className="blog__post-thumb-four">
                           <Link to="/blog-details" className="shine__animate-link"><img src={item.thumb} alt="img" /></Link>
                        </div>
                        <div className="blog__post-content-four">
                           <Link to="/blog" className="post-tag-three">{item.tag}</Link>
                           <h2 className="title"><Link to="/blog-details">{item.title}</Link></h2>
                           <div className="blog__post-meta">
                              <ul className="list-wrap">
                                 <li><i className="flaticon-user-1"></i>by <Link to="/blog-details">Admin</Link></li>
                                 <li><i className="flaticon-calendar"></i>{item.date}</li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Blog
