import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EventDetailsSidebar from "./EventDetailsSidebar";

const EventDetailsArea = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/event/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'événement", error);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <div>Chargement...</div>;
  }

  return (
    <section className="event__details-area section-py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="event__details-thumb">
              {/* Garder le même code pour l'image */}
              <img src={`${event.thumb}`} alt="event" />
              
            </div>
            <div className="event__details-content-wrap">
              <div className="row">
                <div className="col-70">
                  <div className="event__details-content">
                    <div className="event__details-content-top">
                      {/* Affichage dynamique de la catégorie et des évaluations */}
                      <Link to={`/category/${event.category}`} className="tag">
                        {event.category}
                      </Link>
                      <span className="avg-rating">
                        <i className="fas fa-star"></i>({event.rating} Reviews)
                      </span>
                    </div>
                    <h2 className="title">{event.title}</h2>
                    <div className="event__meta">
                      <ul className="list-wrap">
                        <li className="author">
                          {/* Affichage dynamique de l'auteur */}
                          <img src="/assets/img/courses/course_author001.png" alt="author" />
                          By <Link to={`/instructor-details/${event.author.name}`}>{event.author.name}</Link>
                        </li>
                        <li className="location">
                          <i className="flaticon-placeholder"></i>
                          {event.location}
                        </li>
                        <li>
                          <i className="flaticon-calendar"></i>
                          {event.date}
                        </li>
                      </ul>
                    </div>
                    <div className="event__details-overview">
                      <h4 className="title-two">Event Overview</h4>
                      {/* Description dynamique de l'événement */}
                      <p>{event.description || "Aucune description fournie."}</p>
                    </div>

                   

                    <div className="event__details-inner mt-4">
                      <div className="row">
                        <div className="col-39">
                          {/* Garder le même code pour l'image secondaire */}
                          <img src={`${event.image2}`} alt="event" />
                        </div>
                        <div className="col-61">
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-30">
                <EventDetailsSidebar event={event} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsArea;
