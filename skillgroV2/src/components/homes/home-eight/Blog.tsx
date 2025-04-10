import { Link } from "react-router-dom"
import blog_data from "../../../data/home-data/BlogData"
import BtnArrow from "../../../svg/BtnArrow"

const Blog = () => {
   return (
      <section className="blog__post-area-eight section-pt-140 section-pb-110">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6">
                  <div className="section__title text-center mb-50">
                     <span className="sub-title">News & Blogs</span>
                     <h2 className="title bold">Our Latest News Feed</h2>
                     <p>when known printer took a galley of type scrambl edmake</p>
                  </div>
               </div>
            </div>
            
            <div className="row justify-content-center">
               {blog_data.filter((items) => items.page === "home_8").map((item) => (
                  <div key={item.id} className="col-lg-4 col-md-6">
                     <div className="blog__post-item-six shine__animate-item">
                        <div className="blog__post-thumb-six">
                           <Link to="/blog-details" className="shine__animate-link"><img src={item.thumb} alt="img" /></Link>
                           <Link to="/blog" className="post-tag-four">{item.tag}</Link>
                        </div>
                        <div className="blog__post-content-six">
                           <div className="blog__post-meta">
                              <ul className="list-wrap">
                                 <li><i className="flaticon-calendar"></i>{item.date}</li>
                                 <li><i className="flaticon-user-1"></i>by <Link to="/blog-details">Admin</Link></li>
                              </ul>
                           </div>
                           <h2 className="title"><Link to="/blog-details">{item.title}</Link></h2>
                           <Link to="/blog-details" className="btn arrow-btn">Read More <BtnArrow /></Link>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <div className="blog__shape-wrap-three">
            <img src="/assets/img/blog/h8_blog_shape01.svg" alt="shape" data-aos="fade-down-left" data-aos-delay="400" />
            <img src="/assets/img/blog/h8_blog_shape02.svg" alt="shape" data-aos="fade-up-right" data-aos-delay="400" />
         </div>
      </section>
   )
}

export default Blog
