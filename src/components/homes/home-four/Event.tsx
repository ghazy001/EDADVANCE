import { Link } from "react-router-dom"
import event_data from "../../../data/home-data/EventData"

const Event = () => {
   return (

      <section className="event__area-four">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-5">
                  <div className="event__content-wrap">
                     <div className="section__title mb-20">
                        <span className="sub-title">Upcoming Events</span>
                        <h2 className="title">Our Upcoming yOGA Events Nearly</h2>
                     </div>
                     <p>Groove’s intuitive shared inbox makesteam members toge ther prioritize andIn this episode.Dorem ipsum dolor sitt amet consectur.</p>
                  </div>
               </div>

               <div className="col-lg-7">
                  <div className="event__item-wrap-three">
                     {event_data.filter((items) => items.page === "home_4").map((item) => (
                        <div key={item.id} className="event__item-four shine__animate-item">
                           <div className="event__thumb-four">
                              <Link to="/events-details" className="shine__animate-link"><img src={item.thumb} alt="img" /></Link>
                           </div>
                           <div className="event__content-three event__content-four">
                              <span className="event__date event__date-two"><i className="flaticon-calendar"></i>{item.date}</span>
                              <h2 className="title"><Link to="/events-details">{item.title}</Link></h2>
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
         </div>
         <div className="event__shape-two">
            <img src="/assets/img/events/h4_event_shape.svg" alt="shape" className="rotateme" />
         </div>
      </section>
   )
}

export default Event
