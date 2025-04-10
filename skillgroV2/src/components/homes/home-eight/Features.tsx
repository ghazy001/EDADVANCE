import feature_data from "../../../data/home-data/FeatureData"

const Features = () => {
   return (
      <section className="features__area-eight">
         <div className="container">
            <div className="row">
               {feature_data.filter((items) => items.page === "home_8").map((item) => (
                  <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
                     <div className="features__item-six features__item-seven">
                        <div className="features__icon-six features__icon-seven">
                           <i className={item.icon_2}></i>
                        </div>
                        <div className="features__content-six features__content-seven">
                           <h4 className="title">{item.title}</h4>
                           <span>{item.desc}</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Features
