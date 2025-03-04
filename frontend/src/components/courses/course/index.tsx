import FooterOne from "../../../layouts/footers/FooterOne"
import HeaderOne from "../../../layouts/headers/HeaderOne"
import BreadcrumbOne from "../../common/breadcrumb/BreadcrumbOne"
import CourseArea from "./CourseArea"

const Course = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne title="All Courses" sub_title="Courses" sub_title_2="" style={false} />
            <CourseArea />
         </main>
         <FooterOne style={false} style_2={true} />
      </>
   )
}

export default Course
