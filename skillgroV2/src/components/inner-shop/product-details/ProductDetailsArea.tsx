import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import Reviews from "./Reviews";
import RelatedProduct from "./RelatedProduct";
import { addToCart, decrease_quantity } from "../../../redux/features/cartSlice";
import { RootState } from "../../../redux/store";
import { Product } from "../../../redux/features/productSlice";
import { Link } from "react-router-dom";

const nav_data: string[] = [
   "/assets/img/shop/shop_img01.jpg",
   "/assets/img/shop/shop_img02.jpg",
   "/assets/img/shop/shop_img03.jpg"];

const ProductDetailsArea = ({ single_product }: any) => {

   const [currentImageIndex, setCurrentImageIndex] = useState(0);

   const productItem = useSelector((state: RootState) => state.cart.cart);
   const dispatch = useDispatch();

   const handleAddToCart = (item: Product) => {
      dispatch(addToCart(item));
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
   };

   const totalItems = productItem.find((d_item: any) => d_item?.id === single_product?.id)

   return (
      <section className="shop-details-area section-pt-120 section-pb-90">
         <div className="container">
            <div className="row">
               <div className="col-xl-5 col-lg-6">
                  <div className="shop-details-images-wrap d-flex gap-3">
                     <ul className="nav nav-tabs" id="myTab" role="tablist">
                        {nav_data.map((img, index) => (
                           <li key={index} className="nav-item" role="presentation">
                              <button onClick={() => setCurrentImageIndex(index)}
                                 className={`nav-link ${index === currentImageIndex ? 'active' : ''}`}>
                                 <img src={img} alt="bemet" />
                              </button>
                           </li>
                        ))}
                     </ul>
                     <div className="tab-content" id="myTabContent">
                        {nav_data.map((img, index) => (
                           <div key={index} className={`tab-pane fade ${index === currentImageIndex ? 'show active' : ''}`} id={`item${index}`}>
                              <a className="popup-image">
                                 <img src={img} alt="bemet" />
                              </a>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="col-xl-7 col-lg-6">
                  <div className="shop-details-content">
                     <h2 className="title">{single_product?.title ? single_product.title : "Garden Adeline Life"}</h2>
                     <div className="product-review">
                        <div className="rating">
                           <Rating initialValue={single_product?.rating ? single_product.rating : 5} size={18} readonly={true} />
                        </div>
                        <span>{single_product?.title ? `( Reviews ${single_product.rating} )` : "( Reviews 5.0 )"}</span>
                     </div>
                     <h3 className="price">${single_product?.price ? single_product.price : 13}.00</h3>
                     <p>Grursus mal suada faci lisis Lorem ipsum dolarorit more ametion consectetur Vesti at bulum nec odio aea the dumm summ ipsum that dolocons rsus mal suada and fadolorit to the consectetur elit.</p>
                     <div className="shop-details-qty">
                        <div className="cart-plus-minus">
                           <input type="text" onChange={handleSubmit} value={totalItems?.quantity ? totalItems?.quantity : 1} readOnly />
                           <div onClick={() => single_product ? dispatch(decrease_quantity(single_product)) : ""} className="dec qtybutton">-</div>
                           <div onClick={() => single_product ? dispatch(addToCart(single_product)) : ""} className="inc qtybutton">+</div>
                        </div>
                        <a style={{ cursor: "pointer" }} onClick={() => single_product ? handleAddToCart(single_product) : ""} className="cart-btn btn">Add To Cart</a>
                        <Link to="/shop-details" className="wishlist-btn"><i className="far fa-heart"></i></Link>
                     </div>
                     <div className="shop-details-bottom">
                        <ul className="list-wrap">
                           <li className="sd-sku">
                              <span className="title">SKU:</span>
                              <span className="code">#CDP21</span>
                           </li>
                           <li className="sd-category">
                              <span className="title">Categories:</span>
                              <Link to="/shop-details">{single_product?.category ? single_product.category : "Business & Marketing"}</Link>
                           </li>
                           <li className="sd-tag">
                              <span className="title">Tags:</span>
                              <Link to="/shop-details">Coaching,</Link>
                              <Link to="/shop-details">Education</Link>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            <Reviews />
            <RelatedProduct />
         </div>
      </section>
   )
}

export default ProductDetailsArea
