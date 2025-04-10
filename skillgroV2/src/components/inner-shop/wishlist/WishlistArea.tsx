import { useDispatch } from "react-redux";
import UseWishlistInfo from "../../../hooks/UseWishlistInfo";
import { Link } from "react-router-dom";
import { addToCart } from "../../../redux/features/cartSlice";
import { removeFromWishlist } from "../../../redux/features/wishlistSlice";

const WishlistArea = () => {

   const { wishlistItems } = UseWishlistInfo();
   const dispatch = useDispatch();

   return (
      <div className="cart__area section-py-120">
         <div className="container">
            {wishlistItems.length === 0 ? (
               <div className="mb-30">
                  <div className="empty_bag text-center">
                     <p className="py-3">Your Wishlist is Empty</p>
                     <Link to={"/shop"}>
                        <button className="btn">Go To Shop</button>
                     </Link>
                  </div>
               </div>
            ) : (
               <div className="row justify-content-center">
                  <div className="col-lg-8">
                     <table className="table cart__table">
                        <thead>
                           <tr>
                              <th className="product__thumb">Images</th>
                              <th className="product__name">Product</th>
                              <th className="product__price">Price</th>
                              <th className="product__quantity">Add To Cart</th>
                              <th className="product__remove">Remove</th>
                           </tr>
                        </thead>
                        <tbody>
                           {wishlistItems.map((item: any) => (
                              <tr key={item.id}>
                                 <td className="product__thumb">
                                    <Link to={`/shop-details/${item.id}`}><img src={item.thumb} alt="cart" /></Link>
                                 </td>
                                 <td className="product__name">
                                    <Link to={`/shop-details/${item.id}`}>{item.title}</Link>
                                 </td>
                                 <td className="product__price">${item.price}.00</td>
                                 <td className="product__cart-btn">
                                    <button onClick={() => dispatch(addToCart(item))} className="btn">Add To Cart</button>
                                 </td>
                                 <td className="product__remove">
                                    <a onClick={() => dispatch(removeFromWishlist(item))} style={{ cursor: "pointer" }}>×</a>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export default WishlistArea;
