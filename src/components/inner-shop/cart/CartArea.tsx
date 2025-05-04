import { addToCart, clear_cart, decrease_quantity, remove_cart_product } from "../../../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import UseCartInfo from "../../../hooks/UseCartInfo";
import { RootState } from "../../../redux/store";
import { Link } from "react-router-dom";

const CartArea = () => {

   const productItem = useSelector((state: RootState) => state.cart.cart);
   const dispatch = useDispatch();
   const { total } = UseCartInfo();

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
   };

   return (
      <div className="cart__area section-py-120">
         <div className="container">
            {productItem.length === 0 ? (
               <div className="mb-30">
                  <div className="empty_bag text-center">
                     <p className="py-3">Your Bag is Empty</p>
                     <Link to="/shop">
                        <button className="btn">Go To Shop</button>
                     </Link>
                  </div>
               </div>
            ) : (
               <div className="row">
                  <div className="col-lg-8">
                     <table className="table cart__table">
                        <thead>
                           <tr>
                              <th className="product__thumb">&nbsp;</th>
                              <th className="product__name">Product</th>
                              <th className="product__price">Price</th>
                              <th className="product__quantity">Quantity</th>
                              <th className="product__subtotal">Subtotal</th>
                              <th className="product__remove">&nbsp;</th>
                           </tr>
                        </thead>
                        <tbody>
                           {productItem.map((item: any, i: any) => (
                              <tr key={i}>
                                 <td className="product__thumb">
                                    <Link to={`/shop-details/${item.id}`}>
                                       <img src={item.thumb} alt="cart" />
                                    </Link>
                                 </td>
                                 <td className="product__name">
                                    <Link to={`/shop-details/${item.id}`}>{item.title}</Link>
                                 </td>
                                 <td className="product__price">${item.price}.00</td>
                                 <td className="product__quantity">
                                    <div className="cart-plus-minus">
                                       <input type="text" onChange={handleSubmit} value={item.quantity} readOnly />
                                       <div onClick={() => dispatch(decrease_quantity(item))} className="dec qtybutton">-</div>
                                       <div onClick={() => dispatch(addToCart(item))} className="inc qtybutton">+</div>
                                    </div>
                                 </td>
                                 <td className="product__subtotal">${item.price * item.quantity}.00</td>
                                 <td className="product__remove">
                                    <a style={{ cursor: "pointer" }} onClick={() => dispatch(remove_cart_product(item))}>×</a>
                                 </td>
                              </tr>
                           ))}
                           <tr>
                              <td colSpan={6} className="cart__actions">
                                 <form onSubmit={(e) => e.preventDefault()} className="cart__actions-form">
                                    <input type="text" placeholder="Coupon code" />
                                    <button type="submit" className="btn">Apply coupon</button>
                                 </form>
                                 <div className="update__cart-btn text-end f-right">
                                    <button onClick={() => dispatch(clear_cart())} type="submit" className="btn">Clear cart</button>
                                 </div>
                              </td>
                           </tr>
                        </tbody>

                     </table>
                  </div>

                  <div className="col-lg-4">
                     <div className="cart__collaterals-wrap">
                        <h2 className="title">Cart totals</h2>
                        <ul className="list-wrap">
                           <li>Subtotal <span>${total.toFixed(2)}</span></li>
                           <li>Total <span className="amount">${total.toFixed(2)}</span></li>
                        </ul>
                        <Link to="/check-out" className="btn">Proceed to checkout</Link>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export default CartArea
