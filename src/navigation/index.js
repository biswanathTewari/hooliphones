import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { LandingPage, LoginPage, SignupPage } from '../pages'
import { useUser } from '../store'

const LoggedInRoute = () => {
  return <div>Product list</div>
}
const LoggedOutRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/shop" element={<LoginPage />} />
      <Route path="/cart" element={<LoginPage />} />
    </Routes>
  )
}

const Navigation = () => {
  const { user } = useUser()
  return <>{user.isLoggedIn ? <LoggedInRoute /> : <LoggedOutRoutes />}</>
}

export default Navigation
