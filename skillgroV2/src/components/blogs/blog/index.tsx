import FooterOne from "../../../layouts/footers/FooterOne"
import HeaderOne from "../../../layouts/headers/HeaderOne"
import BreadcrumbOne from "../../common/breadcrumb/BreadcrumbOne"
import BlogArea from "./BlogArea"

const Blog = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne title="Latest Right Sidebar" sub_title="Blogs" />
            <BlogArea style_1={false} />
         </main>
         <FooterOne style={false} style_2={true} />
      </>
   )
}

export default Blog

