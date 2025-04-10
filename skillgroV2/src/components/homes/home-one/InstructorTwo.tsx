import { Link } from "react-router-dom";
import InjectableSvg from "../../../hooks/InjectableSvg";
import SvgAnimation from "../../../hooks/SvgAnimation";
import BtnArrow from "../../../svg/BtnArrow";

interface InstructorTwoProps {
   style: boolean;
}
const InstructorTwo = ({ style }: InstructorTwoProps) => {

   const svgIconRef = SvgAnimation('/assets/img/instructor/instructor_shape02.svg');
   const svgIconRef2 = SvgAnimation('/assets/img/instructor/instructor_shape02.svg');

   return (
      <section className={`${style ? "instructor__area-four" : "instructor__area-two"}`}>
         <div className="container">
            <div className="instructor__item-wrap-two">
               <div className="row">
                  <div className="col-xl-6">
                     <div className="instructor__item-two tg-svg" ref={svgIconRef}>
                        <div className="instructor__thumb-two">
                           <img src="/assets/img/instructor/instructor_two01.png" alt="img" />
                           <div className="shape-one">
                              <InjectableSvg src="/assets/img/instructor/instructor_shape01.svg" alt="img" className="injectable" />
                           </div>
                           <div className="shape-two">
                              <span className="svg-icon"></span>
                           </div>
                        </div>
                        <div className="instructor__content-two">
                           <h3 className="title"><Link to="/contact">Become a Instructor</Link></h3>
                           <p>To take a trivial example, which of us undertakes physical exercise yes is this happen here.</p>
                           <div className="tg-button-wrap">
                              <Link to="/contact" className="btn arrow-btn">Apply Now <BtnArrow /></Link>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="col-xl-6">
                     <div className="instructor__item-two tg-svg" ref={svgIconRef2}>
                        <div className="instructor__thumb-two">
                           <img src="/assets/img/instructor/instructor_two02.png" alt="img" />
                           <div className="shape-one">
                              <InjectableSvg src="/assets/img/instructor/instructor_shape01.svg" alt="img" className="injectable" />
                           </div>
                           <div className="shape-two">
                              <span className="svg-icon"></span>
                           </div>
                        </div>
                        <div className="instructor__content-two">
                           <h3 className="title"><Link to="/contact">Become a Student</Link></h3>
                           <p>Join millions of people from around the world learning together. Online learning</p>
                           <div className="tg-button-wrap">
                              <Link to="/contact" className="btn arrow-btn">Apply Now <BtnArrow /></Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default InstructorTwo
