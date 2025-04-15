import { Link } from "react-router-dom"
import Social from "../../components/common/Social"

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
                           <p>201 S. Grand Ave., 1st Floor New York City, NY 28020</p>
                           <ul className="list-wrap">
                              <li><Link to="tel:0123456789">+123 88 9900 456</Link></li>
                              <li className="email"><a href="mailto:info@gmail.com">info@gmail.com</a></li>
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
                              <li><Link to="/events-details">Our partners</Link></li>
                              <li><Link to="/events-details">Become a partner</Link></li>
                              <li><Link to="/events-details">Work at Future Learn</Link></li>
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
                              <li><Link to="/instructor-details">Become Teacher</Link></li>
                              <li><Link to="/blog">Blog</Link></li>
                              <li><Link to="/instructor-details">Instructor</Link></li>
                              <li><Link to="/events-details">Events</Link></li>
                           </ul>
                        </div>
                     </div>
                  </div>

                  <div className="col-xl-4 col-lg-6 col-md-6">
                     <div className="footer__widget">
                        <h4 className="footer__widget-title">Newsletter SignUp!</h4>
                        <div className="footer__newsletter">
                           <p>Get the latest UniCamp news delivered to you inbox</p>
                           <form onSubmit={(e) => e.preventDefault()} className="footer__newsletter-form">
                              <input type="email" placeholder="Type your E-mail" />
                              <button type="submit">Subscribe</button>
                           </form>
                           <div className="footer__social-wrap">
                              <h6 className="title">Follow Us:</h6>
                           </div>
                           <ul className="list-wrap footer__social footer__social-two">
                              <Social />
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
                        <p>© 2010-2024 skillgro.com. All rights reserved.</p>
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
