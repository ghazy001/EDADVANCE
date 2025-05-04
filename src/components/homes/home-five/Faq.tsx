import FaqOne from "../../common/faq/FaqOne"

const Faq = () => {
   return (
      <section className="faq__area-two tg-motion-effects section-py-140">
         <div className="container">
            <div className="row align-items-center justify-content-center">
               <div className="col-lg-6 col-md-8 order-0 order-lg-2">
                  <div className="faq__img-three">
                     <div className="faq__mask-img">
                        <img src="/assets/img/others/h5_faq_img.jpg" alt="img" />
                     </div>
                     <div className="faq__img-shape">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 718 554" fill="none" data-inject-url="http://127.0.0.1:5500/skillgro-html/assets/img/others/h5_faq_img_shape.svg" className="injectable">
                           <path className="animation-dashed" d="M53.9109 99.5086C16.9646 159.342 -0.37752 230.84 2.26149 301.21C3.0155 324.541 6.03153 347.872 12.8176 370.45C29.4057 425.391 69.368 471.677 118.001 501.782C166.635 531.886 223.939 546.938 281.244 551.078C429.029 560.862 583.223 492.374 664.278 368.192C703.864 307.231 725.73 232.345 711.781 160.847C697.832 89.7247 642.789 24.6234 571.536 9.94741C523.279 0.163409 475.023 12.9579 427.898 21.613C370.593 31.7733 326.861 28.0101 271.819 10.7C185.108 -16.3942 102.167 21.6129 53.9109 99.5086Z" stroke="#CACACA" strokeWidth="3" strokeDasharray="20 20"></path>
                        </svg>
                     </div>
                     <div className="shape shape-one" data-aos="fade-down-left" data-aos-delay="400">
                        <img src="/assets/img/others/h5_faq_shape02.svg" alt="shape" className="tg-motion-effects3" />
                     </div>
                     <div className="shape shape-two" data-aos="fade-up-left" data-aos-delay="400">
                        <img src="/assets/img/others/h5_faq_shape03.svg" alt="shape" className="tg-motion-effects4" />
                     </div>
                  </div>
               </div>
               
               <div className="col-lg-6">
                  <div className="faq__content-two">
                     <FaqOne />
                  </div>
               </div>
            </div>
         </div>
         <div className="faq__shape">
            <img src="/assets/img/others/h5_faq_shape01.svg" alt="shape" className="tg-motion-effects3" />
         </div>
      </section>
   )
}

export default Faq
