import { Link } from "react-router-dom"
import instructor_data from "../../../data/home-data/InstructorData"

const Instructor = () => {
   return (
      <section className="instructor__area-five section-pt-140 section-pb-110">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8">
                  <div className="section__title text-center mb-45">
                     <span className="sub-title">Our Instructors</span>
                     <h2 className="title">Meet Our Expert Instructors</h2>
                     <p>Groove’s intuitive shared inbox makesteam members together prioritiz dIn this episode.Dorem ipsusitt amet consectur</p>
                  </div>
               </div>
            </div>
            
            <div className="row">
               {instructor_data.filter((items) => items.page === "home_4").map((item) => (
                  <div key={item.id} className="col-lg-3 col-sm-6">
                     <div className="instructor__item-four">
                        <div className="instructor__thumb-four">
                           <Link to="/instructor-details">
                              <img src={item.thumb} alt="img" />
                           </Link>
                        </div>
                        <div className="instructor__content-four">
                           <h2 className="title"><Link to="/instructor-details">{item.name}</Link></h2>
                           <span>{item.tag}</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Instructor
