import { Link } from "react-router-dom";
import InjectableSvg from "../../../hooks/InjectableSvg";
import SvgAnimation from "../../../hooks/SvgAnimation";
import CurvedCircle from "../home-one/CurvedCircle"
import BtnArrow from "../../../svg/BtnArrow";

const About = () => {
   const svgIconRef = SvgAnimation('/assets/img/objects/title_shape.svg');

   return (
      <section className="about-area-two tg-motion-effects section-pb-120">
         <div className="container">
            <div className="row align-items-center justify-content-center">
               <div className="col-lg-6">
                  <div className="faq__img-wrap tg-svg" ref={svgIconRef}>
                     <div className="faq__round-text">
                        <CurvedCircle />
                     </div>
                     <div className="faq__img faq__img-two">
                        <img src="/assets/img/others/faq_img.png" alt="img" />
                        <div className="shape-one">
                           <InjectableSvg src="/assets/img/others/faq_shape01.svg" className="injectable tg-motion-effects4" alt="img" />
                        </div>
                        <div className="shape-two">
                           <span className="svg-icon"></span>
                        </div>
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
                     <p className="desc">Groove’s intuitive shared inbox makes it easy for team members to
                        organize, prioritize and.In this episode of the Smashing Pod we’re talking about Web Platform Baseline.</p>
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
                     <div className="tg-button-wrap">
                        <Link to="/about-us" className="btn arrow-btn">Start Free Trial <BtnArrow /></Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default About
