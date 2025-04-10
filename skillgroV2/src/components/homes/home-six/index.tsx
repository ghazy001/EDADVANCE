import Banner from "./Banner"
import Choose from "./Choose"
import Courses from "./Courses"
import Faq from "./Faq"
import Counter from "../home-two/Counter"
import Blog from "./Blog"
import Testimonial from "./Testimonial"
import HeaderSix from "../../../layouts/headers/HeaderSix"
import FooterOne from "../../../layouts/footers/FooterOne"
import Categories from "./Categories"

const HomeSix = () => {
   return (
      <>
         <HeaderSix />
         <main className="main-area fix">
            <Banner />
            <Categories />
            <Choose />
            <Courses />
            <Faq />
            <Testimonial />
            <Counter style={true} />
            <Blog />
         </main>
         <FooterOne style={false} style_2={true} />
      </>
   )
}

export default HomeSix
