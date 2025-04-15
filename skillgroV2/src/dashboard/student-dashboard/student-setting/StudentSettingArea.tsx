import DashboardBannerTwo from "../../dashboard-common/DashboardBannerTwo"
import DashboardSidebarTwo from "../../dashboard-common/DashboardSidebarTwo"
import InstructorSettingContent from "../../instructor-dashboard/instructor-setting/InstructorSettingContent"

const StudentSettingArea = () => {
   return (
      <section className="dashboard__area section-pb-120">
         <div className="container">
            <DashboardBannerTwo />
            <div className="dashboard__inner-wrap">
               <div className="row">
                  <DashboardSidebarTwo />
                  <InstructorSettingContent style={true} />
               </div>
            </div>
         </div>
      </section>
   )
}

export default StudentSettingArea
