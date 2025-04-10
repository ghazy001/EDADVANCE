import CheckOutForm from "./CheckOutForm"
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../../redux/store";
import UseCartInfo from "../../../hooks/UseCartInfo";
import { Link } from "react-router-dom";

const CheckOutArea = () => {

  const notify = () => toast("Order Submit");
  const productItem = useSelector((state: RootState) => state.cart.cart);
  const { total } = UseCartInfo();

  return (
    <div className="checkout__area section-py-120">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="coupon__code-wrap">
              <div className="coupon__code-info">
                <span><i className="far fa-bookmark"></i> Have a coupon?</span>
                <Link to="#" id="coupon-element">Click here to enter your code</Link>
              </div>
              <form onSubmit={(e) => e.preventDefault()} className="coupon__code-form">
                <p>If you have a coupon code, please apply it below.</p>
                <input type="text" placeholder="Coupon code" />
                <button type="submit" className="btn">Apply coupon</button>
              </form>
            </div>
          </div>

          <CheckOutForm />

          <div className="col-lg-5">
            <div className="order__info-wrap">
              <h2 className="title">YOUR ORDER</h2>
              <ul className="list-wrap">
                <li className="title">Product <span>Subtotal</span></li>
                {/* <!-- item list --> */}
                {productItem.map((add_item: any, add_index: any) =>
                  <li key={add_index}>
                    {add_item.title} <strong>{add_item.price.toFixed(2)} x {add_item.quantity}</strong>
                    <span>${add_item.quantity * add_item.price}</span>
                  </li>
                )}
                <li>Subtotal <span>${total.toFixed(2)}</span></li>
                <li>Total <span>${total.toFixed(2)}</span></li>
              </ul>
              <p>Sorry, it seems that there are no available payment methods for your state. Please contact us if you require assistance or wish to make alternate arrangements.</p>
              <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <Link to="#">privacy policy.</Link></p>
              <button onClick={notify} className="btn">Place order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOutArea
