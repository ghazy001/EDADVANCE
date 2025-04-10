import { Link } from "react-router-dom"
import categories_data from "../../../data/home-data/CategoriesData"
import BtnArrow from "../../../svg/BtnArrow"


const Categories = () => {
   return (
      <section className="categories-area-two section-pt-140 section-pb-110">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-6 col-md-8">
                  <div className="section__title mb-50 mb-xs-20">
                     <span className="sub-title">Top Search Categories</span>
                     <h2 className="title bold">Our Language categories</h2>
                  </div>
               </div>
               <div className="col-lg-6 col-md-4">
                  <div className="view-all-categories">
                     <Link to="/courses"><span>Browse All Categories</span><BtnArrow /></Link>
                  </div>
               </div>
            </div>

            <div className="row">
               {categories_data.filter((items) => items.page === "home_6").map((item) => (
                  <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6">
                     <div className="categories__item-two">
                        <Link to="/courses">
                           <div className="content">
                              <img src={item.icon} alt="img" />
                              <span className="name"><strong>{item.country}</strong>{item.course} Courses</span>
                           </div>
                           <div className="icon">
                              <i className="skillgro-next-2"></i>
                           </div>
                        </Link>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Categories
