import React from 'react'
import PropTypes from 'prop-types'
import { actions } from './'

const UserContext = React.createContext({
  isLoggedIn: false,
  userDetails: {},
})

const UserReducer = (state, action) => {
  switch (action.type) {
    case actions.login:
      return {
        ...state,
        isLoggedIn: true,
        userDetails: action.payload,
      }
    case actions.logout:
      return {
        ...state,
        isLoggedIn: false,
        userDetails: {},
      }
    default:
      return state
  }
}

const UserProvider = ({ children }) => {
  const [user, dispatchUser] = React.useReducer(UserReducer, {
    isLoggedIn: false,
    userDetails: {},
  })

  return (
    <UserContext.Provider value={{ ...user, dispatchUser }}>
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

const useUser = () => React.useContext(UserContext)

export { UserProvider, useUser }
