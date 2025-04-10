import { Link } from "react-router-dom"

const Cta = () => {
   return (
      <section className="cta__area-two cta__bg-two" style={{ backgroundImage: `url(/assets/img/bg/h4_cta_bg.jpg)` }}>
         <div className="container">
            <div className="row">
               <div className="col-lg-4">
                  <div className="cta__img">
                     <img src="/assets/img/others/h4_cta_img.png" alt="img" />
                     <div className="shape">
                        <img src="/assets/img/others/h4_cta_shape.svg" alt="shape" className="rotateme" />
                     </div>
                  </div>
               </div>
               <div className="col-lg-8">
                  <div className="cta__content-two">
                     <h2 className="title">My <span>course</span> helps to become Balance <span>in life</span></h2>
                     <div className="cta__btn">
                        <Link to="/contact" className="btn">Check Available Seat</Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="cta__shape">
            <img src="/assets/img/others/h4_cta_shape02.svg" alt="shape" data-aos="fade-left" data-aos-delay="400" />
         </div>
      </section>
   )
}

export default Cta
