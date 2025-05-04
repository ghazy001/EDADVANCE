import feature_data from "../../../data/home-data/FeatureData"

const Features = () => {
   return (
      <section className="features__area-five features__bg section-pt-120 section-pb-90" style={{ backgroundImage: `url(/assets/img/bg/features_bg.jpg)` }}>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-lg-8">
                  <div className="section__title text-center white-title mb-60">
                     <h2 className="title">Connecting Your Mind, Body <br /> and Spirit through</h2>
                     <p>We believe yoga can power transformation on and off the mat We are more than just yogis - we&apos;re mom&apos;s, <br /> home makers, yoga studio owners, epic yoga retreat hosts</p>
                  </div>
               </div>
            </div>
            <div className="row justify-content-center">
               <div className="col-xl-10">
                  <div className="row justify-content-center">
                     {feature_data.filter((items) => items.page === "home_4").map((item) => (
                        <div key={item.id} className="col-lg-4 col-md-6">
                           <div className="features__item-four">
                              <div className="features__icon-four">
                                 <img src={item.icon ? item.icon : ""} alt="" className="injectable" />
                              </div>
                              <div className="features__content-four">
                                 <h3 className="title">{item.title}</h3>
                                 <p>{item.desc}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
         <div className="features__shape-wrap">
            <img src="/assets/img/others/h4_features_shape01.svg" alt="shape" data-aos="fade-right" data-aos-delay="200" />
            <img src="/assets/img/others/h4_features_shape02.svg" alt="shape" data-aos="fade-left" data-aos-delay="200" />
         </div>
      </section>
   )
}

export default Features
