import DashboardBannerTwo from "../../dashboard-common/DashboardBannerTwo"
import DashboardSidebarTwo from "../../dashboard-common/DashboardSidebarTwo"
import InstructorWishlistContent from "../../instructor-dashboard/instructor-wishlist/InstructorWishlistContent"

const StudentWishlistArea = () => {
   return (
      <section className="dashboard__area section-pb-120">
         <div className="container">
            <DashboardBannerTwo />
            <div className="dashboard__inner-wrap">
               <div className="row">
                  <DashboardSidebarTwo />
                  <InstructorWishlistContent />
               </div>
            </div>
         </div>
      </section>
   )
}

export default StudentWishlistArea
