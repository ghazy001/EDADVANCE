import DashboardBreadcrumb from '../../../components/common/breadcrumb/DashboardBreadcrumb'
import FooterOne from '../../../layouts/footers/FooterOne'
import HeaderOne from '../../../layouts/headers/HeaderOne'
import InstructorHistoryArea from './InstructorHistoryArea'

const InstructorHistory = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <DashboardBreadcrumb />
            <InstructorHistoryArea />
         </main>
         <FooterOne />
      </>
   )
}

export default InstructorHistory
