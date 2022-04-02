import React from 'react'
import PropTypes from 'prop-types'
import { actions } from './'

const WishlistContext = React.createContext({})

const WishlistReducer = (state, action) => {
  switch (action.type) {
    case actions.fetchWishlist:
      return {
        ...state,
        isLoading: true,
      }
    case actions.fetchWishlistSuccess:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      }
    case actions.fetchWishlistFailure:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case actions.addToWishlist:
      return {
        ...state,
        products: [...state.products, action.payload],
      }
    case actions.removeFromWishlist:
      return {
        ...state,
        products: state.products.filter(
          product => product._id !== action.payload,
        ),
      }
    default:
      return state
  }
}

const WishlistProvider = ({ children }) => {
  const [wishlist, dispatchWishlist] = React.useReducer(WishlistReducer, {
    products: [],
    isLoading: false,
    error: null,
  })

  return (
    <WishlistContext.Provider value={{ ...wishlist, dispatchWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

WishlistProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

const useWishlist = () => React.useContext(WishlistContext)

export { WishlistProvider, useWishlist }
