import DashboardBreadcrumb from '../../../components/common/breadcrumb/DashboardBreadcrumb'
import FooterOne from '../../../layouts/footers/FooterOne'
import HeaderOne from '../../../layouts/headers/HeaderOne'
import StudentHistoryArea from './StudentHistoryArea'

const StudentHistory = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <DashboardBreadcrumb />
            <StudentHistoryArea />
         </main>
         <FooterOne />
      </>
   )
}

export default StudentHistory

