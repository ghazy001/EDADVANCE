import DashboardBreadcrumb from '../../../components/common/breadcrumb/DashboardBreadcrumb'
import FooterOne from '../../../layouts/footers/FooterOne'
import HeaderOne from '../../../layouts/headers/HeaderOne'
import InstructorWishlistArea from './InstructorWishlistArea'

const InstructorWishlist = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <DashboardBreadcrumb />
            <InstructorWishlistArea />
         </main>
         <FooterOne />
      </>
   )
}

export default InstructorWishlist
