import FooterOne from "../../../layouts/footers/FooterOne"
import HeaderOne from "../../../layouts/headers/HeaderOne"



import About from "./About"
import Testimonial from "./Testimonial"

const AboutUs = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <About />
          
        
            <Testimonial />
         </main>
         <FooterOne style={false} style_2={false} />
      </>
   )
}

export default AboutUs
