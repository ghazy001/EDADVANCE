import CommonTestimonialtwo from "../../common/CommonTestimonialtwo"

const Testimonial = () => {
   return (
      <section className="testimonial__area-six section-py-140 testimonial__bg-three" style={{ backgroundImage: `url(/assets/img/bg/h8_testimonial_bg.jpg)` }}>
         <div className="container">
            <div className="row align-items-center">
               <div className="col-xl-5 col-lg-6 col-md-8">
                  <div className="section__title mb-50">
                     <span className="sub-title">Our Testimonials</span>
                     <h2 className="title">What Students Think and Say About SkillGrow</h2>
                  </div>
               </div>
               <div className="col-xl-7 col-lg-6 col-md-4">
                  <div className="testimonial__nav-two">
                     <button className="testimonial-button-prev"><i className="skillgro-right-arrow"></i></button>
                     <button className="testimonial-button-next"><i className="skillgro-right-arrow"></i></button>
                  </div>
               </div>
            </div>
            <CommonTestimonialtwo class_name="testimonial__item-five" />
         </div>
         <div className="testimonial__shape-wrap-two">
            <img src="/assets/img/others/h8_testimonial_shape01.svg" alt="shape" data-aos="fade-down-left" data-aos-delay="400" />
            <img src="/assets/img/others/h8_testimonial_shape01.svg" alt="shape" data-aos="fade-up-right" data-aos-delay="400" />
         </div>
      </section>
   )
}

export default Testimonial
