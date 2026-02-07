import { configureStore, createReducer } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/OrderSlice';
// import userReducer from '../features/user/Usermanagementslice';
import searchReducer from '../features/product/Searchslice';
import userManagementReducer from '../features/user/Usermanagementslice';
// import { Usermanagementslice } from '../features/user/Usermanagementslice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    userManagement: userManagementReducer,
    search: searchReducer
  },
});
