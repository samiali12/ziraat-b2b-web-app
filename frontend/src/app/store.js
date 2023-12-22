import { configureStore } from '@reduxjs/toolkit'
import authReducers from '../features/authFeatures/authSlice'
import productReducers from '../features/productCRUDFeatures/productCRUDSlice'
import userManageReducers from '../features/UserManagementFeatures/userManageSlice'
import searchProductsReducers from '../features/searchFeatures/searchSlice'
import cartReducers from '../features/cartFeatures/cartSlice'

export default configureStore({
  reducer: {
    auth: authReducers,
    product: productReducers,
    userManage: userManageReducers,
    searchProducts: searchProductsReducers,
    cart: cartReducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable SerializableStateInvariantMiddleware
    }),
})