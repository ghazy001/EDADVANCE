import { Link } from "react-router-dom"
import InjectableSvg from "../../../../hooks/InjectableSvg"
import BtnArrow from "../../../../svg/BtnArrow"

const EventDetailsSidebar = () => {
   return (
      <aside className="event__sidebar">
         <div className="event__widget">
            <div className="courses__details-sidebar">
               <div className="courses__cost-wrap">
                  <span>Event Fee</span>
                  <h2 className="title">$19.00</h2>
               </div>
               <div className="courses__information-wrap">
                  <h5 className="title">Event Information:</h5>
                  <ul className="list-wrap">
                     <li>
                        <img src="/assets/img/icons/calendar.svg" alt="img" className="injectable" />
                        <InjectableSvg src="/assets/img/icons/calendar.svg" alt="Facebook" />
                        Date
                        <span>26/08/2024</span>
                     </li>
                     <li>
                        <img src="/assets/img/icons/course_icon02.svg" alt="img" className="injectable" />
                        Start Time
                        <span>10.00am</span>
                     </li>
                     <li>
                        <img src="/assets/img/icons/course_icon03.svg" alt="img" className="injectable" />
                        Topics
                        <span>12</span>
                     </li>
                     <li>
                        <img src="/assets/img/icons/course_icon04.svg" alt="img" className="injectable" />
                        Quizzes
                        <span>145</span>
                     </li>
                     <li>
                        <img src="/assets/img/icons/course_icon05.svg" alt="img" className="injectable" />
                        Certifications
                        <span>Yes</span>
                     </li>
                     <li>
                        <img src="/assets/img/icons/course_icon06.svg" alt="img" className="injectable" />
                        Total Seat
                        <span>300</span>
                     </li>
                  </ul>
               </div>
               <div className="courses__payment">
                  <h5 className="title">Secure Payment:</h5>
                  <img src="/assets/img/others/payment.png" alt="img" />
               </div>
               <div className="courses__details-social">
                  <h5 className="title">Share this course:</h5>
                  <ul className="list-wrap">
                     <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                     <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                     <li><Link to="#"><i className="fab fa-whatsapp"></i></Link></li>
                     <li><Link to="#"><i className="fab fa-instagram"></i></Link></li>
                     <li><Link to="#"><i className="fab fa-youtube"></i></Link></li>
                  </ul>
               </div>
               <div className="courses__details-enroll">
                  <div className="tg-button-wrap">
                     <Link to="/contact" className="btn arrow-btn">Join This Event <BtnArrow /></Link>
                  </div>
               </div>
            </div>
         </div>
         <div className="event__widget">
            <div className="event__map">
               <h4 className="title">Map</h4>
               <div className="map">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48409.69813174607!2d-74.05163325136718!3d40.68264649999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25bae694479a3%3A0xb9949385da52e69e!2sBarclays%20Center!5e0!3m2!1sen!2sbd!4v1684309529719!5m2!1sen!2sbd" style={{ border: "0" }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
               </div>
            </div>
         </div>
      </aside>
   )
}

export default EventDetailsSidebar
