import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import course_data from "../../../data/home-data/CourseData";
import { Link } from "react-router-dom";

const tab_title: string[] = ["All Courses", "Design", "Business", "Development"];

// slider setting
const setting = {
  slidesPerView: 4,
  loop: true,
  spaceBetween: 30,
  observer: true,
  observeParents: true,
  autoplay: false,
  // Navigation arrows
  navigation: {
    nextEl: '.courses-button-next',
    prevEl: '.courses-button-prev',
  },
  breakpoints: {
    '1500': {
      slidesPerView: 4,
    },
    '1200': {
      slidesPerView: 4,
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
};

interface CourseProps {
  style: boolean;
}

const CourseArea = ({ style }: CourseProps) => {

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <section className={`courses-area ${style ? "section-py-120" : "section-pt-120 section-pb-90"}`} style={{ backgroundImage: `url(/assets/img/bg/courses_bg.jpg )` }}>
      <div className="container">
        <div className="section__title-wrap">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section__title text-center mb-40">
                <span className="sub-title">Top Class Courses</span>
                <h2 className="title">Explore Our World&apos;s Best Courses</h2>
                <p className="desc">When known printer took a galley of type scrambl edmake</p>
              </div>
              <div className="courses__nav">
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
        </div>

        <div className="tab-content" id="courseTabContent">
          {course_data.filter((items) => items.page === "home_1").map((course_item, index) => (
            <div key={course_item.id} className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`} id="all-tab-pane" role="tabpanel" aria-labelledby="all-tab">
              <Swiper {...setting} modules={[Autoplay, Navigation]} className="swiper courses-swiper-active">
                {course_item.course_details.map((item) => (
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
                          <li className="avg-rating"><i className="fas fa-star"></i> {item.review}</li>
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
              {!style &&
                <div className="courses__nav">
                  <div className="courses-button-prev"><i className="flaticon-arrow-right"></i></div>
                  <div className="courses-button-next"><i className="flaticon-arrow-right"></i></div>
                </div>
              }
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CourseArea
