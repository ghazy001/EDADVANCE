import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import inner_page_course_data from "../../../../data/inner-data/InnerPageCourseData";
import { Link } from "react-router-dom";

const setting = {
   // Optional parameters
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
         slidesPerView: 3,
         spaceBetween: 24,
      },
      '768': {
         slidesPerView: 2,
         spaceBetween: 24,
      },
      '576': {
         slidesPerView: 1,
      },
      '0': {
         slidesPerView: 1,
      },
   },
   // Navigation arrows
   navigation: {
      nextEl: ".courses-button-next",
      prevEl: ".courses-button-prev",
   },
}

const InstructorSlider = () => {

   const [isLoop, setIsLoop] = useState(false);
   useEffect(() => {
      setIsLoop(true);
   }, []);

   return (
      <Swiper
         {...setting}
         modules={[Navigation]}
         loop={isLoop} className="swiper courses-swiper-active-two">
         {inner_page_course_data.filter((items) => items.page === "inner_1").map((item) => (
            <SwiperSlide key={item.id} className="swiper-slide">
               <div className="courses__item shine__animate-item">
                  <div className="courses__item-thumb">
                     <Link to="/course-details" className="shine__animate-link">
                        <img src={item.thumb} alt="img" />
                     </Link>
                  </div>
                  <div className="courses__item-content">
                     <ul className="courses__item-meta list-wrap">
                        <li className="courses__item-tag">
                           <Link to="/course">{item.tag}</Link>
                        </li>
                        <li className="avg-rating"><i className="fas fa-star"></i>{item.review}</li>
                     </ul>
                     <h5 className="title"><Link to="/course-details">{item.title}</Link></h5>
                     <p className="author">By <Link to="#">{item.author}</Link></p>
                     <div className="courses__item-bottom">
                        <div className="button">
                           <Link to="/course-details">
                              <span className="text">Enroll Now</span>
                              <i className="flaticon-arrow-right"></i>
                           </Link>
                        </div>
                        <h5 className="price">${item.price}.00</h5>
                     </div>
                  </div>
               </div>
            </SwiperSlide>
         ))}
      </Swiper>
   )
}

export default InstructorSlider
