import { Link } from "react-router-dom"
import Social from "../../components/common/Social"
import InjectableSvg from "../../hooks/InjectableSvg"

const FooterThree = () => {
   return (
      <footer className="footer__area-four footer__bg" style={{ backgroundImage: `url(/assets/img/bg/h5_footer.jpg)` }}>
         <div className="footer__bg-shape">
            <InjectableSvg src="/assets/img/others/h5_footer_bg_shape.svg" alt="" className="injectable" />
         </div>
         <div className="footer__top footer__top-two">
            <div className="container">
               <div className="row">
                  <div className="col-xl-2 col-lg-4 col-md-6">
                     <div className="footer__widget">
                        <div className="logo mb-35">
                           <Link to=""><img src="/assets/img/logo/secondary_logo.svg" alt="img" /></Link>
                        </div>
                        <div className="footer__content footer__content-two">
                           <p>201 S. Grand Ave., 1st Floor New York City, NY 28020</p>
                           <ul className="list-wrap">
                              <li><Link to="tel:0123456789">+123 88 9900 456</Link></li>
                              <li className="email"><Link to="mailto:info@gmail.com">info@gmail.com</Link></li>
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
                           <form onSubmit={(e) => e.preventDefault()} className="footer__newsletter-form footer__newsletter-form-two">
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

         <div className="footer__bottom footer__bottom-three">
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

         <div className="footer__shape-wrap">
            <img src="/assets/img/others/h5_footer_shape01.svg" alt="shape" />
            <img src="/assets/img/others/h5_footer_shape02.svg" alt="shape" />
            <img src="/assets/img/others/h5_footer_shape03.svg" alt="shape" />
            <img src="/assets/img/others/h5_footer_shape04.svg" alt="shape" />
            <div className="shape-inner">
               <svg xmlns="http://www.w3.org/2000/svg" width="149" height="297" viewBox="0 0 149 297" fill="none" data-inject-url="http://127.0.0.1:5500/skillgro-html/assets/img/others/h5_footer_shape05.svg" className="injectable">
                  <path d="M6.68393 1.59054C17.3726 27.3157 44.6727 47.975 45.5164 74.5472C45.8181 84.7251 41.9119 94.1092 37.6106 102.83C28.8057 120.445 17.7043 136.826 10.2968 155.245C2.78804 173.752 -0.933565 195.021 5.08664 215.732C10.9123 235.808 25.4973 253.161 41.4161 267.559C54.2504 279.193 68.9028 289.664 84.9267 293.333C108.962 298.939 132.25 288.527 148.169 272.215C164.088 255.903 173.933 234.582 183.875 213.579" stroke="#4B4889" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeDasharray="10.48 10.48"></path>
               </svg>
            </div>
         </div>
      </footer>
   )
}

export default FooterThree
