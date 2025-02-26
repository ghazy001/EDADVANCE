import { Link } from "react-router-dom"

const FooterCommon = () => {
   return (
      <>
         <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="footer__widget">
               <div >
                 <img src="/assets/logo.png" alt="img" />
               </div>
               <div className="footer__content">
                  <p>Our e-learning platform delivers engaging courses and expert training for skill development.</p>
                  <ul className="list-wrap">
                     <li>Av.Fethi Zouhir,Cebalat Ben Ammar, Ariana</li>
                     <li>+216 70 586 027</li>
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
                     <li><Link to="/instructor-details">Become Teacher</Link></li>
                   
                     <li><Link to="/instructor-details">Instructor</Link></li>
                     
                  </ul>
               </div>
            </div>
         </div>
      </>
   )
}

export default FooterCommon
