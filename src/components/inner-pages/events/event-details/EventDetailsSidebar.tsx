import { Link } from "react-router-dom";
import InjectableSvg from "../../../../hooks/InjectableSvg";
import BtnArrow from "../../../../svg/BtnArrow";

// Déclare l'interface pour le type Event
interface Event {
  date: string;
  studentCount: number;
  location: string;
}

const EventDetailsSidebar = ({ event }: { event: Event }) => {
  // Préparer la requête Google Maps avec l’adresse
  const locationQuery = encodeURIComponent(event.location || "New York");
  const mapSrc = `https://www.google.com/maps?q=${locationQuery}&output=embed`;

  return (
    <aside className="event__sidebar">
      <div className="event__widget">
        <div className="courses__details-sidebar">
          <div className="courses__cost-wrap">
            <span>Event Fee</span>
            <h2 className="title">Free</h2>
          </div>
          <div className="courses__information-wrap">
            <h5 className="title">Event Information:</h5>
            <ul className="list-wrap">
              <li>
                <img src="/assets/img/icons/calendar.svg" alt="img" className="injectable" />
                <InjectableSvg src="/assets/img/icons/calendar.svg" alt="Calendar" />
                Date
                <span>{event?.date || "N/A"}</span>
              </li>
              <li>
                <img src="/assets/img/icons/course_icon02.svg" alt="img" className="injectable" />
                Start Time
                <span>10.00am</span>
              </li>
              <li>
                <img src="/assets/img/icons/course_icon06.svg" alt="img" className="injectable" />
                Total Seat
                <span>{event?.studentCount || "N/A"}</span>
              </li>
            </ul>
          </div>
          <div className="courses__details-social">
            <h5 className="title">Share this event:</h5>
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
              <Link to="/contact" className="btn arrow-btn">Support <BtnArrow /></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="event__widget">
        <div className="event__map">
          <h4 className="title">Map</h4>
          <div className="map">
            <iframe
              src={mapSrc}
              style={{ border: "0", width: "100%", height: "300px" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default EventDetailsSidebar;
