import DashboardBreadcrumb from '../../../components/common/breadcrumb/DashboardBreadcrumb'
import FooterOne from '../../../layouts/footers/FooterOne'
import HeaderOne from '../../../layouts/headers/HeaderOne'
import InstructorAnalyseArea from './InstructorAnalyseArea'

const InstructorAnalyseMain = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
         <DashboardBreadcrumb />
         <InstructorAnalyseArea/>
         </main>
         <FooterOne />
      </>
   )
}

export default InstructorAnalyseMain
