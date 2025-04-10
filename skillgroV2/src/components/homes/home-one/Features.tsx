import feature_data from "../../../data/home-data/FeatureData";

const Features = () => {
   return (
      <section className="features__area">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6">
                  <div className="section__title white-title text-center mb-50">
                     <span className="sub-title">How We Start Journey</span>
                     <h2 className="title">Start your Learning Journey Today!</h2>
                     <p>Groove’s intuitive shared inbox makesteam members together <br /> organize, prioritize and.In this episode.</p>
                  </div>
               </div>
            </div>
            <div className="row justify-content-center">
               {feature_data.filter((items) => items.page === "home_1").map((item) => (
                  <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
                     <div className="features__item">
                        <div className="features__icon">
                           <img src={item.icon ? item.icon : ""} className="injectable" alt="img" />
                        </div>
                        <div className="features__content">
                           <h4 className="title">{item.title}</h4>
                           <p>{item.desc}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Features;
