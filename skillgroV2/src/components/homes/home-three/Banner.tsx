import { Link } from "react-router-dom"
import BtnArrow from "../../../svg/BtnArrow"

const Banner = () => {
   return (
      <section className="banner-area banner-bg-three tg-motion-effects" style={{ backgroundImage: `url(/assets/img/banner/h3_hero_bg.jpg)` }}>
         <div className="container">
            <div className="row justify-content-between align-items-start">
               <div className="col-xl-5 col-lg-6">
                  <div className="banner__content-three">
                     <span className="sub-title" data-aos="fade-right" data-aos-delay="200">FOR A BETTER FUTURE</span>
                     <h2 className="title" data-aos="fade-right" data-aos-delay="400">Empowering Minds Inspiring <span>Futures</span></h2>
                     <p data-aos="fade-right" data-aos-delay="600">Every teaching and learning journey is unique Follwoing We&apos;ll help guide your way.</p>
                     <div className="banner__btn-wrap" data-aos="fade-right" data-aos-delay="800">
                        <Link to="/courses" className="btn arrow-btn">Find Your Course <BtnArrow /></Link>
                     </div>
                     <div className="shape">
                        <img src="/assets/img/banner/h3_hero_shape01.svg" alt="shape" data-aos="fade-right" data-aos-delay="1000" />
                     </div>
                  </div>
               </div>

               <div className="col-lg-6">
                  <div className="banner__images-three">
                     <img src="/assets/img/banner/h3_hero_img.png" alt="img" className="main-img" />
                     <div className="shape big-shape" data-aos="fade-up" data-aos-delay="800">
                        <img src="/assets/img/banner/h3_hero_img02.svg" alt="shape" className="tg-motion-effects4" />
                     </div>
                     <div className="shape__wrap">
                        <img src="/assets/img/banner/h3_hero_shape02.svg" alt="shape" data-aos="fade-down-right" data-aos-delay="400" />
                        <img src="/assets/img/banner/h3_hero_shape03.svg" alt="shape" data-aos="fade-down-left" data-aos-delay="400" />
                     </div>
                     <div className="about__enrolled" data-aos="fade-right" data-aos-delay="900" >
                        <p className="title"><span>36K+</span> Enrolled Students</p>
                        <img src="/assets/img/others/student_grp.png" alt="img" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Banner
