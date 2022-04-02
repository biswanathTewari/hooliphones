import React from 'react'
import PropTypes from 'prop-types'
import { actions } from './'

const CartContext = React.createContext({})

const CartReducer = (state, action) => {
  switch (action.type) {
    case actions.fetchCart:
      return {
        ...state,
        isLoading: true,
      }
    case actions.fetchCartSuccess:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      }
    case actions.fetchCartFailure:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case actions.addToCart:
      return {
        ...state,
        products: [...state.products, action.payload],
      }
    case actions.removeFromCart:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.payload,
        ),
      }
    case actions.updateCart:
      return {
        ...state,
        products: state.products.map(product => {
          if (product.id === action.payload) {
            return {
              ...product,
              stock: action.payload.stock,
            }
          }
        }),
      }
    default:
      return state
  }
}

const CartProvider = ({ children }) => {
  const [cart, dispatchCart] = React.useReducer(CartReducer, {
    products: [],
    isLoading: false,
    error: null,
  })

  return (
    <CartContext.Provider value={{ ...cart, dispatchCart }}>
      {children}
    </CartContext.Provider>
  )
}

CartProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

const useCart = () => React.useContext(CartContext)

export { CartProvider, useCart }
