import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EventDetailsSidebar from "./EventDetailsSidebar";

interface EventData {
  _id: string;
  title: string;
  description?: string;
  thumb: string;
  image2?: string;
  location: string;
  date: string;
  rating?: number;
  category?: string;
  author?: {
    name: string;
  };
}

const EventDetailsArea = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/event/${id}`);
        if (response.data.status === "SUCCESS") {
          setEvent(response.data.data);
        } else {
          throw new Error(response.data.message || "Erreur de chargement");
        }
      } catch (err: any) {
        console.error("Erreur lors de la récupération de l'événement", err);
        setError(err.response?.data?.message || err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!event) return <div>Aucun événement trouvé.</div>;

  return (
      <section className="event__details-area section-py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="event__details-thumb">
                {event.thumb && <img src={event.thumb} alt="event" />}
              </div>
              <div className="event__details-content-wrap">
                <div className="row">
                  <div className="col-70">
                    <div className="event__details-content">
                      <div className="event__details-content-top">
                        {event.category && (
                            <Link to={`/category/${event.category}`} className="tag">
                              {event.category}
                            </Link>
                        )}
                        {typeof event.rating === "number" && (
                            <span className="avg-rating">
                          <i className="fas fa-star"></i> ({event.rating} Reviews)
                        </span>
                        )}
                      </div>

                      <h2 className="title">{event.title}</h2>

                      <div className="event__meta">
                        <ul className="list-wrap">
                          {event.author?.name && (
                              <li className="author">
                                <img src="/assets/img/courses/course_author001.png" alt="author" />
                                By{" "}
                                <Link to={`/instructor-details/${event.author.name}`}>
                                  {event.author.name}
                                </Link>
                              </li>
                          )}
                          <li className="location">
                            <i className="flaticon-placeholder"></i> {event.location}
                          </li>
                          <li>
                            <i className="flaticon-calendar"></i> {event.date}
                          </li>
                        </ul>
                      </div>

                      <div className="event__details-overview">
                        <h4 className="title-two">Event Overview</h4>
                        <p>{event.description || "Aucune description fournie."}</p>
                      </div>

                      {event.image2 && (
                          <div className="event__details-inner mt-4">
                            <div className="row">
                              <div className="col-39">
                                <img src={event.image2} alt="event secondary" />
                              </div>
                              <div className="col-61">
                                {/* Contenu additionnel ici */}
                              </div>
                            </div>
                          </div>
                      )}
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
