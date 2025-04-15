import DashboardBanner from "../../dashboard-common/DashboardBanner"
import DashboardSidebar from "../../dashboard-common/DashboardSidebar"
import InstructorProfileContent from "./InstructorProfileContent"

const InstructorProfileArea = () => {
   return (
      <section className="dashboard__area section-pb-120">
         <div className="container">
            <DashboardBanner />
            <div className="dashboard__inner-wrap">
               <div className="row">
                  <DashboardSidebar />
                  <InstructorProfileContent />
               </div>
            </div>
         </div>
      </section>
   )
}

export default InstructorProfileArea
