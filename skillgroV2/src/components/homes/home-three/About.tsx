import { useState } from "react"
import VideoPopup from "../../../modals/VideoPopup";
import { Link } from "react-router-dom";
import BtnArrow from "../../../svg/BtnArrow";

const About = () => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
         <section className="about-area-four section-pb-120">
            <div className="container">
               <div className="row align-items-center justify-content-center">
                  <div className="col-lg-5 col-md-9">
                     <div className="about__images-four">
                        <img src="/assets/img/others/h3_about_img.jpg" alt="" />
                        <div className="about__enrolled" data-aos="fade-up" data-aos-delay="400">
                           <p className="title"><span>36K+</span> Enrolled Students</p>
                           <img src="/assets/img/others/student_grp.png" alt="img" />
                        </div>
                        <div className="about__video" data-aos="fade-left" data-aos-delay="400">
                           <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="play-btn popup-video"><i className="fas fa-play"></i> Watch our <br /> Video</a>
                        </div>
                        <div className="about__year-wrap">
                           <h2 className="count">15</h2>
                           <h5 className="title">year <br /> of Institutes</h5>
                        </div>
                        <div className="shape">
                           <img src="/assets/img/others/h3_about_shape01.svg" alt="shape" data-aos="fade-right" data-aos-delay="200" className="alltuchtopdown" />
                           <img src="/assets/img/others/h3_about_shape02.svg" alt="shape" data-aos="fade-right" data-aos-delay="200" />
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-7">
                     <div className="about__content-four">
                        <div className="section__title mb-15">
                           <span className="sub-title">About Campus history</span>
                           <h2 className="title">We Are One of The Largest, Most <br /> Diverse Universities in The USA</h2>
                        </div>
                        <p className="info-bold">Preparing students to make meaningful contributions to society as leaders in a complex wPreparing students to make meaningful contribution.Preparing students to make contributions to society as leaders in a complex.</p>
                        <div className="about__content-inner">
                           <div className="row">
                              <div className="col-md-6">
                                 <p>At Estuidar University, we prepare you areay launch your career by providing sucreativnd professional environment from which to learn al skillset workindustry contacts, and gain real-worldxperience. </p>
                              </div>
                              <div className="col-md-6">
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
                        <Link to="/about-us" className="btn arrow-btn">Know More <BtnArrow /></Link>
                        <img src="/assets/img/others/h3_about_shape03.svg" alt="shape" className="shape alltuchtopdown" />
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

export default About
