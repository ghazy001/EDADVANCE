import FooterOne from "../../../layouts/footers/FooterOne"
import HeaderOne from "../../../layouts/headers/HeaderOne"
import BreadcrumbOne from "../../common/breadcrumb/BreadcrumbOne"
import CheckOutArea from "./CheckOutArea"

const CheckOut = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne title="check-out" sub_title="check-out" />
            <CheckOutArea />
         </main>
         <FooterOne style={false} style_2={false} />
      </>
   )
}

export default CheckOut
