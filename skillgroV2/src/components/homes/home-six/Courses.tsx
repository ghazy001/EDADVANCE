import { Link } from "react-router-dom"
import InjectableSvg from "../../../hooks/InjectableSvg"
import course_data_two from "../../../data/home-data/CourseDataTwo"
import BtnArrow from "../../../svg/BtnArrow"

const Courses = () => {
  return (
    <section className="courses-area-five section-py-140 courses__bg-four" style={{ backgroundImage: `url(/assets/img/bg/h6_courses_bg.jpg)` }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <div className="section__title text-center mb-50">
              <span className="sub-title">Top Class Courses</span>
              <h2 className="title bold">Get The Best Language Class Experience With us</h2>
            </div>
          </div>
        </div>
        
        <div className="row justify-content-center">
          {course_data_two.filter((items) => items.page === "home_6").map((item) => (
            <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
              <div className="courses__item-seven">
                <div className="courses__item-thumb-six">
                  <Link to="/course-details"><img src={item.thumb} alt="img" /></Link>
                  <Link to="/course-details" className="courses__wishlist-two"><InjectableSvg src="/assets/img/icons/heart02.svg" alt="" className="injectable" /></Link>
                  <Link to="/courses" className="courses__item-tag-three">{item.country}</Link>
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
                </div>
                <div className="courses__item-content-six">
                  <div className="courses__item-content-six-top">
                    <h2 className="title"><Link to="/course-details">{item.tag}</Link></h2>
                    <h3 className="price">${item.price}.00</h3>
                  </div>
                  <span>{item.title}</span>
                  <ul className="courses__item-meta-two list-wrap">
                    <li>{item.country} <InjectableSvg src="/assets/img/icons/graph.svg" alt="" className="injectable" /></li>
                    <li>{item.language} <InjectableSvg src="/assets/img/icons/graph.svg" alt="" className="injectable" /></li>
                  </ul>
                  <p>{item.desc}</p>
                </div>
                <div className="courses__item-bottom-three courses__item-bottom-four">
                  <ul className="list-wrap">
                    <li><i className="flaticon-book"></i>Lessons {item.lesson}</li>
                    <li><i className="skillgro-group"></i>Students {item.student}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-btn view-all-categories">
          <Link to="/courses"><span>Discover All Class</span><BtnArrow /></Link>
        </div>
      </div>
    </section>
  )
}

export default Courses
