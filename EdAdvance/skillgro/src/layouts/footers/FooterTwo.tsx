import { Link } from "react-router-dom"


interface FooterTwoProps {
   style: boolean;
}
const FooterTwo = ({ style }: FooterTwoProps) => {
   return (
      <footer className={`footer__area ${style ? "footer__area-five" : "footer__area-three"}`}>
         <div className="footer__top footer__top-two">
            <div className="container">
               <div className="row">
                  <div className="col-xl-2 col-lg-4 col-md-6">
                     <div className="footer__widget">
                        <div className="logo mb-35">
                           <Link to="/"><img src="/assets/img/logo/secondary_logo.svg" alt="img" /></Link>
                        </div>
                        <div className="footer__content footer__content-two">
                        <p>Av.Fethi Zouhir,Cebalat Ben Ammar, Ariana</p>
                       
                           <ul className="list-wrap">
                              <li><Link to="tel:0123456789">+216 70 586 027</Link></li>
                              <li className="email"><Link to="mailto:info@gmail.com">infoEdAdvance@gmail.com</Link></li>
                           </ul>
                        </div>
                     </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                     <div className="footer__widget">
                        <h4 className="footer__widget-title">Useful Links</h4>
                        <div className="footer__link">
                           <ul className="list-wrap">
                           <li><Link to="/events-details">Our values</Link></li>
                     <li><Link to="/events-details">Our advisory board</Link></li>
              
                     <li><Link to="/events-details">Become a partner</Link></li>
                   
                     <li><Link to="/events-details">Quizlet Plus</Link></li>
                           </ul>
                        </div>
                     </div>
                  </div>

                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                     <div className="footer__widget">
                        <h4 className="footer__widget-title">Our Company</h4>
                        <div className="footer__link">
                           <ul className="list-wrap">
                              <li><Link to="/contact">Contact Us</Link></li>
                              <li><Link to="/contact">Contact Us</Link></li>
                     <li><Link to="/instructor-details">Become Teacher</Link></li>
                   
                     <li><Link to="/instructor-details">Instructor</Link></li>
                           </ul>
                        </div>
                     </div>
                  </div>

                  
               </div>
            </div>
         </div>

         <div className="footer__bottom-two">
            <div className="container">
               <div className="row align-items-center">
                  <div className="col-md-7">
                     <div className="copy-right-text">
                        <p>© 2025 EdAdvance.com. All rights reserved.</p>
                     </div>
                  </div>
                  <div className="col-md-5">
                     <div className="footer__bottom-menu">
                        <ul className="list-wrap">
                           <li><Link to="/contact">Term of Use</Link></li>
                           <li><Link to="/contact">Privacy Policy</Link></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default FooterTwo
