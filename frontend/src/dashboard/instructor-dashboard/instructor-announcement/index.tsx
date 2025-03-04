import DashboardBreadcrumb from '../../../components/common/breadcrumb/DashboardBreadcrumb'
import FooterOne from '../../../layouts/footers/FooterOne'
import HeaderOne from '../../../layouts/headers/HeaderOne'
import InstructorAnnouncementArea from './InstructorAnnouncementArea'

const InstructorAnnouncement = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <DashboardBreadcrumb />
            <InstructorAnnouncementArea />
         </main>
         <FooterOne />
      </>
   )
}

export default InstructorAnnouncement
