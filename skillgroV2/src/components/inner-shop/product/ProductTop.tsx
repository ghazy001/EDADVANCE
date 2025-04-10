import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { Product, selectProducts } from "../../../redux/features/productSlice";

interface ProductTopProps {
   startOffset: number;
   endOffset: number;
   totalItems: number;
   setProducts: (products: Product[]) => void;
}

const ProductTop = ({ startOffset, endOffset, totalItems, setProducts }: ProductTopProps) => {

   const allProducts = useSelector(selectProducts);
   const filteredAllProduct = allProducts
   const [selected, setSelected] = useState('');

   const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
      const select = event.target.value;
      setSelected(select);

      let sortedProducts = [...filteredAllProduct];

      switch (select) {
         case 'popular':
            sortedProducts = sortedProducts
               .filter(item => item.popular)
               .sort((a, b) => {
                  const aPopular = parseFloat(a.popular || "0");
                  const bPopular = parseFloat(b.popular || "0");
                  return bPopular - aPopular;
               });
            break;
         case 'price':
            sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
            break;
         case 'rating':
            sortedProducts = sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
         default:
            sortedProducts = filteredAllProduct;
            break;
      }
      setProducts(sortedProducts);
   };

   return (
      <div className="shop-top-wrap">
         <div className="row align-items-center">
            <div className="col-md-6 col-sm-7">
               <div className="shop-top-left">
                  <p>Showing {startOffset}-{endOffset} of {totalItems} Results</p>
               </div>
            </div>
            <div className="col-md-6 col-sm-5">
               <div className="shop-top-right">
                  <select onChange={selectHandler} value={selected} name="orderby" className="orderby">
                     <option value="">Default sorting</option>
                     <option value="popular">Sort by popularity</option>
                     <option value="price">Sort by price</option>
                     <option value="rating">Sort by rating</option>
                  </select>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProductTop;
