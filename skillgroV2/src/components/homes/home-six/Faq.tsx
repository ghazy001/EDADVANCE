import FaqOne from "../../common/faq/FaqOne"

const Faq = () => {
   return (
      <section className="faq__area-three tg-motion-effects section-py-140">
         <div className="container">
            <div className="row align-items-center justify-content-center">
               <div className="col-lg-7 col-md-10 order-0 order-lg-2">
                  <div className="faq__img-four">
                     <div className="main-img">
                        <img src="/assets/img/others/h6_faq_img01.jpg" alt="img" data-aos="fade-down" data-aos-delay="400" />
                        <img src="/assets/img/others/h6_faq_img02.jpg" alt="img" data-aos="fade-up" data-aos-delay="400" />
                     </div>
                     <div className="faq__language-wrap" data-aos="fade-right" data-aos-delay="600">
                        <h2 className="title">160k</h2>
                        <span>Country Language</span>
                     </div>
                     <div className="shape">
                        <img src="/assets/img/others/h6_faq_shape01.svg" alt="shape" className="alltuchtopdown" />
                        <img src="/assets/img/others/h6_faq_shape02.svg" alt="shape" className="tg-motion-effects4" />
                        <img src="/assets/img/others/h6_faq_shape03.svg" alt="shape" className="tg-motion-effects3" />
                     </div>
                  </div>
               </div>
               <div className="col-lg-5">
                  <div className="faq__content-two faq__content-three">
                     <FaqOne />
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Faq
