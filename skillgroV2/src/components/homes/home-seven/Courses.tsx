import { useDispatch } from "react-redux"
import { addToWishlist } from "../../../redux/features/wishlistSlice";
import { Link } from "react-router-dom";
import course_data_two from "../../../data/home-data/CourseDataTwo";
import InjectableSvg from "../../../hooks/InjectableSvg";
import BtnArrow from "../../../svg/BtnArrow";

const Courses = () => {

   const dispatch = useDispatch();
   // add to wishlist
   const handleAddToWishlist = (item: any) => {
      dispatch(addToWishlist(item));
   };

   return (
      <section className="courses-area-six grey-bg-two">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6">
                  <div className="section__title text-center mb-50">
                     <span className="sub-title">10,000+ unique online courses</span>
                     <h2 className="title bold">Our Most Popular Courses</h2>
                  </div>
               </div>
            </div>
            <div className="row justify-content-center">
               {course_data_two.filter((items) => items.page === "home_7").map((item) => (
                  <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
                     <div className="courses__item-eight shine__animate-item">
                        <div className="courses__item-thumb-seven shine__animate-link">
                           <Link to="/course-details"><img src={item.thumb} alt="img" /></Link>
                           <Link to="/courses" className="courses__item-tag-three">{item.tag}</Link>
                        </div>
                        <div className="courses__item-content-seven">
                           <ul className="courses__item-meta list-wrap">
                              <li className="price">
                                 ${item.price}.00
                              </li>
                              <li className="courses__wishlist">
                                 <a onClick={() => handleAddToWishlist(item)}><InjectableSvg src="/assets/img/icons/heart02.svg" alt="" className="injectable" /></a>
                              </li>
                           </ul>
                           <h2 className="title"><Link to="/course-details">It Statistics Data Science And Business Analysis</Link></h2>
                           <div className="courses__review">
                              <div className="rating">
                                 <i className="fas fa-star"></i>
                                 <i className="fas fa-star"></i>
                                 <i className="fas fa-star"></i>
                                 <i className="fas fa-star"></i>
                                 <i className="fas fa-star"></i>
                              </div>
                              <span>(4.8 Reviews)</span>
                           </div>
                        </div>
                        <div className="courses__item-bottom-three courses__item-bottom-five">
                           <ul className="list-wrap">
                              <li><i className="flaticon-book"></i>Lessons {item.lesson}</li>
                              <li><i className="skillgro-group"></i>Students {item.student}</li>
                           </ul>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            <div className="discover-courses-btn text-center mt-30">
               <Link to="/courses" className="btn arrow-btn btn-four">Discover All Class <BtnArrow /></Link>
            </div>
         </div>
      </section>
   )
}

export default Courses
