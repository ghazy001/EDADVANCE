import Banner from "./Banner"
import Features from "./Features"
import About from "./About"
import Cta from "./Cta"
import Categories from "./Categories"
import Blog from "./Blog"
import Course from "./Course"
import Testimonial from "./Testimonial"
import Newsletter from "./Newsletter"
import HeaderEight from "../../../layouts/headers/HeaderEight"
import FooterOne from "../../../layouts/footers/FooterOne"

const HomeEight = () => {
   return (
      <>
         <HeaderEight />
         <main className="main-area fix">
            <Banner />
            <Features />
            <Course />
            <About />
            <Cta />
            <Categories />
            <Testimonial />
            <Blog />
            <Newsletter />
         </main>
         <FooterOne style={false} style_2={true} />
      </>
   )
}

export default HomeEight
