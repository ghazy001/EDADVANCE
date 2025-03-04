"use client"
import DashboardBanner from "../../dashboard-common/DashboardBanner"
import DashboardSidebar from "../../dashboard-common/DashboardSidebar"
import { Link } from "react-router-dom";
import { useState } from "react";
import instructor_reviewe_data from "../../../data/dashboard-data/InstructorReviewData";

const tab_title: string[] = ["Received", "Given",];

const instructor_review_2: string[] = ["The Complete Graphic Design for Beginners", "The Complete Graphic Design for Beginners", "The Complete Graphic Design for Beginners", "The Complete Graphic Design for Beginners", "The Complete Graphic Design for Beginners",]

const InstructorReviewArea = () => {

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };

  return (
    <section className="dashboard__area section-pb-120">
      <div className="container">
        <DashboardBanner />
        <div className="dashboard__inner-wrap">
          <div className="row">
            <DashboardSidebar />
            <div className="col-lg-9">
              <div className="dashboard__content-wrap">
                <div className="dashboard__content-title">
                  <h4 className="title">Reviews</h4>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="dashboard__nav-wrap">
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        {tab_title.map((tab, index) => (
                          <li key={index} onClick={() => handleTabClick(index)} className="nav-item" role="presentation">
                            <button className={`nav-link ${activeTab === index ? "active" : ""}`}>{tab}</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="tab-content" id="myTabContent">
                      <div className={`tab-pane fade ${activeTab === 0 ? "show active" : ""}`} id="itemOne-tab-pane" role="tabpanel" aria-labelledby="itemOne-tab" >
                        <div className="dashboard__review-table">
                          <table className="table table-borderless">
                            <thead>
                              <tr>
                                <th>Student</th>
                                <th>Date</th>
                                <th>Feedback</th>
                              </tr>
                            </thead>
                            <tbody>
                              {instructor_reviewe_data.map((item) => (
                                <tr key={item.id}>
                                  <td>
                                    <p>{item.name}</p>
                                  </td>
                                  <td>
                                    <p>{item.date}</p>
                                  </td>
                                  <td>
                                    <span className="course-feedback">
                                      Course:
                                      <Link to="/course-details">{item.course}</Link>
                                    </span>
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
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className={`tab-pane fade ${activeTab === 1 ? "show active" : ""}`} id="itemTwo-tab-pane" role="tabpanel" aria-labelledby="itemTwo-tab">
                        <div className="dashboard__review-table">
                          <table className="table table-borderless">
                            <thead>
                              <tr>
                                <th>Course Title</th>
                                <th>Review</th>
                                <th>&nbsp;</th>
                              </tr>
                            </thead>
                            <tbody>
                              {instructor_review_2.map((item, i) => (
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
        </div>
      </div>
    </section>
  )
}

export default InstructorReviewArea
