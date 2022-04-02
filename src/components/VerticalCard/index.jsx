import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  useCart,
  useWishlist,
  useUser,
  useGlobalState,
  actions,
} from '../../store'
import {
  addToCartService,
  addToWishlistService,
  removeFromWishlistService,
} from '../../services'
import './styles.scss'

const RatingDisplay = ({ rating }) => {
  return (
    <div className="card-rating my-1">
      {[...Array(5)].map((_, index) => (
        <>
          {index <= rating - 1 ? (
            <i className="fas fa-star"></i>
          ) : (
            <i className="far fa-star"></i>
          )}
        </>
      ))}
    </div>
  )
}

const VerticalCard = ({ product }) => {
  const {
    _id,
    img,
    title,
    subtitle,
    cost,
    prevPrice,
    stock,
    fastDeliveryOnly,
    rating,
  } = product
  const { products: cartItems, dispatchCart } = useCart()
  const { products: wishlist, dispatchWishlist } = useWishlist()
  const { isLoggedIn } = useUser()
  const { showToast } = useGlobalState()
  const price = cost.toLocaleString()
  const [isInCart, setIsInCart] = React.useState(false)
  const [isInWishlist, setIsInWishlist] = React.useState(false)

  const handleAddToCart = async e => {
    e.preventDefault()
    if (!isLoggedIn) {
      showToast({
        message: 'Please login to continue',
        type: 'failed',
      })
      return
    }

    try {
      await addToCartService(product)
      showToast({
        message: `${product.title} added to cart`,
        type: 'success',
      })
      dispatchCart({ type: actions.addToCart, payload: product })
      return setIsInCart(true)
    } catch {
      showToast({
        message: 'Oops! something went wrong, unable to add to cart :(',
        type: 'failed',
      })
      return
    }
  }

  const handleAddToWishlist = async e => {
    e.preventDefault()
    if (!isLoggedIn) {
      showToast({
        message: 'Please login to continue',
        type: 'failed',
      })
      return
    }

    try {
      await addToWishlistService(product)
      dispatchWishlist({ type: actions.addToWishlist, payload: product })
      return setIsInWishlist(true)
    } catch {
      showToast({
        message: 'Oops! something went wrong, unable to add to wishlist :(',
        type: 'failed',
      })
      return
    }
  }

  const handleRemoveFromWishlist = async product => {
    try {
      await removeFromWishlistService(product._id)
      dispatchWishlist({
        type: actions.removeFromWishlist,
        payload: _id,
      })
      return setIsInWishlist(false)
    } catch {
      showToast({
        message: 'Oops! something went wrong :(',
        type: 'failed',
      })
      return false
    }
  }

  const checkIfInCart = () => {
    if (cartItems.length === 0) return
    const cartItem = cartItems.find(item => item._id === _id)
    if (cartItem) {
      setIsInCart(true)
    }
  }

  const checkIfInWishlist = () => {
    if (wishlist.length === 0) return
    const wishlistItem = wishlist.find(item => item._id === _id)
    if (wishlistItem) {
      setIsInWishlist(true)
    }
  }

  React.useEffect(() => {
    checkIfInCart()
    checkIfInWishlist()
  }, [])

  return (
    <div className="card card-shadow">
      {fastDeliveryOnly && (
        <div className="card-badge">
          <p className="text-sm">
            <i className="fas fa-truck"></i> fast
          </p>
        </div>
      )}
      <div className="zoom-wrapper">
        <img
          src={img}
          alt="item"
          loading="lazy"
          className="img-responsive card-img zoom"
        />
      </div>

      <div className="card-info">
        <div className="card-title">
          <p className="h6 text-600">{title}</p>
          {isInWishlist ? (
            <a
              href="#"
              className="btn-icon btn-icon-sm h6"
              onClick={handleRemoveFromWishlist}
            >
              <i className="fas fa-heart"></i>
            </a>
          ) : (
            <a
              href="#"
              className="btn-icon btn-icon-sm h6"
              onClick={handleAddToWishlist}
            >
              <i className="far fa-heart"></i>
            </a>
          )}
        </div>
        <div className="card-subtitle">
          <p className="text-md">{subtitle}</p>
          <p className="text-rg">
            ₹{price}{' '}
            <span className="text-line-through text-tertiary text-rg mr-1">
              ₹{prevPrice}
            </span>
            <span className="text-secondary text-rg">10%</span>
          </p>
          <RatingDisplay rating={rating} />
        </div>
        <div className="card-btns">
          {isInCart ? (
            <Link to={`/cart`} className="btn btn-primary mg-right1">
              View cart
            </Link>
          ) : (
            <a
              href="#"
              className="btn btn-primary mg-right1"
              onClick={handleAddToCart}
            >
              Add to cart
            </a>
          )}
          <a href="#" className="btn btn-secondary">
            Buy now
          </a>
        </div>
      </div>

      {!stock > 0 && (
        <div className="card-text-overlay">
          <p className="h6">Out of stock</p>
        </div>
      )}
    </div>
  )
}

RatingDisplay.propTypes = {
  rating: PropTypes.number.isRequired,
}

VerticalCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    prevPrice: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    fastDeliveryOnly: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
  }),
}

export default VerticalCard
