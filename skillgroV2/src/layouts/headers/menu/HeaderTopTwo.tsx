import { Link } from "react-router-dom"
import BtnArrow from "../../../svg/BtnArrow"

const HeaderTopTwo = () => {
   return (
      <div className="tg-header__top tg-header__top-two">
         <div className="container custom-container">
            <div className="row align-items-center">
               <div className="col-lg-6">
                  <ul className="tg-header__top-info list-wrap">
                     <li><img src="/assets/img/icons/map_marker.svg" alt="Icon" /> <span>589 5th Ave, NY 10024, USA</span>
                     </li>
                     <li><img src="/assets/img/icons/envelope.svg" alt="Icon" /> <Link to="mailto:info@skillgrodemo.com">info@skillgrodemo.com</Link></li>
                  </ul>
               </div>
               <div className="col-lg-6">
                  <div className="tg-header__top-right">
                     <ul className="tg-header__top-social list-wrap">
                        <li>Follow Us On :</li>
                        <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                        <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                        <li><Link to="#"><i className="fab fa-whatsapp"></i></Link></li>
                        <li><Link to="#"><i className="fab fa-linkedin-in"></i></Link></li>
                        <li><Link to="#"><i className="fab fa-youtube"></i></Link></li>
                     </ul>
                     <div className="tg-header__top-btn">
                        <Link to="/contact" className="btn arrow-btn">Get in Touch <BtnArrow /></Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default HeaderTopTwo
