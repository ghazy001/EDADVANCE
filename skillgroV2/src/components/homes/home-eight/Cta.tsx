import { Link } from "react-router-dom";
import SvgAnimation from "../../../hooks/SvgAnimation";
import BtnArrow from "../../../svg/BtnArrow";

const Cta = () => {

   const svgIconRef = SvgAnimation('/assets/img/others/h8_cta_img_shape.svg');

   return (
      <section className="cta__area-four">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-10">
                  <div className="cta__inner-wrap">
                     <div className="cta__img-three tg-svg" ref={svgIconRef}>
                        <img src="/assets/img/others/h8_cta_img.png" alt="img" />
                        <span className="svg-icon"></span>
                     </div>
                     <div className="cta__content-three cta__content-four">
                        <div className="content__left">
                           <h2 className="title">Finding Your Right Courses</h2>
                           <p>roove’s intuitive shared inbox makes it easy for team member anIn this episo</p>
                        </div>
                        <Link to="/login" className="btn arrow-btn">GET sTARTED <BtnArrow /></Link>
                     </div>
                     <img src="/assets/img/others/h8_cta_shape.svg" alt="shape" className="shape" />
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Cta
