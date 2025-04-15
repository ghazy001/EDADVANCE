import { useState } from "react"
import ReactPaginate from "react-paginate"
import inner_event_data from "../../../../data/inner-data/InnerEvent";
import { Link } from "react-router-dom";

interface PageChangeEvent {
   length: number;
   selected: number;
}
const EventArea = () => {

   const event = inner_event_data.filter(items => items.page === "inner_1");

   const itemsPerPage = 8;
   const [itemOffset, setItemOffset] = useState(0);
   const endOffset = itemOffset + itemsPerPage;
   const currentItems = event.slice(itemOffset, endOffset);
   const pageCount = Math.ceil(event.length / itemsPerPage);

   // Handle page change
   const handlePageClick = (event: PageChangeEvent) => {
      const newOffset = (event.selected * itemsPerPage) % event.length;
      setItemOffset(newOffset);
   };

   return (
      <section className="event__area-two section-py-120">
         <div className="container">
            <div className="event__inner-wrap">
               <div className="row justify-content-center">
                  {currentItems.filter((items) => items.page === "inner_1").map((item) => (
                     <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
                        <div className="event__item shine__animate-item">
                           <div className="event__item-thumb">
                              <Link to="/events-details" className="shine__animate-link"><img src={item.thumb} alt="img" /></Link>
                           </div>
                           <div className="event__item-content">
                              <span className="date">{item.date}</span>
                              <h2 className="title"><Link to="/events-details">{item.title}</Link></h2>
                              <Link to="https://maps.google.com/maps" className="location" target="_blank"><i className="flaticon-map"></i>{item.location}</Link>
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
   )
}

export default EventArea
