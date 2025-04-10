import { Link } from "react-router-dom"
import BtnArrow from "../../../svg/BtnArrow"

const Banner = () => {

   return (
      <section className="banner-area banner-bg-five tg-motion-effects" style={{ backgroundImage: `url(/assets/img/banner/h5_hero_bg.jpg)` }}>
         <div className="banner-bg-five-shape" style={{ backgroundImage: `url(/assets/img/banner/h5_hero_bg_shape.svg)` }}></div>
         <div className="container">
            <div className="row justify-content-center align-items-center">
               <div className="col-xl-5 col-lg-5">
                  <div className="banner__content-five">
                     <span className="sub-title" data-aos="fade-right" data-aos-delay="200">Kindergarten Care School</span>
                     <h2 className="title" data-aos="fade-right" data-aos-delay="400">Together We’ll Explore <span>New Things</span></h2>
                     <p data-aos="fade-right" data-aos-delay="600">Morem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                     <div className="banner__btn" data-aos="fade-right" data-aos-delay="800">
                        <Link to="/courses" className="btn arrow-btn">Explore All Course <BtnArrow /></Link>
                     </div>
                  </div>
               </div>

               <div className="col-xl-7 col-lg-7 col-md-9 col-sm-10">
                  <div className="banner__images-five">
                     <img src="/assets/img/banner/h5_hero_img.png" alt="img" />
                     <div className="shape-wrap">
                        <div className="shape-one" data-aos="fade-up-right" data-aos-delay="800" >
                           <img src="/assets/img/banner/h5_hero_shape04.svg" alt="shape" className="tg-motion-effects1" />
                        </div>
                        <div className="shape-two" data-aos="fade-down-left" data-aos-delay="800">
                           <img src="/assets/img/banner/h5_hero_shape05.svg" alt="shape" className="tg-motion-effects3" />
                        </div>
                        <div className="shape-three" data-aos="fade-up-left" data-aos-delay="800">
                           <img src="/assets/img/banner/h5_hero_shape06.svg" alt="shape" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="banner__shape-wrap-two">
            <img src="/assets/img/banner/h5_hero_shape01.svg" alt="shape" data-aos="fade-right" data-aos-delay="1000" />
            <img src="/assets/img/banner/h5_hero_shape02.svg" alt="shape" className="tg-motion-effects7" />
            <img src="/assets/img/banner/h5_hero_shape03.svg" alt="shape" className="tg-motion-effects3" />
         </div>
      </section>
   )
}

export default Banner
