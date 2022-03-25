import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'

import { useUser } from '../store'

const AuthRoute = ({ children }) => {
  const { isLoggedIn } = useUser()
  const location = useLocation()

  if (!isLoggedIn)
    return <Navigate to="/login" replace state={{ from: location }} />

  return children
}

AuthRoute.propTypes = {
  children: PropTypes.element.isRequired,
}

export default AuthRoute
