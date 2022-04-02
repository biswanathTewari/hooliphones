import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const HorizontalCard = ({ product, removeItem, updateQty }) => {
  return (
    <div className="cart-card card-horizontal card-shadow">
      <div className="cart-zoom-wrapper">
        <img
          src={product.img}
          alt="item"
          loading="lazy"
          className="img-responsive card-img-horizontal zoom"
        />
      </div>

      <div className="card-info-horizontal">
        <div className="card-title">
          <p className="h6 text-600">{product.title}</p>
        </div>
        <div className="card-subtitle">
          <p className="text-md">{product.subtitle}</p>
          <div className="flex-row">
            <p className="text-rg mg-r-1">
              ₹{product.cost?.toLocaleString()}
              <span className="text-line-through text-tertiary text-rg mr-1">
                ₹{product.prevPrice}
              </span>
              <span className="text-secondary text-rg">10%</span>
            </p>
            <div className="quantity">
              <div
                className="btn-circle"
                onClick={() => updateQty(product, 'decrement')}
              >
                -
              </div>
              <input type="text" value={product.qty} />
              <div
                className="btn-circle"
                onClick={() => updateQty(product, 'increment')}
              >
                +
              </div>
            </div>
          </div>
        </div>
        <div className="card-btns">
          <a href="#" className="btn btn-primary mg-right1">
            save
          </a>
          <a
            href="#"
            className="btn btn-secondary"
            onClick={() => removeItem(product._id)}
          >
            remove
          </a>
        </div>
      </div>
    </div>
  )
}

HorizontalCard.propTypes = {
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
    qty: PropTypes.number.isRequired,
  }),
  removeItem: PropTypes.func.isRequired,
  updateQty: PropTypes.func.isRequired,
}

export default HorizontalCard
