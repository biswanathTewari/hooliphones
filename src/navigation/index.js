import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { LandingPage, LoginPage, SignupPage, ShopPage } from '../pages'
import { useUser } from '../store'

const PrivateRoutes = () => {
  return <div>Product list</div>
}
const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/cart" element={<LoginPage />} />
    </Routes>
  )
}

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<LandingPage />} />
      <Route path="/shop" element={<ShopPage />} />
    </Routes>
  )
}

const Navigation = () => {
  const { user } = useUser()
  return (
    <>
      <PublicRoutes />
      {user.isLoggedIn ? <PrivateRoutes /> : <AuthRoutes />}
    </>
  )
}

export default Navigation
