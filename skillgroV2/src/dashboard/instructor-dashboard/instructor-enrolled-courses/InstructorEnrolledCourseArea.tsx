import DashboardBanner from "../../dashboard-common/DashboardBanner"
import DashboardSidebar from "../../dashboard-common/DashboardSidebar"
import InstructorEnrolledCourseContent from "./InstructorEnrolledCourseContent"

const InstructorEnrolledCourseArea = ({ style }: any) => {

  return (
    <section className="dashboard__area section-pb-120">
      <div className="container">
        <DashboardBanner />
        <div className="dashboard__inner-wrap">
          <div className="row">
            <DashboardSidebar />
            <InstructorEnrolledCourseContent style={style} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default InstructorEnrolledCourseArea
