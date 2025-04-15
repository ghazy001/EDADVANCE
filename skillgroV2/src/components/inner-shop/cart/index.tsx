import FooterOne from "../../../layouts/footers/FooterOne"
import HeaderOne from "../../../layouts/headers/HeaderOne"
import BreadcrumbOne from "../../common/breadcrumb/BreadcrumbOne"
import CartArea from "./CartArea"

const Cart = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne title="Cart" sub_title="Cart" />
            <CartArea />
         </main>
         <FooterOne style={false} style_2={false} />
      </>
   )
}

export default Cart
