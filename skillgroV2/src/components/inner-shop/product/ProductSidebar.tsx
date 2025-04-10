import { useState } from "react";
import { useSelector } from "react-redux";
import { Rating } from 'react-simple-star-rating';
import { selectProducts } from "../../../redux/features/productSlice";

interface FilterCriteria {
   category: string;
   language: string;
   price: string;
   rating: number | null;
}

const ProductSidebar = ({ setProducts }: any) => {

   const [showMoreCategory, setShowMoreCategory] = useState(false);
   const [showMoreLanguage, setShowMoreLanguage] = useState(false);

   const [categorySelected, setCategorySelected] = useState('');
   const [languageSelected, setLanguageSelected] = useState('');
   const [priceSelected, setPriceSelected] = useState('');
   const [ratingSelected, setRatingSelected] = useState<number | null>(null);

   const categoryFilter = useSelector(selectProducts).map(product => product.category);
   const languageFilter = useSelector(selectProducts).map(product => product.language);
   const priceFilter = useSelector(selectProducts).map(product => product.price_type);

   const allCategory = ['All Category', ...new Set(categoryFilter)];
   const allLanguage = ['All Language', ...new Set(languageFilter)];
   const allPrice = ['All Price', ...new Set(priceFilter)];

   const allProducts = useSelector(selectProducts);

   // Handle category selection
   const handleCategory = (category: string) => {
      setCategorySelected(prevCategory => prevCategory === category ? '' : category);
      filterProducts({ category: category === categorySelected ? '' : category, language: languageSelected, price: priceSelected, rating: ratingSelected });
   };

   // Handle language selection
   const handleLanguage = (language: string) => {
      setLanguageSelected(prevLanguage => prevLanguage === language ? '' : language);
      filterProducts({ category: categorySelected, language: language === languageSelected ? '' : language, price: priceSelected, rating: ratingSelected });
   };

   // Handle price selection
   const handlePrice = (price: string) => {
      setPriceSelected(prevPrice => prevPrice === price ? '' : price);
      filterProducts({ category: categorySelected, language: languageSelected, price: price === priceSelected ? '' : price, rating: ratingSelected });
   };

   // Handle rating selection
   const handleRating = (rating: number) => {
      setRatingSelected(prevRating => prevRating === rating ? null : rating);
      filterProducts({ category: categorySelected, language: languageSelected, price: priceSelected, rating: rating === ratingSelected ? null : rating });
   };

   const filterProducts = ({ category, language, price, rating }: FilterCriteria) => {
      let filteredProducts = allProducts;

      if (category && category !== 'All Category') {
         filteredProducts = filteredProducts.filter(product => product.category === category);
      }

      if (language && language !== 'All Language') {
         filteredProducts = filteredProducts.filter(product => product.language === language);
      }

      if (price && price !== 'All Price') {
         filteredProducts = filteredProducts.filter(product => product.price_type === price);
      }

      if (rating !== null) {
         filteredProducts = filteredProducts.filter(product => product.rating === rating);
      }

      setProducts(filteredProducts);
   };

   const categoriesToShow = showMoreCategory ? allCategory : allCategory.slice(0, 8);
   const languageToShow = showMoreLanguage ? allLanguage : allLanguage.slice(0, 4);

   return (
      <div className="col-xl-3 col-lg-4">
         <aside className="courses__sidebar">
            {/* Categories Filter */}
            <div className="courses-widget">
               <h4 className="widget-title">Categories</h4>
               <div className="courses-cat-list">
                  <ul className="list-wrap">
                     {categoriesToShow.map((category, i) => (
                        <li key={i}>
                           <div onClick={() => handleCategory(category)} className="form-check">
                              <input className="form-check-input" type="checkbox" checked={category === categorySelected} readOnly id={`cat_${i}`} />
                              <label className="form-check-label" htmlFor={`cat_${i}`} onClick={() => handleCategory(category)}>{category}</label>
                           </div>
                        </li>
                     ))}
                  </ul>
                  <div className="show-more">
                     <a className={`show-more-btn ${showMoreCategory ? 'active' : ''}`} style={{ cursor: "pointer" }} onClick={() => setShowMoreCategory(!showMoreCategory)}>
                        {showMoreCategory ? "Show Less -" : "Show More +"}
                     </a>
                  </div>
               </div>
            </div>

            {/* Language Filter */}
            <div className="courses-widget">
               <h4 className="widget-title">Languages</h4>
               <div className="courses-cat-list">
                  <ul className="list-wrap">
                     {languageToShow.map((language, i) => (
                        <li key={i}>
                           <div onClick={() => handleLanguage(language)} className="form-check">
                              <input className="form-check-input" type="checkbox" checked={language === languageSelected} readOnly id={`lang_${i}`} />
                              <label className="form-check-label" htmlFor={`lang_${i}`} onClick={() => handleLanguage(language)}>{language}</label>
                           </div>
                        </li>
                     ))}
                  </ul>
                  <div className="show-more">
                     <a className={`show-more-btn ${showMoreLanguage ? 'active' : ''}`} style={{ cursor: "pointer" }} onClick={() => setShowMoreLanguage(!showMoreLanguage)}>
                        {showMoreLanguage ? "Show Less -" : "Show More +"}
                     </a>
                  </div>
               </div>
            </div>

            {/* Price Filter */}
            <div className="courses-widget">
               <h4 className="widget-title">Price</h4>
               <div className="courses-cat-list">
                  <ul className="list-wrap">
                     {allPrice.map((price, i) => (
                        <li key={i}>
                           <div onClick={() => handlePrice(price)} className="form-check">
                              <input className="form-check-input" type="checkbox" checked={price === priceSelected} readOnly id={`price_${i}`} />
                              <label className="form-check-label" htmlFor={`price_${i}`} onClick={() => handlePrice(price)}>{price}</label>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Rating Filter */}
            <div className="courses-widget">
               <h4 className="widget-title">Ratings</h4>
               <div className="courses-rating-list">
                  <ul className="list-wrap">
                     {[5, 4, 3, 2, 1].map((rating, i) => (
                        <li key={i}>
                           <div onClick={() => handleRating(rating)} className="form-check">
                              <input className="form-check-input" type="checkbox" checked={rating === ratingSelected} readOnly id={`rating_${i}`} />
                              <label className="form-check-label" htmlFor={`rating_${i}`} onClick={() => handleRating(rating)}>
                                 <div className="rating">
                                    <Rating initialValue={rating} size={20} readonly />
                                 </div>
                              </label>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </aside>
      </div>
   );
}

export default ProductSidebar;
