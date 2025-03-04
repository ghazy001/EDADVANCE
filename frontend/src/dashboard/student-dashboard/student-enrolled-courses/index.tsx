import DashboardBreadcrumb from '../../../components/common/breadcrumb/DashboardBreadcrumb'
import FooterOne from '../../../layouts/footers/FooterOne'
import HeaderOne from '../../../layouts/headers/HeaderOne'
import StudentEnrolledCoursesArea from './StudentEnrolledCoursesArea'

const StudentEnrolledCourses = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <DashboardBreadcrumb />
            <StudentEnrolledCoursesArea />
         </main>
         <FooterOne />
      </>
   )
}

export default StudentEnrolledCourses
