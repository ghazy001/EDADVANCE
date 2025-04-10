import VideoPopup from "../../../modals/VideoPopup"
import { Link } from "react-router-dom"
import BtnArrow from "../../../svg/BtnArrow"
import InjectableSvg from "../../../hooks/InjectableSvg"
import SvgAnimation from "../../../hooks/SvgAnimation"
import { useState } from "react"

const Banner = () => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);
   const svgIconRef = SvgAnimation('/assets/img/banner/h6_banner_img_shape03.svg');

   return (
      <>
         <section className="banner-area banner-bg-six tg-motion-effects" style={{ backgroundImage: `url(/assets/img/banner/h6_hero_bg.jpg)` }}>
            <div className="container">
               <div className="row justify-content-center align-items-center">
                  <div className="col-lg-7 col-md-9 col-sm-10 order-0 order-lg-2">
                     <div className="banner__images-six">
                        <div className="main-img tg-svg" ref={svgIconRef}>
                           <img src="/assets/img/banner/h6_hero_img.jpg" alt="img" />
                           <span className="svg-icon"></span>
                        </div>
                        <div className="about__enrolled about__enrolled-two" data-aos="fade-right" data-aos-delay="1000">
                           <img src="/assets/img/others/student_grp.png" alt="img" />
                           <p className="title">250K+ Students</p>
                        </div>
                        <div className="banner__review" data-aos="fade-left" data-aos-delay="1000">
                           <div className="icon">
                              <InjectableSvg src="/assets/img/icons/star.svg" alt="" className="injectable" />
                           </div>
                           <h6 className="title">4.9/5 <span>Real Reviews</span></h6>
                        </div>
                        <div className="banner__courses" data-aos="fade-up" data-aos-delay="1000">
                           <div className="icon">
                              <i className="skillgro-closed-book"></i>
                           </div>
                           <h6 className="title">45+ <span>Courses</span></h6>
                        </div>
                        <div className="shape-wrap">
                           <img src="/assets/img/banner/h6_banner_img_shape01.svg" alt="shape" />
                           <img src="/assets/img/banner/h6_banner_img_shape02.svg" alt="shape" className="alltuchtopdown" />
                        </div>
                     </div>
                  </div>

                  <div className="col-lg-5">
                     <div className="banner__content-six">
                        <h2 className="title" data-aos="fade-up" data-aos-delay="200">Confidently
                           <span className="position-relative title-shape-wrap">
                              speak
                              <svg preserveAspectRatio="none" viewBox="0 0 194 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M5.9248 9.14229C87.0423 -1.40948 102.959 -2.82734 187.674 4.88873C191.725 5.32113 194.527 8.47862 193.917 11.9277C191.244 28.0571 189.524 43.3886 188.756 57.9225C188.7 60.899 185.565 63.5436 181.778 63.8252C102.954 70.9044 92.6515 71.8966 16.8703 66.8017C13.194 66.5503 9.79525 63.7447 9.26809 60.547C6.50283 45.3964 3.45086 30.4336 0.112199 15.6584C-0.58143 12.5612 2.01274 9.65513 5.91093 9.14229" fill="currentcolor" />
                              </svg>
                           </span>
                           a new language
                        </h2>
                        <span className="sub-title" data-aos="fade-up" data-aos-delay="400">More than 240 thousand new users SignUp Here!</span>
                        <ul className="about__info-list banner__info-list list-wrap" data-aos="fade-up" data-aos-delay="600">
                           <li className="about__info-list-item">
                              <i className="flaticon-angle-right"></i>
                              <p className="content">Live classes online 24/7</p>
                           </li>
                           <li className="about__info-list-item">
                              <i className="flaticon-angle-right"></i>
                              <p className="content">Learn in small groups or 1-on-1</p>
                           </li>
                           <li className="about__info-list-item">
                              <i className="flaticon-angle-right"></i>
                              <p className="content">Free 7-day trial</p>
                           </li>
                        </ul>
                        <div className="banner__btn-wrap-three" data-aos="fade-up" data-aos-delay="800">
                           <Link to="/courses" className="btn arrow-btn btn-four">Explore All Course <BtnArrow /></Link>
                           <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="play-btn popup-video"><i className="fas fa-play"></i> <span>See How It Work</span></a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <VideoPopup
            isVideoOpen={isVideoOpen}
            setIsVideoOpen={setIsVideoOpen}
            videoId={"Ml4XCF-JS0k"}
         />
      </>
   )
}

export default Banner
