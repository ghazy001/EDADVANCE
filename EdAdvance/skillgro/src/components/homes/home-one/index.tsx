
import About from "./About"


import HeaderOne from "../../../layouts/headers/HeaderOne"

import FooterOne from "../../../layouts/footers/FooterOne"
import Categories from "./Categories"

const HomeOne = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
         <Categories />  
            <About />
             </main>
         <FooterOne style={false} style_2={false} />
      </>
   )
}

export default HomeOne
