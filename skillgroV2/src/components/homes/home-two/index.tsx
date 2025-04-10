import Blog from "../home-one/Blog"
import CourseArea from "../home-one/CourseArea"
import InstructorTwo from "../home-one/InstructorTwo"
import About from "./About"
import Banner from "./Banner"
import Counter from "./Counter"
import EventArea from "./EventArea"
import Feature from "./Feature"
import Newsletter from "./Newsletter"
import WorkArea from "./WorkArea"
import Instructor from "./Instructor"
import HeaderTwo from "../../../layouts/headers/HeaderTwo"
import BrandOne from "../../common/brands/BrandOne"
import FooterOne from "../../../layouts/footers/FooterOne"

const HomeTwo = () => {
   return (
      <>
         <HeaderTwo />
         <main className="main-area fix">
            <Banner />
            <BrandOne style={true} />
            <Feature style={false} />
            <About />
            <CourseArea style={true} />
            <WorkArea />
            <Counter style={false} />
            <Instructor />
            <Newsletter />
            <EventArea />
            <Blog style={true} />
            <InstructorTwo style={true} />
         </main>
         <FooterOne style={false} style_2={false} />
      </>
   )
}

export default HomeTwo
