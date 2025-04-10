import { useState } from "react";
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import { addToWishlist } from "../../../redux/features/wishlistSlice";
import course_data from "../../../data/home-data/CourseData";
import InjectableSvg from "../../../hooks/InjectableSvg";
import BtnArrow from "../../../svg/BtnArrow";

const tab_title: string[] = ["All", "Chinese", "Dessert", "Italian", "Italian"];

const Course = () => {

   const [activeTab, setActiveTab] = useState(0);

   const handleTabClick = (index: number) => {
      setActiveTab(index);
   };

   const dispatch = useDispatch();
   // add to wishlist
   const handleAddToWishlist = (item: any) => {
      dispatch(addToWishlist(item));
   };

   return (
      <section className="courses-area-seven section-py-140">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6">
                  <div className="section__title text-center mb-30">
                     <span className="sub-title">10,000+ unique online courses</span>
                     <h2 className="title bold">Most Popular Courses</h2>
                  </div>
                  <div className="courses__nav-two mb-50">
                     <ul className="nav nav-tabs" id="courseTab" role="tablist">
                        {tab_title.map((tab, index) => (
                           <li key={index} onClick={() => handleTabClick(index)} className="nav-item" role="presentation">
                              <button className={`nav-link ${activeTab === index ? "active" : ""}`}>{tab}</button>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>

            <div className="tab-content" id="myTabContent">
               {course_data.filter((items) => items.page === "home_8").map((course_item, index) => (
                  <div key={course_item.id} className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`} id="all-tab-pane" role="tabpanel" aria-labelledby="all-tab">
                     <div className="row justify-content-center">
                        {course_item.course_details.map((item) => (
                           <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
                              <div className="courses__item-nine shine__animate-item">
                                 <div className="courses__item-thumb-eight shine__animate-link">
                                    <Link to="/course-details"><img src={item.thumb} alt="img" /></Link>
                                    <a onClick={() => handleAddToWishlist(item)} className="courses__wishlist"><InjectableSvg src="/assets/img/icons/heart02.svg" alt="" className="injectable" /></a>
                                    <Link to="/courses" className="courses__item-tag-three">{item.tag}</Link>
                                 </div>
                                 <div className="courses__item-content-eight">
                                    <div className="courses__review">
                                       <div className="rating">
                                          <i className="fas fa-star"></i>
                                          <i className="fas fa-star"></i>
                                          <i className="fas fa-star"></i>
                                          <i className="fas fa-star"></i>
                                          <i className="fas fa-star"></i>
                                       </div>
                                       <span>{item.review}</span>
                                    </div>
                                    <h2 className="title"><Link to="/course-details">{item.title}</Link></h2>
                                    <h2 className="price">${item.price}.00</h2>
                                 </div>
                                 <div className="courses__item-bottom-three courses__item-bottom-six">
                                    <ul className="list-wrap">
                                       <li><i className="flaticon-book"></i>Lessons {item.lesson}</li>
                                       <li><i className="flaticon-clock"></i>{item.minute} mins</li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
            <div className="discover-courses-btn-two text-center mt-30">
               <Link to="/courses" className="btn arrow-btn btn-four">Discover All Class <BtnArrow /></Link>
            </div>
         </div>
         <div className="courses__shape-wrap-four">
            <img src="/assets/img/courses/h8_course_shape01.svg" alt="shape" className="alltuchtopdown" />
            <img src="/assets/img/courses/h8_course_shape02.svg" alt="shape" className="rotateme" />
         </div>
      </section>
   )
}

export default Course
