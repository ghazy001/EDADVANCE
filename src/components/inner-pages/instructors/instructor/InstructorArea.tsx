import { Link } from "react-router-dom"
import inner_instructor_data from "../../../../data/inner-data/InstructorData"

const InstructorArea = () => {
   return (
      <section className="instructor__area">
         <div className="container">
            <div className="row">
               {inner_instructor_data.filter((items) => items.page === "inner_1").map((item) => (
                  <div key={item.id} className="col-xl-4 col-sm-6">
                     <div className="instructor__item">
                        <div className="instructor__thumb">
                           <Link to="/instructor-details"><img src={item.thumb} alt="img" /></Link>
                        </div>
                        <div className="instructor__content">
                           <h2 className="title"><Link to="/instructor-details">{item.name}</Link></h2>
                           <span className="designation">{item.degisnation}</span>
                           <p className="avg-rating">
                              <i className="fas fa-star"></i>
                              (4.8 Ratings)
                           </p>
                           <div className="instructor__social">
                              <ul className="list-wrap">
                                 <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                                 <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                 <li><Link to="#"><i className="fab fa-whatsapp"></i></Link></li>
                                 <li><Link to="#"><i className="fab fa-instagram"></i></Link></li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default InstructorArea
