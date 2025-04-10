import FooterOne from "../../../../layouts/footers/FooterOne"
import HeaderOne from "../../../../layouts/headers/HeaderOne"
import BreadcrumbTwo from "../../../common/breadcrumb/BreadcrumbTwo"
import InstructorDetailsArea from "./InstructorDetailsArea"

const InstructorsDetails = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbTwo title="Robert Fox" sub_title="Instructors" />
            <InstructorDetailsArea />
         </main>
         <FooterOne style={false} style_2={false} />
      </>
   )
}

export default InstructorsDetails
