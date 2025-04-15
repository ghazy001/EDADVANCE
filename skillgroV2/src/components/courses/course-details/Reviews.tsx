interface DataType {
   id: number;
   rating: number;
   width: string;
   review: string;
};

const review_data: DataType[] = [
   {
      id: 1,
      rating: 5,
      width: "80",
      review: "2",
   },
   {
      id: 2,
      rating: 4,
      width: "50",
      review: "1",
   },
   {
      id: 3,
      rating: 3,
      width: "0",
      review: "0",
   },
   {
      id: 4,
      rating: 2,
      width: "0",
      review: "0",
   },
   {
      id: 5,
      rating: 1,
      width: "0",
      review: "0",
   },
];

const Reviews = () => {
   return (
      <div className="courses__rating-wrap">
         <h2 className="title">Reviews</h2>
         <div className="course-rate">
            <div className="course-rate__summary">
               <div className="course-rate__summary-value">4.8</div>
               <div className="course-rate__summary-stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
               </div>
               <div className="course-rate__summary-text">
                  12 Ratings
               </div>
            </div>
            <div className="course-rate__details">
               {review_data.map((item) => (
                  <div key={item.id} className="course-rate__details-row">
                     <div className="course-rate__details-row-star">
                        {item.rating}
                        <i className="fas fa-star"></i>
                     </div>
                     <div className="course-rate__details-row-value">
                        <div className="rating-gray"></div>
                        <div className="rating" style={{ width: `${item.width}%` }} title="80%"></div>
                        <span className="rating-count">{item.review}</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         
         <div className="course-review-head">
            <div className="review-author-thumb">
               <img src="/assets/img/courses/review-author.png" alt="img" />
            </div>
            <div className="review-author-content">
               <div className="author-name">
                  <h5 className="name">Jura Hujaor <span>2 Days ago</span></h5>
                  <div className="author-rating">
                     <i className="fas fa-star"></i>
                     <i className="fas fa-star"></i>
                     <i className="fas fa-star"></i>
                     <i className="fas fa-star"></i>
                     <i className="fas fa-star"></i>
                  </div>
               </div>
               <h4 className="title">The best LMS Design System</h4>
               <p>Maximus ligula eleifend id nisl quis interdum. Sed malesuada tortor non turpis semper bibendum nisi porta, malesuada risus nonerviverra dolor. Vestibulum ante ipsum primis in faucibus.</p>
            </div>
         </div>
      </div>
   )
}

export default Reviews
