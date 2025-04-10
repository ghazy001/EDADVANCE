import FooterOne from "../../../layouts/footers/FooterOne"
import HeaderOne from "../../../layouts/headers/HeaderOne"
import ErrorArea from "./ErrorArea"

const NotFound = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <ErrorArea />
         </main>
         <FooterOne style={false} style_2={false} />
      </>
   )
}

export default NotFound

