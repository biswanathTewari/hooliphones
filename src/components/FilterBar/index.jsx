import React from 'react'
import PropTypes from 'prop-types'

import { Slider } from '../../components'
import './styles.scss'

const Filter = ({ visible }) => {
  return (
    <aside className={`filterbar ${visible ? 'filterbar-show' : ''} `}>
      <div className="filterbar-header">
        <h1 className="h5 text-700">Filter</h1>
        <h1 className="text-lg text-underline text-600 filter-clear">
          clear all
        </h1>
      </div>
      <div className="filterbar-body mb-5">
        <div className="filterbar-item">
          <h1 className="h6 text-700">Sort by</h1>

          <select
            value={''}
            onChange={() => {}}
            className="filterbar-dropdown cursor-pointer filter-text"
            placeholder="select"
          >
            <option value="">select</option>
            <option value="low">Price - low to high</option>
            <option value="high">Price - high to low</option>
          </select>
        </div>

        <div className="divider"></div>

        <div className="filterbar-item">
          <h1 className="h6 text-700">Price</h1>
          <Slider min={0} max={100} onChange={() => {}} />
        </div>

        <div className="divider"></div>

        <div className="filterbar-item">
          <h1 className="h6 text-700 mb">Processors</h1>
          <ul className="filterbar-list list">
            <li>
              <input type="checkbox" id="apple" />
              <label htmlFor="apple" className="filter-text text-600">
                Hooli 360
              </label>
            </li>
            <li>
              <input type="checkbox" id="samsung" />
              <label htmlFor="samsung" className="filter-text text-600">
                Snapdragon 780
              </label>
            </li>
            <li>
              <input type="checkbox" id="huawei" />
              <label htmlFor="huawei" className="filter-text text-600">
                MediaTek X
              </label>
            </li>
          </ul>
        </div>

        <div className="divider"></div>

        <div className="filterbar-item">
          <h1 className="h6 text-700 mb">Rating</h1>
          <ul className="filterbar-list list">
            <li>
              <input type="radio" id="4stars" />
              <label htmlFor="4stars" className="filter-text text-600">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </label>
            </li>
            <li>
              <input type="radio" id="3stars" />
              <label htmlFor="3stars" className="filter-text text-600">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </label>
            </li>
            <li>
              <input type="radio" id="2stars" />
              <label htmlFor="2stars" className="filter-text text-600">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </label>
            </li>
            <li>
              <input type="radio" id="1stars" />
              <label htmlFor="1stars" className="filter-text text-600">
                <i className="fas fa-star"></i>
              </label>
            </li>
          </ul>
        </div>

        <div className="divider"></div>

        <div className="filterbar-item">
          <h1 className="h6 text-700 mb">Include</h1>
          <ul className="filterbar-list list">
            <li>
              <input type="checkbox" id="fast" />
              <label htmlFor="fast" className="filter-text text-600">
                Fast delivery only
              </label>
            </li>
            <li>
              <input type="checkbox" id="out" />
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
