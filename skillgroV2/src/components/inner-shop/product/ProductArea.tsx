import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { Rating } from 'react-simple-star-rating';
import ProductTop from "./ProductTop";
import ProductSidebar from "./ProductSidebar";
import UseProducts from "../../../hooks/UseProducts";
import { addToCart } from "../../../redux/features/cartSlice";
import { addToWishlist } from "../../../redux/features/wishlistSlice";
import { Link } from "react-router-dom";
import { Product } from "../../../redux/features/productSlice";

const ProductArea = () => {
   const { products, setProducts } = UseProducts();
   const dispatch = useDispatch();

   const itemsPerPage = 9;
   const [itemOffset, setItemOffset] = useState(0);
   const endOffset = itemOffset + itemsPerPage;
   const currentItems = products.slice(itemOffset, endOffset);
   const pageCount = Math.ceil(products.length / itemsPerPage);

   const startOffset = itemOffset + 1;
   const totalItems = products.length;

   useEffect(() => {}, [products]);

   const handlePageClick = (event: { selected: number }) => {
      const newOffset = (event.selected * itemsPerPage) % products.length;
      setItemOffset(newOffset);
   };

   // Add to cart
   const handleAddToCart = (item: Product) => {
      dispatch(addToCart(item));
   };

   // Add to wishlist
   const handleAddToWishlist = (item: Product) => {
      dispatch(addToWishlist(item));
   };

   return (
      <section className="shop-area section-py-120">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-9 col-lg-8 order-0 order-lg-2">
                  <ProductTop
                     startOffset={startOffset}
                     endOffset={Math.min(endOffset, totalItems)}
                     totalItems={totalItems}
                     setProducts={setProducts}
                  />
                  <div className="shop-item-wrap">
                     <div className="row">
                        {currentItems.length === 0 ? (
                           <div className="col-12">
                              <p>No products found matching your selection.</p>
                           </div>
                        ) : (
                           currentItems.map((item) => (
                              <div key={item.id} className="col-xl-4 col-sm-6">
                                 <div className="shop-item">
                                    <div className="shop-thumb">
                                       <Link to={`/shop-details/${item.id}`}>
                                          <img src={item.thumb} alt="img" />
                                       </Link>
                                       {item.tag && <span className="flash-sale">{item.tag}</span>}
                                       {item.hot_product && <span className="flash-sale hot">{item.hot_product}</span>}
                                       <ul className="list-wrap shop-action">
                                          <li><a onClick={() => handleAddToCart(item)} className="cart-btn-add" style={{ cursor: "pointer" }}><i className="fas fa-shopping-cart"></i></a></li>
                                          <li><a onClick={() => handleAddToWishlist(item)} className="cart-btn-add" style={{ cursor: "pointer" }}><i className="far fa-heart"></i></a></li>
                                          <li><Link to={`/shop-details/${item.id}`}><i className="far fa-eye"></i></Link></li>
                                       </ul>
                                    </div>
                                    <div className="shop-content">
                                       <h3 className="title"><Link to={`/shop-details/${item.id}`}>{item.title}</Link></h3>
                                       <div className="rating">
                                          <Rating initialValue={item.rating} size={20} readonly={true} />
                                          <span className="avg">({item.rating})</span>
                                       </div>
                                       <h4 className="price">${item.price}.00{item.old_price && <del>${item.old_price}.00</del>}</h4>
                                    </div>
                                 </div>
                              </div>
                           ))
                        )}
                     </div>
                  </div>
                  <nav className="pagination__wrap mt-40">
                     <ReactPaginate
                        breakLabel="..."
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        renderOnZeroPageCount={null}
                        className="list-wrap"
                     />
                  </nav>
               </div>
               <ProductSidebar setProducts={setProducts} />
            </div>
         </div>
      </section>
   );
};

export default ProductArea;
