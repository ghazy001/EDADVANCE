import DashboardBanner from "../../dashboard-common/DashboardBanner"
import DashboardCounter from "./DashboardCounter"
import DashboardReviewTable from "./DashboardReviewTable"
import { Link } from "react-router-dom"
import DashboardSidebar from "../../dashboard-common/DashboardSidebar"
import DashboardCourse from "../../dashboard-common/DashboardCourse"
import BtnArrow from "../../../svg/BtnArrow"

const DashboardHomeArea = () => {
   return (
      <section className="dashboard__area section-pb-120">
         <div className="container">
            <DashboardBanner />
            <div className="dashboard__inner-wrap">
               <div className="row">
                  <DashboardSidebar />
                  <div className="col-lg-9">
                     <div className="dashboard__count-wrap">
                        <div className="dashboard__content-title">
                           <h4 className="title">Dashboard</h4>
                        </div>
                        <div className="row">
                           <DashboardCounter />
                        </div>
                     </div>
                     <DashboardCourse />
                     <div className="dashboard__content-wrap">
                        <div className="dashboard__content-title">
                           <h4 className="title">My Courses</h4>
                        </div>
                        <div className="row">
                           <div className="col-12">
                              <div className="dashboard__review-table">
                                 <DashboardReviewTable />
                              </div>
                           </div>
                        </div>
                        <div className="load-more-btn text-center mt-20">
                           <Link to="#" className="link-btn">Browse All Course <BtnArrow /></Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default DashboardHomeArea
