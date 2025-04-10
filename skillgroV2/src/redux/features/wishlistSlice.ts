import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { setLocalStorage, getLocalStorage } from "../../utils/localstorage";

export interface Product {
   id: number;
   title: string;
   thumb: string;
   price: number;
}

interface WishlistState {
   wishlist: Product[];
}

const initialState: WishlistState = {
   wishlist: getLocalStorage<Product>("wishlist") || [], // Load initial state from localStorage
};

const wishlistSlice = createSlice({
   name: "wishlist",
   initialState,
   reducers: {
      addToWishlist: (state, { payload }: PayloadAction<Product>) => {
         const productIndex = state.wishlist.findIndex((item) => item.id === payload.id);
         if (productIndex >= 0) {
            toast.info(`${payload.title} is already in your wishlist`, {
               position: "top-right",
            });
         } else {
            state.wishlist.push(payload);
            toast.success(`${payload.title} added to wishlist`, {
               position: "top-right",
            });
            setLocalStorage("wishlist", state.wishlist); // Save wishlist to localStorage
         }
      },
      removeFromWishlist: (state, { payload }: PayloadAction<Product>) => {
         state.wishlist = state.wishlist.filter((item) => item.id !== payload.id);
         toast.error(`Removed from your wishlist`, {
            position: "top-right",
         });
         setLocalStorage("wishlist", state.wishlist); // Update localStorage
      },
      clearWishlist: (state) => {
         state.wishlist = [];
         setLocalStorage("wishlist", state.wishlist); // Clear localStorage
      },
   },
});

export const {
   addToWishlist,
   removeFromWishlist,
   clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
