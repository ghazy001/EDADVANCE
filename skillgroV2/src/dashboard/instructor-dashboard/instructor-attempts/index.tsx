import DashboardBreadcrumb from '../../../components/common/breadcrumb/DashboardBreadcrumb'
import FooterOne from '../../../layouts/footers/FooterOne'
import HeaderOne from '../../../layouts/headers/HeaderOne'
import InstructorAttemptsArea from './InstructorAttemptsArea'

const InstructorAttempts = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <DashboardBreadcrumb />
            <InstructorAttemptsArea />
         </main>
         <FooterOne />
      </>
   )
}

export default InstructorAttempts
