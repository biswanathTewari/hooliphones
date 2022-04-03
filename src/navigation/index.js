import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Mockman from 'mockman-js'

import AuthRoute from './AuthRoute'
import {
  LandingPage,
  LoginPage,
  SignupPage,
  ShopPage,
  CartPage,
  WishlistPage,
  ProductPage,
} from '../pages'

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/cart"
        element={
          <AuthRoute>
            <CartPage />
          </AuthRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <AuthRoute>
            <WishlistPage />
          </AuthRoute>
        }
      />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="mockapi" element={<Mockman />} />
    </Routes>
  )
}

export default Navigation
