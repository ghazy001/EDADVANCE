import { Link } from "react-router-dom"
import categories_data from "../../../data/home-data/CategoriesData"

const Categories = () => {
   return (
      <section className="categories-area-four fix section-pt-140 section-pb-110">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8">
                  <div className="section__title text-center mb-50">
                     <span className="sub-title">Top Search Categories</span>
                     <h2 className="title bold">Our Food categories</h2>
                  </div>
               </div>
            </div>
            <div className="row">
               {categories_data.filter((items) => items.page === "home_8").map((item) => (
                  <div key={item.id} className="col-lg-3 col-sm-6">
                     <div className="categories__item-four shine__animate-item">
                        <Link to="/courses" className="shine__animate-link">
                           <img src={item.icon} alt="img" />
                           <span className="name">{item.country} <strong>({item.course})</strong></span>
                        </Link>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <div className="categories__shape-wrap-two">
            <img src="/assets/img/categories/cat_shape01.svg" alt="shape" data-aos="fade-down-right" data-aos-delay="400" />
            <img src="/assets/img/categories/cat_shape02.svg" alt="shape" data-aos="fade-up-left" data-aos-delay="400" />
         </div>
      </section>
   )
}

export default Categories
