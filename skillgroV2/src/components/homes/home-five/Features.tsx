import { Link } from "react-router-dom"
import feature_data from "../../../data/home-data/FeatureData"
import InjectableSvg from "../../../hooks/InjectableSvg"
import SvgDashed from "../../../svg/SvgDashed"
import BtnArrow from "../../../svg/BtnArrow"

const Features = () => {
   return (
      <section className="features__area-six section-pt-140 section-pb-110">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8">
                  <div className="section__title text-center mb-40">
                     <h2 className="title bold">Grow and expand your skills through enjoyable & imaginative</h2>
                     <p>Modorem ipsum dolor sit amet, consectetur adipisicing elitsed eius modetempor incididunt ulabore et dolore magna aliqua.</p>
                  </div>
               </div>
            </div>
            
            <div className="features__item-wrap-three">
               <div className="row justify-content-center">
                  {feature_data.filter((items) => items.page === "home_5").map((item) => (
                     <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-8">
                        <div className="features__item-five">
                           <div className="features__item-five-shape">
                              <div className="shape-one">
                                 <InjectableSvg src="/assets/img/others/h5_features_item_shape.svg" alt="" className="injectable" />
                              </div>
                              <div className="shape-two">
                                 <SvgDashed />
                              </div>
                           </div>
                           <div className="features__icon-five">
                              <i className={item.icon_2}></i>
                              <InjectableSvg src="/assets/img/icons/h5_features_icon.svg" alt="" className="injectable" />
                           </div>
                           <div className="features__content-five">
                              <h2 className="title">Easy Class</h2>
                              <p>Dear psum dolor amettey adipis aecing eiusmod incididutt reore</p>
                              <Link to="/about-us" className="btn arrow-btn">Read More <BtnArrow /></Link>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
         <div className="features__shape-wrap-two">
            <img src="/assets/img/others/h5_features_shape01.svg" alt="shape" className="rotateme" />
            <img src="/assets/img/others/h5_features_shape02.svg" alt="shape" data-aos="fade-down-left" data-aos-delay="400" />
         </div>
      </section>
   )
}

export default Features
