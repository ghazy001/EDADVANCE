import { useState } from "react";

import VideoPopup from "../../../modals/VideoPopup";


const About = () => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
          <section className="about-area tg-motion-effects section-py-120">
            <div className="container">
               <div className="row align-items-center justify-content-center">
                  <div className="col-lg-6 col-md-9">
                     <div className="about__images">
                        <img src="/assets/img/others/about_img.png" alt="img" className="main-img" />
                        <img src="/assets/img/others/about_shape.svg" alt="img" className="shape alltuchtopdown" />
                        
                        <div className="about__enrolled" data-aos="fade-right" data-aos-delay="200">
                           <p className="title"><span>36K+</span> Enrolled Students</p>
                           <img src="/assets/img/others/student_grp.png" alt="img" />
                        </div>
                     </div>
                  </div>

                  <div className="col-lg-6">
                     <div className="about__content">
                        <div className="section__title">
                           <span className="sub-title">Get More About Us</span>
                           <h2 className="title">
                              Thousand Of Top
                              <span className="position-relative title-shape-wrap">
                                 <svg x="0px" y="0px" preserveAspectRatio="none" viewBox="0 0 209 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.74438 7.70565C69.7006 -1.18799 136.097 -2.38304 203.934 4.1205C207.178 4.48495 209.422 7.14626 208.933 10.0534C206.793 23.6481 205.415 36.5704 204.801 48.8204C204.756 51.3291 202.246 53.5582 199.213 53.7955C136.093 59.7623 74.1922 60.5985 13.5091 56.3043C10.5653 56.0924 7.84371 53.7277 7.42158 51.0325C5.20725 38.2627 2.76333 25.6511 0.0898448 13.1978C-0.465589 10.5873 1.61173 8.1379 4.73327 7.70565" fill="currentcolor" />
                                 </svg>
                                 Courses
                              </span>
                              Now in One Place
                           </h2>
                        </div>
                        <p className="desc">Our e-learning platform offers an interactive and engaging learning experience, providing high-quality courses, expert-led training, and personalized learning paths to help users develop their skills effectively and efficiently.</p>
                        <ul className="about__info-list list-wrap">
                           <li className="about__info-list-item">
                              <i className="flaticon-angle-right"></i>
                              <p className="content">The Most World Class Instructors</p>
                           </li>
                           <li className="about__info-list-item">
                              <i className="flaticon-angle-right"></i>
                              <p className="content">Access Your Class anywhere</p>
                           </li>
                           <li className="about__info-list-item">
                              <i className="flaticon-angle-right"></i>
                              <p className="content">Flexible Course Plan</p>
                           </li>
                        </ul>
                       
                     </div>
                  </div>
               </div>
            </div>
         </section>
         {/* video modal start */}
         <VideoPopup
            isVideoOpen={isVideoOpen}
            setIsVideoOpen={setIsVideoOpen}
            videoId={"Ml4XCF-JS0k"}
         />
         {/* video modal end */}
      </>
   )
}

export default About
