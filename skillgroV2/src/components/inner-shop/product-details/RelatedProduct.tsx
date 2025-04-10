import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Rating } from "react-simple-star-rating";
import { useDispatch } from "react-redux";
import { addToCart } from '../../../redux/features/cartSlice';
import product_data from '../../../data/inner-data/ProductData';
import { Link } from 'react-router-dom';

const setting = {
   slidesPerView: 4,
   spaceBetween: 30,
   observer: true,
   observeParents: true,
   loop: true,
   breakpoints: {
      '1500': {
         slidesPerView: 4,
      },
      '1200': {
         slidesPerView: 4,
      },
      '992': {
         slidesPerView: 3,
         spaceBetween: 24,
      },
      '768': {
         slidesPerView: 2,
         spaceBetween: 24,
      },
      '576': {
         slidesPerView: 2,
      },
      '0': {
         slidesPerView: 1,
      },
   },
};

const RelatedProduct = () => {

   const dispatch = useDispatch();

   const handleAddToCart = (item: any) => {
      dispatch(addToCart(item));
   };

   return (
      <div className="related-product-area">
         <div className="section__title mb-40">
            <h2 className="title">
               Related
               <span style={{ marginLeft: "10px" }} className="position-relative">
                  <svg x="0px" y="0px" preserveAspectRatio="none" viewBox="0 0 209 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M4.74438 7.70565C69.7006 -1.18799 136.097 -2.38304 203.934 4.1205C207.178 4.48495 209.422 7.14626 208.933 10.0534C206.793 23.6481 205.415 36.5704 204.801 48.8204C204.756 51.3291 202.246 53.5582 199.213 53.7955C136.093 59.7623 74.1922 60.5985 13.5091 56.3043C10.5653 56.0924 7.84371 53.7277 7.42158 51.0325C5.20725 38.2627 2.76333 25.6511 0.0898448 13.1978C-0.465589 10.5873 1.61173 8.1379 4.73327 7.70565"
                        fill="currentcolor" />
                  </svg>
                  products
               </span>
            </h2>
         </div>
         <Swiper {...setting} modules={[Autoplay]} className="swiper-container shop-active">
            {product_data.map((item) => (
               <SwiperSlide key={item.id} className="col-xl-4 col-sm-6">
                  <div className="shop-item">
                     <div className="shop-thumb">
                        <Link to={`/shop-details/${item.id}`}>
                           <img src={item.thumb} alt="img" />
                        </Link>
                        {item.tag && <span className="flash-sale">{item.tag}</span>}
                        {item.hot_product && <span className="flash-sale hot">{item.hot_product}</span>}
                        <ul className="list-wrap shop-action">
                           <li><a onClick={() => handleAddToCart(item)} style={{ cursor: "pointer" }}><i className="fas fa-shopping-cart"></i></a></li>
                           <li><a style={{ cursor: "pointer" }}><i className="far fa-heart"></i></a></li>
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
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   )
}

export default RelatedProduct
