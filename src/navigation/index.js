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
  ProfilePage,
} from '../pages'
import { useUser, actions } from '../store'
import { Storage } from '../utils'

const Navigation = () => {
  const { dispatchUser } = useUser()

  // rehydrate user from local storage
  const rehydrateUser = async () => {
    const token = await Storage.get('authToken')
    if (token) {
      const userDetails = await Storage.get('userDetails')
      dispatchUser({ type: actions.login, payload: userDetails })
    }
  }

  React.useEffect(() => {
    rehydrateUser()
  }, [])

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
      <Route
        path="/profile"
        element={
          <AuthRoute>
            <ProfilePage />
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
