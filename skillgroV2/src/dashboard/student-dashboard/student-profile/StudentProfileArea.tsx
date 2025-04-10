import DashboardBannerTwo from "../../dashboard-common/DashboardBannerTwo"
import DashboardSidebarTwo from "../../dashboard-common/DashboardSidebarTwo"
import InstructorProfileContent from "../../instructor-dashboard/profile/InstructorProfileContent"

const StudentProfileArea = () => {
   return (
      <section className="dashboard__area section-pb-120">
         <div className="container">
            <DashboardBannerTwo />
            <div className="dashboard__inner-wrap">
               <div className="row">
                  <DashboardSidebarTwo />
                  <InstructorProfileContent style={true} />
               </div>
            </div>
         </div>
      </section>
   )
}

export default StudentProfileArea
