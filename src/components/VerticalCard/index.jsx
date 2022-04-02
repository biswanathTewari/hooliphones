import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { useCart } from '../../store'
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

const VerticalCard = ({ product, addToCart }) => {
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
  const { products: cartItems } = useCart()
  const price = cost.toLocaleString()
  const [isInCart, setIsInCart] = React.useState(false)

  const handleAddToCart = async e => {
    e.preventDefault()
    const res = await addToCart(product)
    if (res) setIsInCart(true)
  }

  const checkIfInCart = () => {
    if (cartItems.length === 0) return
    const cartItem = cartItems.find(item => item._id === _id)
    if (cartItem) {
      setIsInCart(true)
    }
  }

  React.useEffect(() => {
    checkIfInCart()
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
          <a href="#" className="btn-icon btn-icon-sm h6">
            <i className="fas fa-heart"></i>
          </a>
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
  addToCart: PropTypes.func.isRequired,
}

export default VerticalCard
