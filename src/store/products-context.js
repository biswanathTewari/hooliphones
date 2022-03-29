import React from 'react'
import PropTypes from 'prop-types'
import { actions } from './'

const ProductsContext = React.createContext({})

const ProductsReducer = (state, action) => {
  switch (action.type) {
    case actions.fetchProductsStart:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case actions.fetchProductsSuccess:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      }
    case actions.fetchProductsFailure:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case actions.sortProducts:
      return {
        ...state,
        filters: {
          ...state.filters,
          sortBy: action.payload,
        },
      }

    case actions.togglefastDeliveryOnly:
      return {
        ...state,
        filters: {
          ...state.filters,
          fastDeliveryOnly: !state.filters.fastDeliveryOnly,
        },
      }

    case actions.toggleIncludeOutOfStock:
      return {
        ...state,
        filters: {
          ...state.filters,
          includeOutOfStock: !state.filters.includeOutOfStock,
        },
      }

    case actions.setPriceRange:
      return {
        ...state,
        filters: {
          ...state.filters,
          minPrice: action.payload.minPrice,
          maxPrice: action.payload.maxPrice,
        },
      }

    case actions.toggleProcessors:
      return {
        ...state,
        filters: {
          ...state.filters,
          processors: {
            ...state.filters.processors,
            [action.payload]: !state.filters.processors[action.payload],
            modified: true,
          },
        },
      }

    case actions.setRating:
      return {
        ...state,
        filters: {
          ...state.filters,
          rating: Number(action.payload),
        },
      }

    case actions.setSearch:
      return {
        ...state,
        filters: {
          ...state.filters,
          search: action.payload,
        },
      }

    case actions.resetFilters:
      return {
        ...state,
        filters: {
          sortBy: '',
          minPrice: 0,
          maxPrice: 200000,
          processors: {
            hooli: false,
            snapdragon: false,
            mediatek: false,
            modified: false,
          },
          rating: 0,
          fastDeliveryOnly: false,
          includeOutOfStock: true,
          search: '',
        },
      }

    default:
      return state
  }
}

const ProductsProvider = ({ children }) => {
  const [products, dispatchProducts] = React.useReducer(ProductsReducer, {
    products: [],
    isLoading: false,
    error: null,
    filters: {
      sortBy: '',
      minPrice: 0,
      maxPrice: 200000,
      processors: {
        hooli: false,
        snapdragon: false,
        mediatek: false,
        modified: false,
      },
      rating: 0,
      fastDeliveryOnly: false,
      includeOutOfStock: true,
      search: '',
    },
  })
  return (
    <ProductsContext.Provider value={{ ...products, dispatchProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

ProductsProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

const useProducts = () => React.useContext(ProductsContext)

export { ProductsProvider, useProducts }
