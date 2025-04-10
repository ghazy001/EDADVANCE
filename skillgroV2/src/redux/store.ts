import { configureStore } from '@reduxjs/toolkit';
import courseSlice from './features/courseSlice';
import cartSlice from './features/cartSlice';
import productSlice from './features/productSlice';
import wishlistSlice from './features/wishlistSlice';

const store = configureStore({
    reducer: {
        courses: courseSlice,
        products: productSlice,
        cart: cartSlice,
        wishlist: wishlistSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
