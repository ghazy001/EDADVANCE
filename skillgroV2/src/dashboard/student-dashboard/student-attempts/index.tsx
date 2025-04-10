import DashboardBreadcrumb from '../../../components/common/breadcrumb/DashboardBreadcrumb'
import FooterOne from '../../../layouts/footers/FooterOne'
import HeaderOne from '../../../layouts/headers/HeaderOne'
import StudentAttemptsArea from './StudentAttemptsArea'

const StudentAttempts = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <DashboardBreadcrumb />
            <StudentAttemptsArea />
         </main>
         <FooterOne />
      </>
   )
}

export default StudentAttempts

