import { useState } from "react"
import InjectableSvg from "../../../hooks/InjectableSvg"
import SvgAnimation from "../../../hooks/SvgAnimation";
import { Link } from "react-router-dom";
import VideoPopup from "../../../modals/VideoPopup";
import BtnArrow from "../../../svg/BtnArrow";

const Banner = () => {

   const svgIconRef = SvgAnimation('/assets/img/banner/h2_banner_shape02.svg');
   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
         <section className="banner-area-two banner-bg-two tg-motion-effects" style={{ backgroundImage: `url(/assets/img/banner/banner_bg02.png)` }}>
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-xl-5 col-lg-6">
                     <div className="banner__content-two">
                        <h3 className="title" data-aos="fade-right" data-aos-delay="400">
                           Learning is
                           <span className="position-relative" style={{ marginLeft: "10px" }}>
                              <svg x="0px" y="0px" preserveAspectRatio="none" viewBox="0 0 209 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M4.74438 7.70565C69.7006 -1.18799 136.097 -2.38304 203.934 4.1205C207.178 4.48495 209.422 7.14626 208.933 10.0534C206.793 23.6481 205.415 36.5704 204.801 48.8204C204.756 51.3291 202.246 53.5582 199.213 53.7955C136.093 59.7623 74.1922 60.5985 13.5091 56.3043C10.5653 56.0924 7.84371 53.7277 7.42158 51.0325C5.20725 38.2627 2.76333 25.6511 0.0898448 13.1978C-0.465589 10.5873 1.61173 8.1379 4.73327 7.70565" fill="currentcolor" />
                              </svg>
                              What You
                           </span> <br />
                           Make of it. Make it Yours at SkillGro.
                        </h3>
                        <div className="banner__btn-two" data-aos="fade-right" data-aos-delay="600">
                           <Link to="/contact" className="btn arrow-btn">Start Free Trial <BtnArrow /></Link>
                           <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="play-btn popup-video"><i className="fas fa-play"></i> Watch Our <br /> Class Demo</a>
                        </div>
                     </div>
                  </div>

                  <div className="col-xl-7 col-lg-6 col-md-8">
                     <div className="banner__images-two tg-svg" ref={svgIconRef}>
                        <img src="/assets/img/banner/h2_banner_img.png" alt="img" className="main-img" />
                        <div className="shape big-shape" data-aos="fade-up" data-aos-delay="600">
                           <InjectableSvg src="/assets/img/banner/h2_banner_shape01.svg" alt="shape" className="injectable tg-motion-effects1" />
                        </div>
                        <span className="svg-icon"></span>
                        <div className="about__enrolled" data-aos="fade-right" data-aos-delay="200">
                           <p className="title"><span>36K+</span> Enrolled Students</p>
                           <img src="/assets/img/others/student_grp.png" alt="img" />
                        </div>
                        <div className="banner__student" data-aos="fade-left" data-aos-delay="200">
                           <div className="icon">
                              <InjectableSvg src="/assets/img/banner/h2_banner_icon.svg" alt="img" className="injectable" />
                           </div>
                           <div className="content">
                              <span>Total Students</span>
                              <h4 className="title">15K</h4>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <img src="/assets/img/banner/h2_banner_shape03.svg" alt="shape" className="line-shape-two" data-aos="fade-right"
               data-aos-delay="1600" />
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
