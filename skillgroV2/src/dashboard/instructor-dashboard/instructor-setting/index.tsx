import DashboardBreadcrumb from '../../../components/common/breadcrumb/DashboardBreadcrumb'
import FooterOne from '../../../layouts/footers/FooterOne'
import HeaderOne from '../../../layouts/headers/HeaderOne'
import InstructorSettingArea from './InstructorSettingArea'

const InstructorSetting = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <DashboardBreadcrumb />
            <InstructorSettingArea />
         </main>
         <FooterOne />
      </>
   )
}

export default InstructorSetting
