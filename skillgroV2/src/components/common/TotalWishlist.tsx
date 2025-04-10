import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const TotalWishlist = () => {
   const productItem = useSelector((state: RootState) => state.wishlist.wishlist);

   return (
      <>
         <span className="wishlist-count">{productItem.length}</span>
      </>
   );
}

export default TotalWishlist;
