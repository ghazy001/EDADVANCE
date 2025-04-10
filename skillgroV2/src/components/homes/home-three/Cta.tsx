import { Link } from "react-router-dom"
import BtnArrow from "../../../svg/BtnArrow"

const Cta = () => {
   return (
      <section className="cta__area">
         <div className="cta__bg" style={{ backgroundImage: `url(/assets/img/bg/cta_bg.jpg)` }} ></div>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-lg-10">
                  <div className="cta__content">
                     <h2 className="title">Together We Go Far</h2>
                     <p>Through research and discovery, we are changing the world.</p>
                     <Link to="/contact" className="btn arrow-btn">Join With Us <BtnArrow /></Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Cta
