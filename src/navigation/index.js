import React from 'react'
import { Routes, Route } from 'react-router-dom'

import AuthRoute from './AuthRoute'
import {
  LandingPage,
  LoginPage,
  SignupPage,
  ShopPage,
  CartPage,
} from '../pages'

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route
        path="/shop"
        element={
          <AuthRoute>
            <ShopPage />
          </AuthRoute>
        }
      />
    </Routes>
  )
}

export default Navigation
