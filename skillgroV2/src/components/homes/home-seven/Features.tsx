interface DataType {
   id: number;
   icon: string;
   title: string;
   tag: string;
}

const feature_data: DataType[] = [
   {
      id: 1,
      icon: "skillgro-profit",
      title: "Learn skills with 120k+",
      tag: "video courses.",
   },
   {
      id: 2,
      icon: "skillgro-instructor",
      title: "Choose courses",
      tag: "real-world experts.",
   },
   {
      id: 3,
      icon: "skillgro-tutorial",
      title: "processional Tutors",
      tag: "video courses.",
   },
   {
      id: 4,
      icon: "skillgro-graduated",
      title: "Online Degrees",
      tag: "Study flexibly online",
   },
];

const Features = () => {
   return (
      <section className="features__area-seven grey-bg-two">
         <div className="container">
            <div className="features__item-wrap-four">
               <div className="row">
                  {feature_data.map((item) => (
                     <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
                        <div className="features__item-six">
                           <div className="features__icon-six">
                              <i className={item.icon}></i>
                           </div>
                           <div className="features__content-six">
                              <h4 className="title">{item.title}</h4>
                              <span>{item.tag}</span>
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
