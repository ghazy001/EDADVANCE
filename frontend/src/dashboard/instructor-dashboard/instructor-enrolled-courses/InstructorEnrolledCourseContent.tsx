"use client"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import enroll_course_data from "../../../data/dashboard-data/InstructorEnrollCourseData";

const enrolled_courses: string[] = ["Enrolled Courses", "Active Courses", "Completed Courses",];
const my_courses: string[] = ["Publish", "Pendig", "Draft",];

const setting = {
   slidesPerView: 3,
   spaceBetween: 30,
   observer: true,
   observeParents: true,
   loop: true,
   breakpoints: {
      '1500': {
         slidesPerView: 3,
      },
      '1200': {
         slidesPerView: 3,
      },
      '992': {
         slidesPerView: 2,
         spaceBetween: 24,
      },
      '768': {
         slidesPerView: 2,
         spaceBetween: 24,
      },
      '576': {
         slidesPerView: 1.5,
      },
      '0': {
         slidesPerView: 1,
      },
   },
}

const InstructorEnrolledCourseContent = ({ style }: any) => {

   const [activeTab, setActiveTab] = useState(0);

   const handleTabClick = (index: any) => {
      setActiveTab(index);
   };

   const [isLoop, setIsLoop] = useState(false);
   useEffect(() => {
      setIsLoop(true);
   }, []);

   const tab_title = style ? my_courses : enrolled_courses;

   return (
      <div className="col-lg-9">
         <div className="dashboard__content-wrap dashboard__content-wrap-two">
            <div className="dashboard__content-title">
               <h4 className="title">{style ? "My Courses" : "Enrolled Courses"}</h4>
            </div>
            <div className="row">
               <div className="col-12">
                  <div className="dashboard__nav-wrap mb-40">
                     <ul className="nav nav-tabs" id="courseTab" role="tablist">
                        {tab_title.map((tab, index) => (
                           <li key={index} onClick={() => handleTabClick(index)} className="nav-item" role="presentation">
                              <button className={`nav-link ${activeTab === index ? "active" : ""}`}>{tab}</button>
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="tab-content" id="courseTabContent">
                     {enroll_course_data.map((course, index) => (
                        <div key={course.id} className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`} id="design-tab-pane" role="tabpanel" aria-labelledby="design-tab" >
                           <Swiper
                              {...setting}
                              modules={[Navigation]}
                              loop={isLoop} className="swiper dashboard-courses-active">
                              {course.course_details.map((item) => (
                                 <SwiperSlide key={item.id} className="swiper-slide">
                                    <div className="courses__item courses__item-two shine__animate-item">
                                       <div className="courses__item-thumb courses__item-thumb-two">
                                          <Link to="/course-details" className="shine__animate-link">
                                             <img src={item.thumb} alt="img" />
                                          </Link>
                                       </div>
                                       <div className="courses__item-content courses__item-content-two">
                                          <ul className="courses__item-meta list-wrap">
                                             <li className="courses__item-tag">
                                                <Link to="course">{item.tag}</Link>
                                             </li>
                                             {item.price && <li className="price"><del>${item.old_price}.00</del>${item.price}.00</li>}
                                          </ul>
                                          <h5 className="title"><Link to="/course-details">{item.title}</Link></h5>
                                          <div className="courses__item-content-bottom">
                                             <div className="author-two">
                                                <Link to="/instructor-details"><img src={item.avatar_thumb} alt="img" />{item.avatar_name}</Link>
                                             </div>
                                             <div className="avg-rating">
                                                <i className="fas fa-star"></i> {item.review}
                                             </div>
                                          </div>
                                          {item.progress &&
                                             <div className="progress-item progress-item-two">
                                                <h6 className="title">COMPLETE <span>{item.progress}%</span></h6>
                                                <div className="progress">
                                                   <div className="progress-bar" style={{ width: `${item.progress}%` }}></div>
                                                </div>
                                             </div>
                                          }
                                       </div>
                                       <div className="courses__item-bottom-two">
                                          <ul className="list-wrap">
                                             <li><i className="flaticon-book"></i>{item.book}</li>
                                             <li><i className="flaticon-clock"></i>{item.time}</li>
                                             <li><i className="flaticon-mortarboard"></i>{item.mortarboard}</li>
                                          </ul>
                                       </div>
                                    </div>
                                 </SwiperSlide>
                              ))}
                           </Swiper>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default InstructorEnrolledCourseContent
