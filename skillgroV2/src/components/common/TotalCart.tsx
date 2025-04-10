import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const TotalCart = () => {
   const productItem = useSelector((state: RootState) => state.cart.cart);

   return (
      <>
         <span className="mini-cart-count">{productItem.length}</span>
      </>
   )
}

export default TotalCart
