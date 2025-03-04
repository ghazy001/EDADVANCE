import DashboardBannerTwo from "../../dashboard-common/DashboardBannerTwo"
import DashboardSidebarTwo from "../../dashboard-common/DashboardSidebarTwo"
import InstructorAttemptsContent from "../../instructor-dashboard/instructor-attempts/InstructorAttemptsContent"

const StudentAttemptsArea = () => {
   return (
      <section className="dashboard__area section-pb-120">
         <div className="container">
            <DashboardBannerTwo />
            <div className="dashboard__inner-wrap">
               <div className="row">
                  <DashboardSidebarTwo />
                  <InstructorAttemptsContent />
               </div>
            </div>
         </div>
      </section>
   )
}

export default StudentAttemptsArea
