import { configureStore } from '@reduxjs/toolkit'
import authReducers from '../features/authFeatures/authSlice'
import productReducers from '../features/productCRUDFeatures/productCRUDSlice'

export default configureStore({
  reducer: {
    auth: authReducers,
    product: productReducers,
  },
})