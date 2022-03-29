import React from 'react'
import PropTypes from 'prop-types'

import { Slider } from '../../components'
import { useProducts, actions } from '../../store'
import './styles.scss'

const Filter = ({ visible }) => {
  const { filters, dispatchProducts } = useProducts()
  const { sortBy, fastDeliveryOnly, includeOutOfStock, processors } = filters
  const { hooli, snapdragon, mediatek } = processors

  const priceRangeHandler = React.useCallback((minValue, maxvalue) => {
    dispatchProducts({
      type: actions.setPriceRange,
      payload: { minPrice: minValue, maxPrice: maxvalue },
    })
  }, [])

  const toggleProcessors = e => {
    dispatchProducts({
      type: actions.toggleProcessors,
      payload: e.target.id,
    })
  }

  const ratingHandler = e => {
    dispatchProducts({
      type: actions.setRating,
      payload: e.target.value,
    })
  }
  return (
    <aside className={`filterbar ${visible ? 'filterbar-show' : ''} `}>
      <div className="filterbar-header">
        <h1 className="h5 text-700">Filter</h1>
        <h1
          className="text-lg text-underline text-600 filter-clear"
          onClick={() =>
            dispatchProducts({
              type: actions.resetFilters,
            })
          }
        >
          clear all
        </h1>
      </div>
      <div className="filterbar-body mb-5">
        <div className="filterbar-item">
          <h1 className="h6 text-700">Sort by</h1>

          <select
            value={sortBy}
            onChange={e => {
              dispatchProducts({
                type: actions.sortProducts,
                payload: e.target.value,
              })
            }}
            className="filterbar-dropdown cursor-pointer filter-text"
            placeholder="select"
          >
            <option value="" disabled>
              Select order
            </option>
            <option value="ascending">Price - low to high</option>
            <option value="descending">Price - high to low</option>
          </select>
        </div>

        <div className="divider"></div>

        <div className="filterbar-item">
          <h1 className="h6 text-700">Price</h1>
          <Slider min={0} max={100000} onChange={priceRangeHandler} />
        </div>

        <div className="divider"></div>

        <div className="filterbar-item">
          <h1 className="h6 text-700 mb">Processors</h1>
          <ul className="filterbar-list list">
            <li>
              <input
                type="checkbox"
                id="hooli"
                checked={hooli}
                value={hooli}
                onChange={toggleProcessors}
              />
              <label htmlFor="hooli" className="filter-text text-600">
                Hooli 360
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                id="snapdragon"
                checked={snapdragon}
                value={snapdragon}
                onChange={toggleProcessors}
              />
              <label htmlFor="snapdragon" className="filter-text text-600">
                Snapdragon 780
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                id="mediatek"
                checked={mediatek}
                value={mediatek}
                onChange={toggleProcessors}
              />
              <label htmlFor="mediatek" className="filter-text text-600">
                MediaTek X
              </label>
            </li>
          </ul>
        </div>

        <div className="divider"></div>

        <form className="filterbar-item">
          <h1 className="h6 text-700 mb">Rating</h1>
          <ul className="filterbar-list list">
            <li>
              <input
                type="radio"
                id="4stars"
                name="stars"
                value={4}
                onChange={ratingHandler}
              />
              <label htmlFor="4stars" className="filter-text text-600">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="3stars"
                name="stars"
                value={3}
                onChange={ratingHandler}
              />
              <label htmlFor="3stars" className="filter-text text-600">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="2stars"
                name="stars"
                value={2}
                onChange={ratingHandler}
              />
              <label htmlFor="2stars" className="filter-text text-600">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="1stars"
                name="stars"
                value={1}
                onChange={ratingHandler}
              />
              <label htmlFor="1stars" className="filter-text text-600">
                <i className="fas fa-star"></i>
              </label>
            </li>
          </ul>
        </form>

        <div className="divider"></div>

        <div className="filterbar-item">
          <h1 className="h6 text-700 mb">Include</h1>
          <ul className="filterbar-list list">
            <li>
              <input
                type="checkbox"
                id="fast"
                checked={fastDeliveryOnly}
                value={fastDeliveryOnly}
                onChange={() =>
                  dispatchProducts({ type: actions.togglefastDeliveryOnly })
                }
              />
              <label htmlFor="fast" className="filter-text text-600">
                Fast delivery only
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                id="out"
                checked={includeOutOfStock}
                value={includeOutOfStock}
                onChange={() =>
                  dispatchProducts({ type: actions.toggleIncludeOutOfStock })
                }
              />
              <label htmlFor="out" className="filter-text text-600">
                Out of stocks
              </label>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

Filter.propTypes = {
  visible: PropTypes.bool,
}

export default Filter
