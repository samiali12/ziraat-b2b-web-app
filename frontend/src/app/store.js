import { configureStore } from '@reduxjs/toolkit'
import authReducers from '../features/authFeatures/authSlice'

export default configureStore({
  reducer: {
    auth: authReducers,
  },
})