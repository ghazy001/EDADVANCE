import { Link } from "react-router-dom";
import DashboardBannerTwo from "../../dashboard-common/DashboardBannerTwo";
import DashboardSidebarTwo from "../../dashboard-common/DashboardSidebarTwo";

const student_review_data: string[] = ["The Complete Graphic Design for Beginners", "The Complete Graphic Design for Beginners", "The Complete Graphic Design for Beginners", "The Complete Graphic Design for Beginners", "The Complete Graphic Design for Beginners", "The Complete Graphic Design for Beginners", "The Complete Graphic Design for Beginners", "The Complete Graphic Design for Beginners",];

const StudentReviewArea = () => {
   return (
      <section className="dashboard__area section-pb-120">
         <div className="container">
            <DashboardBannerTwo />
            <div className="dashboard__inner-wrap">
               <div className="row">
                  <DashboardSidebarTwo />
                  <div className="col-lg-9">
                     <div className="dashboard__content-wrap">
                        <div className="dashboard__content-title">
                           <h4 className="title">Reviews</h4>
                        </div>
                        <div className="row">
                           <div className="col-12">
                              <div className="dashboard__review-table">
                                 <table className="table table-borderless">
                                    <thead>
                                       <tr>
                                          <th>Course</th>
                                          <th>Feedback</th>
                                          <th>&nbsp;</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {student_review_data.map((item, i) => (
                                          <tr key={i}>
                                             <td>
                                                <Link to="/course-details">{item}</Link>
                                             </td>
                                             <td>
                                                <div className="review__wrap">
                                                   <div className="rating">
                                                      <i className="fas fa-star"></i>
                                                      <i className="fas fa-star"></i>
                                                      <i className="fas fa-star"></i>
                                                      <i className="fas fa-star"></i>
                                                      <i className="fas fa-star"></i>
                                                   </div>
                                                   <span>(3 Reviews)</span>
                                                </div>
                                                <p>Good</p>
                                             </td>
                                             <td>
                                                <div className="dashboard__review-action">
                                                   <Link to="#" title="Edit"><i className="skillgro-edit"></i></Link>
                                                   <Link to="#" title="Delete"><i className="skillgro-bin"></i></Link>
                                                </div>
                                             </td>
                                          </tr>
                                       ))}
                                    </tbody>
                                 </table>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default StudentReviewArea
