import { Link } from "react-router-dom"
import BtnArrow from "../../../svg/BtnArrow"

const Newsletter = () => {
   return (
      <section className="newsletter__area-two">
         <div className="container">
            <div className="newsletter__inner-wrap">
               <h2 className="title">Start today and get certified in Fundamentals of Business Core</h2>
               <div className="newsletter__btn">
                  <Link to="/login" className="btn arrow-btn btn-two">Get Started Now <BtnArrow /></Link>
               </div>
               <img src="/assets/img/others/h7_newsletter_shape01.svg" alt="shape" data-aos="fade-down-right" data-aos-delay="400" className="shape shape-one" />
               <img src="/assets/img/others/h7_newsletter_shape02.svg" alt="shape" className="shape shape-two rotateme" />
            </div>
         </div>
      </section>
   )
}

export default Newsletter
