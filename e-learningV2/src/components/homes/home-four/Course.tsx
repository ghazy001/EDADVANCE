import { useDispatch } from "react-redux";
import { addToWishlist } from "../../../redux/features/wishlistSlice";
import { Link } from "react-router-dom";
import course_data_two from "../../../data/home-data/CourseDataTwo";
import InjectableSvg from "../../../hooks/InjectableSvg";

const Course = () => {

   const dispatch = useDispatch();
   // add to wishlist
   const handleAddToWishlist = (item: any) => {
      dispatch(addToWishlist(item));
   };

   return (
      <section className="courses-area-three section-pt-140 section-pb-110 courses__bg-two" style={{ backgroundImage: `url(/assets/img/bg/h4_courses_bg.jpg)` }}>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-5 col-lg-8">
                  <div className="section__title text-center mb-50">
                     <span className="sub-title">Top Class Courses</span>
                     <h2 className="title">My special yoga classes to improve yourself</h2>
                  </div>
               </div>
            </div>
            <div className="row gutter-24 justify-content-center">
               {course_data_two.filter((items) => items.page === "home_4").map((item) => (
                  <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
                     <div className="courses__item-five shine__animate-item">
                        <div className="courses__item-thumb-four shine__animate-link">
                           <Link to="/course-details"><img src={item.thumb} alt="img" /></Link>
                           <span className="courses__price-two">${item.price}.00</span>
                           <a onClick={() => handleAddToWishlist(item)} className="courses__wishlist-two course-heart-btn" style={{ cursor: "pointer" }}><InjectableSvg src="/assets/img/icons/heart02.svg" alt="" className="injectable" /></a>
                        </div>
                        <div className="courses__item-content-four">
                           <ul className="courses__item-meta list-wrap">
                              <li className="courses__item-tag courses__item-tag-two">
                                 <Link to="/courses">{item.tag}</Link>
                              </li>
                              <li className="avg-rating"><i className="fas fa-star"></i> {item.review}</li>
                           </ul>
                           <h2 className="title"><Link to="/course-details">{item.title}</Link></h2>
                           <div className="courses__item-bottom-three">
                              <ul className="list-wrap">
                                 <li><i className="skillgro-closed-book"></i>{item.lesson}</li>
                                 <li><i className="skillgro-group"></i>{item.student}</li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <div className="courses__shape-wrap-two">
            <img src="/assets/img/courses/h4_course_shape.svg" alt="shape" className="rotateme" />
            <img src="/assets/img/courses/h4_course_shape.svg" alt="shape" className="rotateme" />
         </div>
      </section>
   )
}

export default Course
