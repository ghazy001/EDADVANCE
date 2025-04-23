import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Link } from "react-router-dom";

interface EventItem {
  _id: string;
  thumb: string;
  date: string;
  title: string;
  location: string;
  page?: string; // facultatif si certains objets ne l'ont pas
}

const EventArea = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/event/getAll");

        console.log("Réponse API:", response.data); // Debug

        if (response.data.status === "SUCCESS") {
          setEvents(response.data.data); // pas de filtre ici
        } else {
          throw new Error(response.data.message || "Échec de récupération des événements");
        }
      } catch (error: any) {
        console.error("Erreur axios:", error);
        setError(
            error.response?.data?.message ||
            error.message ||
            "Erreur inconnue lors du chargement des événements"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = events.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(events.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % events.length;
    setItemOffset(newOffset);
  };

  if (loading) return <div>Chargement des événements...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
      <section className="event__area-two section-py-120">
        <div className="container">
          <div className="event__inner-wrap">
            <div className="row justify-content-center">
              {currentItems.map((item) => (
                  <div key={item._id} className="col-xl-3 col-lg-4 col-md-6">
                    <div className="event__item shine__animate-item">
                      <div className="event__item-thumb">
                        <Link to={`/events-details/${item._id}`} className="shine__animate-link">
                          <img src={item.thumb} alt="event" />
                        </Link>
                      </div>
                      <div className="event__item-content">
                        <span className="date">{item.date}</span>
                        <h2 className="title">
                          <Link to={`/events-details/${item._id}`}>{item.title}</Link>
                        </h2>
                        <Link
                            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location)}`}
                            className="location"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                          <i className="flaticon-map"></i> {item.location}
                        </Link>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
            <nav className="pagination__wrap mt-30">
              <ReactPaginate
                  breakLabel="..."
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  pageCount={pageCount}
                  renderOnZeroPageCount={null}
                  className="list-wrap"
              />
            </nav>
          </div>
        </div>
      </section>
  );
};

export default EventArea;
