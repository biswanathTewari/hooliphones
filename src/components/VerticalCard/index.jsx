import React from 'react'
import PropTypes from 'prop-types'

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
    img,
    title,
    subtitle,
    cost,
    prevPrice,
    stock,
    fastDeliveryOnly,
    rating,
  } = product

  const price = cost.toLocaleString()

  const handleAddToCart = e => {
    e.preventDefault()
    addToCart(product)
  }

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
          <a
            href="#"
            className="btn btn-primary mg-right1"
            onClick={handleAddToCart}
          >
            Add to cart
          </a>
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
