import FooterOne from "../../../layouts/footers/FooterOne";
import HeaderOne from "../../../layouts/headers/HeaderOne";
import BreadcrumbOne from "../../common/breadcrumb/BreadcrumbOne";
import BlogArea from "../blog/BlogArea"

const BlogTwo = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne title="Blog Left Sidebar" sub_title="Blogs" />
            <BlogArea style_1={true} />
         </main>
         <FooterOne style={false} style_2={true}  />
      </>
   )
}

export default BlogTwo;

