interface DataType {
   id: number;
   title: string;
   desc: string;
   class_name?: string;
};

const faq_data: DataType[] = [
   {
      id: 1,
      title: "Well Trained Professionals",
      desc: "Sorem ipsum dolor sit amet consectur adipiscing elit sed eius mod nt labore dolore magna aliquaenim ad minim sorem ipsum dolor sit amet consectur adipiscing elit sed eius modam.",
   },
   {
      id: 2,
      title: "Flexible Class Plans",
      class_name: "collapsed",
      desc: "Sorem ipsum dolor sit amet consectur adipiscing elit sed eius mod nt labore dolore magna aliquaenim ad minim sorem ipsum dolor sit amet consectur adipiscing elit sed eius modam.",
   },
   {
      id: 3,
      title: "Learn From Anywhere",
      class_name: "collapsed",
      desc: "Sorem ipsum dolor sit amet consectur adipiscing elit sed eius mod nt labore dolore magna aliquaenim ad minim sorem ipsum dolor sit amet consectur adipiscing elit sed eius modam.",
   },
];

const FaqOne = () => {
   return (
      <>
         <div className="section__title mb-15">
            <span className="sub-title">Faq’s</span>
            <h2 className="title bold">Why Our Schools are the Right Fit for Your Child?</h2>
         </div>
         <p>Groove’s intuitive shared inbox makes it easy for team members to organize, prioritize and.In this episod.</p>
         <div className="faq__wrap faq__wrap-two">
            <div className="accordion" id="accordionExample">
               {faq_data.map((item) => (
                  <div key={item.id} className="accordion-item">
                     <h2 className="accordion-header">
                        <button className={`accordion-button ${item.class_name}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${item.id}`} aria-expanded="true" aria-controls={`collapse${item.id}`}>
                           {item.title}
                        </button>
                     </h2>
                     <div id={`collapse${item.id}`} className={`accordion-collapse collapse ${item.id === 1 ? "show" : ""}`} data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                           <p>{item.desc}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </>
   )
}

export default FaqOne
