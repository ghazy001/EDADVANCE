import { useState } from "react";
import { Link } from "react-router-dom";

const tab_title: string[] = ["Description", "Reviews"]

const Reviews = () => {

   const [activeTab, setActiveTab] = useState(0);

   const handleTabClick = (index: number) => {
      setActiveTab(index);
   };

   return (
      <div className="row">
         <div className="col-12">
            <div className="product-desc-wrap">
               <ul className="nav nav-tabs" id="myTab2" role="tablist">
                  {tab_title.map((tab, index) => (
                     <li key={index} onClick={() => handleTabClick(index)} className="nav-item" role="presentation">
                        <button className={`nav-link ${activeTab === index ? "active" : ""}`}>{tab}</button>
                     </li>
                  ))}
               </ul>
               <div className="tab-content" id="myTabContent2">
                  <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`} id="description-tab-pane" role="tabpanel" aria-labelledby="description-tab">
                     <p>Grursus mal suada faci lisis Lorem ipsum dolarorit more ametion consectetur elit. Vesti at bulum nec odio aea the dumm summ ipsum that dolocons rsus mal suada and fadolorit to the consectetur elit. y to follow tutorials, Exercises, and solutions. This course does start from the beginning with very little knowledge and gives a great overview of common tools used for data science and progresses into more.</p>
                  </div>
                  <div className={`tab-pane fade ${activeTab === 1 ? 'show active' : ''}`} id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab">
                     <div className="product-desc-review">
                        <div className="product-desc-review-title mb-15">
                           <h5 className="title">Customer Reviews (0)</h5>
                        </div>
                        <div className="left-rc">
                           <p>No reviews yet</p>
                        </div>
                        <div className="right-rc">
                           <Link to="#">Write a review</Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Reviews
