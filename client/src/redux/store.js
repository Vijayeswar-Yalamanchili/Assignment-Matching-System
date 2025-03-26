import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import adminDashboardReducer from './adminDashboardSlice.js'
import modalReducer from './modalSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
    adminDashboard: adminDashboardReducer,
    modal : modalReducer,
  },
})