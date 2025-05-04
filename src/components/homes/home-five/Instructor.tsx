import { Link } from "react-router-dom"
import instructor_data from "../../../data/home-data/InstructorData"

const Instructor = () => {
   return (
      <section className="instructor__area-six section-pb-110">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-5 col-lg-7">
                  <div className="section__title text-center mb-50">
                     <span className="sub-title">Our Teacher</span>
                     <h2 className="title">Meet our expert & smart Instructors</h2>
                  </div>
               </div>
            </div>
            
            <div className="row justify-content-center">
               {instructor_data.filter((items) => items.page === "home_5").map((item) => (
                  <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6">
                     <div className="instructor__item-five">
                        <div className="instructor__thumb-five">
                           <Link to="/instructor-details"><img src={item.thumb} alt="img" /></Link>
                           <div className="instructor__social-two">
                              <ul className="list-wrap">
                                 <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                                 <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                 <li><Link to="#"><i className="fab fa-whatsapp"></i></Link></li>
                                 <li><Link to="#"><i className="fab fa-instagram"></i></Link></li>
                                 <li><Link to="#"><i className="fab fa-youtube"></i></Link></li>
                              </ul>
                           </div>
                        </div>
                        <div className="instructor__content-five">
                           <h2 className="title"><Link to="/instructor-details">{item.name}</Link></h2>
                           <span>{item.tag}</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <div className="instructor__shape-two">
            <img src="/assets/img/instructor/h5_instructor_img_shape01.svg" alt="shape" className="rotateme" />
            <img src="/assets/img/instructor/h5_instructor_img_shape02.svg" alt="shape" className="alltuchtopdown" />
         </div>
      </section>
   )
}

export default Instructor
