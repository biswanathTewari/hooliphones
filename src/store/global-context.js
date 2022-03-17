import React from 'react'
import PropTypes from 'prop-types'
import { UserProvider } from './user-context'

const GlobalProvider = ({ children }) => {
  return <UserProvider>{children}</UserProvider>
}

GlobalProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export { GlobalProvider }
