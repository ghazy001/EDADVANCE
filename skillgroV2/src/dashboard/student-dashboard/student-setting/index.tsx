import DashboardBreadcrumb from '../../../components/common/breadcrumb/DashboardBreadcrumb'
import FooterOne from '../../../layouts/footers/FooterOne'
import HeaderOne from '../../../layouts/headers/HeaderOne'
import StudentSettingArea from './StudentSettingArea'

const StudentSetting = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <DashboardBreadcrumb />
            <StudentSettingArea />
         </main>
         <FooterOne />
      </>
   )
}

export default StudentSetting

