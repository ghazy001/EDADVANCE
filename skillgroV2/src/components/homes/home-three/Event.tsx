import { Link } from "react-router-dom"
import BtnArrow from "../../../svg/BtnArrow"
import event_data from "../../../data/home-data/EventData"

const Event = () => {
   return (
      <section className="event__area-three section-py-120">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-6">
                  <div className="section__title white-title mb-50">
                     <span className="sub-title">Upcoming Events</span>
                     <h2 className="title">Our Upcoming Varsity <br /> Events Nearly</h2>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="section__content mb-40">
                     <p>Groove’s intuitive shared inbox makesteam members together prioritize andIn this episode.Dorem ipsum dolor sitt amet consectur.</p>
                  </div>
               </div>
            </div>

            <div className="row">
               <div className="col-lg-5">
                  {event_data.filter((items) => items.page === "home_3").slice(0, 1).map((item) => (
                     <div key={item.id} className="event__item-two shine__animate-item">
                        <div className="event__thumb-two">
                           <Link to="/events-details" className="shine__animate-link"><img src={item.thumb} alt="img" /></Link>
                           <span className="event__date"><i className="flaticon-calendar"></i>{item.date}</span>
                        </div>
                        <div className="event__content-two">
                           <h2 className="title"><Link to="/events-details">{item.title}</Link></h2>
                           <p>{item.desc}</p>
                           <div className="event__meta-two">
                              <ul className="list-wrap">
                                 <li><i className="flaticon-placeholder"></i>{item.location}</li>
                                 <li><i className="skillgro-three-o-clock-clock"></i>{item.time}</li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="col-lg-7">
                  <div className="event__item-wrap-two">
                     {event_data.filter((items) => items.page === "home_3").slice(1, 3).map((item) => (
                        <div key={item.id} className="event__item-three shine__animate-item">
                           <div className="event__thumb-three">
                              <Link to="/events-details" className="shine__animate-link"><img src={item.thumb} alt="img" /></Link>
                           </div>
                           <div className="event__content-three">
                              <span className="event__date event__date-two"><i className="flaticon-calendar"></i>{item.date}</span>
                              <h2 className="title"><Link to="/events-details">{item.title}</Link></h2>
                              <p>{item.desc}</p>
                              <div className="event__meta-two">
                                 <ul className="list-wrap">
                                    <li><i className="flaticon-placeholder"></i>{item.location}</li>
                                    <li><i className="skillgro-three-o-clock-clock"></i>{item.time}</li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="event__bottom-content">
               <h6 className="title">The Latest Events from skillgrow
                  <Link to="/events">View All <BtnArrow /></Link>
               </h6>
            </div>
         </div>
         <div className="event__shape-wrap">
            <img src="/assets/img/events/h3_event_shape01.svg" alt="shape" data-aos="fade-right" data-aos-delay="200" />
            <img src="/assets/img/events/h3_event_shape02.svg" alt="shape" data-aos="fade-up-right" data-aos-delay="400" />
         </div>
      </section>
   )
}

export default Event
