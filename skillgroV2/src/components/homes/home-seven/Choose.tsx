import { useState } from "react"
import { Link } from "react-router-dom";
import BtnArrow from "../../../svg/BtnArrow";
import VideoPopup from "../../../modals/VideoPopup";

const Choose = () => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
         <section className="choose__area-four tg-motion-effects section-py-140">
            <div className="container">
               <div className="row align-items-center justify-content-center">
                  <div className="col-lg-6 col-md-10">
                     <div className="choose__img-four">
                        <div className="left__side">
                           <img src="/assets/img/others/h7_choose_img01.jpg" alt="img" data-aos="fade-down" data-aos-delay="200" />
                           <img src="/assets/img/others/h7_choose_img02.jpg" alt="img" data-aos="fade-up" data-aos-delay="200" />
                        </div>
                        <div className="right__side" data-aos="fade-left" data-aos-delay="400">
                           <img src="/assets/img/others/h7_choose_img03.jpg" alt="img" />
                           <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="popup-video"><i className="fas fa-play"></i></a>
                        </div>
                        <img src="/assets/img/others/h7_choose_shape01.svg" alt="shape" className="shape shape-one tg-motion-effects4" />
                        <img src="/assets/img/others/h7_choose_shape02.svg" alt="shape" className="shape shape-two alltuchtopdown" />
                        <img src="/assets/img/others/h7_choose_shape03.svg" alt="shape" className="shape shape-three tg-motion-effects7" />
                     </div>
                  </div>
                  <div className="col-lg-6">
                     <div className="choose__content-four">
                        <div className="section__title mb-20">
                           <span className="sub-title">Why Choose Us</span>
                           <h2 className="title bold">Professional Courses taught by industry leaders</h2>
                        </div>
                        <p>Groove’s intuitive shared inbox makes it easy for team member anIn this episode.Groove’s intuitive shared inboeasy for team organize, prioritize anIn this episode.</p>
                        <ul className="about__info-list list-wrap">
                           <li className="about__info-list-item">
                              <i className="flaticon-angle-right"></i>
                              <p className="content">Body & Mind Stress Relief</p>
                           </li>
                           <li className="about__info-list-item">
                              <i className="flaticon-angle-right"></i>
                              <p className="content">Enhance Strength Growing</p>
                           </li>
                           <li className="about__info-list-item">
                              <i className="flaticon-angle-right"></i>
                              <p className="content">Get Better Posture</p>
                           </li>
                        </ul>
                        <Link to="/login" className="btn arrow-btn btn-four">Start Free Trial<BtnArrow /></Link>
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

export default Choose
