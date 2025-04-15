import { Link } from "react-router-dom"
import InjectableSvg from "../../../hooks/InjectableSvg"
import BtnArrow from "../../../svg/BtnArrow"

const Banner = () => {

   return (
      <section className="banner-area banner-bg-four tg-motion-effects" style={{ backgroundImage: `url(/assets/img/banner/h4_hero_bg.jpg)` }}>
         <div className="container">
            <div className="row justify-content-center align-items-start">
               <div className="col-xl-5 col-lg-6">
                  <div className="banner__content-four">
                     <h6 className="sub-title" data-aos="fade-down" data-aos-delay="600">Hi, Im</h6>
                     <h2 className="title" data-aos="fade-down" data-aos-delay="400">Jecov Rossy
                        <span className="title__shape">
                           <InjectableSvg src="/assets/img/banner/h4_title_shape.svg" alt="" className="injectable" />
                        </span>
                     </h2>
                     <span className="sub-title-two" data-aos="fade-down" data-aos-delay="200">Personal Yoga Coach</span>
                     <p data-aos="fade-up" data-aos-delay="400">I’m here to help you find the confidence you need to feel amazing in your body!when an unknown printer took a galley of type and scrambled it ecimen has survived not onlyled it to make.</p>
                     <div className="banner__btn-wrap-two" data-aos="fade-up" data-aos-delay="600">
                        <Link to="/courses" className="btn arrow-btn">Find Your Class <BtnArrow /></Link>
                        <div className="banner__contact">
                           <div className="icon">
                              <InjectableSvg src="/assets/img/icons/phone.svg" alt="" className="injectable" />
                           </div>
                           <div className="content">
                              <span>Booking Open</span>
                              <Link to="tel:0123456789">+1 (123) 909090</Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="col-xl-7 col-lg-6 col-md-9 col-sm-10">
                  <div className="banner__images-four">
                     <img src="/assets/img/banner/h4_hero_img.png" alt="img" className="main-img" />
                     <div className="shape big-shape" data-aos="fade-up" data-aos-delay="900">
                        <img src="/assets/img/banner/h4_hero_img_shape01.svg" alt="shape" />
                     </div>
                     <div className="shape big-shape-two" data-aos="zoom-in" data-aos-delay="700">
                        <img src="/assets/img/banner/h4_hero_img_shape02.svg" alt="shape" className="tg-motion-effects5" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="banner__shape-wrap">
            <img src="/assets/img/banner/h4_hero_shape01.svg" alt="shape" data-aos="fade-down-right" data-aos-delay="1000" />
            <img src="/assets/img/banner/h4_hero_shape02.svg" alt="shape" data-aos="fade-up-left" data-aos-delay="1000" />
            <img src="/assets/img/banner/h4_hero_shape03.svg" alt="shape" className="tg-motion-effects4" />
         </div>
      </section>
   )
}

export default Banner
