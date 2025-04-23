import DashboardBreadcrumb from '../../../../components/common/breadcrumb/DashboardBreadcrumb.tsx'
import FooterOne from '../../../../layouts/footers/FooterOne.tsx'
import HeaderOne from '../../../../layouts/headers/HeaderOne.tsx'
import InstructorEnrolledCourseArea from './InstructorEnrolledCourseArea.tsx'

const InstructorEnrolledCourse = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <DashboardBreadcrumb />
            <InstructorEnrolledCourseArea />
         </main>
         <FooterOne />
      </>
   )
}

export default InstructorEnrolledCourse
