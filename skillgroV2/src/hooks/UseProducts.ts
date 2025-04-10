import { useState } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../redux/features/productSlice";

const UseProducts = () => {
   const [products, setProducts] = useState(useSelector(selectProducts))
   return {
      products,
      setProducts
   }
}

export default UseProducts