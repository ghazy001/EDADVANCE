import { useState } from "react"
import { Link } from "react-router-dom"
import VideoPopup from "../../../modals/VideoPopup";
import BtnArrow from "../../../svg/BtnArrow";

const Choose = () => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
         <section className="choose__area tg-motion-effects section-py-140">
            <div className="container">
               <div className="choose__inner-wrap">
                  <div className="row">
                     <div className="col-lg-5 order-0 order-lg-2">
                        <div className="choose__img" data-aos="fade-left" data-aos-delay="300">
                           <img src="/assets/img/others/choose_img.jpg" alt="img" />
                           <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="popup-video"><i className="fas fa-play"></i></a>
                        </div>
                     </div>
                     <div className="col-lg-7">
                        <div className="choose__content">
                           <div className="section__title mb-15">
                              <span className="sub-title">Why Choose Our Campus</span>
                              <h2 className="title">Get Your Quality Skills Certificate Online Exam</h2>
                           </div>
                           <p>when an unknown printer took a galleytype and scrambled makespecimen book has survived</p>
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
                           <Link to="/about-us" className="btn arrow-btn">Read More <BtnArrow /></Link>
                           <div className="shape">
                              <img src="/assets/img/others/choose_shape03.svg" alt="shape" className="tg-motion-effects3" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="choose__shape">
               <img src="/assets/img/others/choose_shape01.svg" alt="shape" className="tg-motion-effects4" />
               <img src="/assets/img/others/choose_shape02.svg" alt="shape" className="tg-motion-effects5" />
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
