import Banner from "./Banner"
import Features from "./Features"
import About from "./About"
import Courses from "./Courses"
import Faq from "./Faq"
import Instructor from "./Instructor"
import Blog from "./Blog"
import Testimonial from "./Testimonial"
import HeaderFive from "../../../layouts/headers/HeaderFive"
import FooterThree from "../../../layouts/footers/FooterThree"

const HomeFive = () => {
   return (
      <>
         <HeaderFive />
         <main className="main-area fix">
            <Banner />
            <Features />
            <About/>
            <Courses />
            <Faq />
            <Instructor />
            <Testimonial />
            <Blog />
         </main>
         <FooterThree />
      </>
   )
}

export default HomeFive
