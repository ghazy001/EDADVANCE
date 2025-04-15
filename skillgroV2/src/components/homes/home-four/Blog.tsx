import { Link } from "react-router-dom"
import blog_data from "../../../data/home-data/BlogData"

const Blog = () => {
   return (
      <section className="blog__post-area-four section-pt-140 section-pb-110">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6">
                  <div className="section__title text-center mb-40">
                     <span className="sub-title">News & Blogs</span>
                     <h2 className="title">Our Latest News Feed</h2>
                     <p>when known printer took a galley of type scrambl edmake</p>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-lg-6">
                  {blog_data.filter((items) => items.page === "home_4").slice(0, 1).map((item) => (
                     <div key={item.id} className="blog__post-item-two">
                        <div className="blog__post-thumb-two">
                           <Link to="/blog-details"><img src={item.thumb} alt="img" /></Link>
                        </div>
                        <div className="blog__post-content-two">
                           <Link to="/blog" className="post-tag-two">{item.tag}</Link>
                           <div className="blog__post-meta blog__post-meta-two">
                              <ul className="list-wrap">
                                 <li><i className="flaticon-calendar"></i>{item.date}</li>
                                 <li><i className="flaticon-user-1"></i>by <Link to="/blog-details">Admin</Link></li>
                              </ul>
                           </div>
                           <h2 className="title"><Link to="/blog-details">{item.title}</Link></h2>
                        </div>
                     </div>
                  ))}
               </div>
               <div className="col-lg-6">
                  {blog_data.filter((items) => items.page === "home_4").slice(1, 3).map((item) => (
                     <div key={item.id} className="blog__post-item-three shine__animate-item">
                        <div className="blog__post-thumb-three">
                           <Link to="/blog-details" className="shine__animate-link"><img src={item.thumb} alt="img" /></Link>
                        </div>
                        <div className="blog__post-content-three">
                           <Link to="/blog" className="post-tag-two">{item.tag}</Link>
                           <div className="blog__post-meta">
                              <ul className="list-wrap">
                                 <li><i className="flaticon-calendar"></i>{item.date}</li>
                                 <li><i className="flaticon-user-1"></i>by <Link to="/blog-details">Admin</Link></li>
                              </ul>
                           </div>
                           <h2 className="title"><Link to="/blog-details">{item.title}</Link></h2>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
         <div className="blog__shape-wrap">
            <img src="/assets/img/blog/h4_blog_shape.svg" alt="shape" className="rotateme" />
            <img src="/assets/img/blog/h4_blog_shape.svg" alt="shape" className="rotateme" />
         </div>
      </section>
   )
}

export default Blog
