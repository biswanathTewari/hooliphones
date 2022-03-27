import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const VerticalCard = ({ product }) => {
  const { img, title, subtitle, price, prevPrice } = product
  return (
    <div className="card card-shadow">
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
        </div>
        <div className="card-btns">
          <a href="#" className="btn btn-primary mg-right1">
            Add to cart
          </a>
          <a href="#" className="btn btn-secondary">
            Buy now
          </a>
        </div>
      </div>
    </div>
  )
}

VerticalCard.propTypes = {
  product: PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    prevPrice: PropTypes.string.isRequired,
  }),
}

export default VerticalCard
