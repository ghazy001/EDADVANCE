import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import products from '../../data/inner-data/ProductData';

export interface Product {
   popular: string;
   id: number;
   thumb: string;
   title: string;
   price: number;
   tag?: string;
   hot_product?: string;
   rating: number;
   old_price?: number;
   category: string;
   language: string;
   price_type: string;
   quantity: number;
}

interface ProductState {
   products: Product[];
   product: Product | null;
}

const initialState: ProductState = {
   products: products as Product[],
   product: null,
};

export const productSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {
      single_product: (state, action: PayloadAction<number>) => {
         state.product = state.products.find((p) => p.id === action.payload) || null;
      },
   },
});

export const { single_product } = productSlice.actions;

export const selectProducts = (state: { products: ProductState }) => state?.products?.products;
export const selectProduct = (state: { products: ProductState }) => state?.products?.product;

export default productSlice.reducer;
