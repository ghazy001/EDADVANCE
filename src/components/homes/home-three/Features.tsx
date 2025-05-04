import feature_data from "../../../data/home-data/FeatureData"
import InjectableSvg from "../../../hooks/InjectableSvg"

const Features = () => {
   return (
      <section className="features__area-four section-pb-90">
         <div className="container">
            <div className="features__item-wrap-two">
               <div className="row justify-content-center">
                  {feature_data.filter((items) => items.page === "home_3").map((item) => (
                     <div key={item.id} className="col-lg-3 col-sm-6">
                        <div className="features__item-three">
                           <div className="features__icon-three">
                              <InjectableSvg src={item.icon_2 ? item.icon_2 : ""} className="injectable" alt="" />
                           </div>
                           <div className="features__content-three">
                              <h2 className="title">{item.title}</h2>
                              <p>{item.desc}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   )
}

export default Features
