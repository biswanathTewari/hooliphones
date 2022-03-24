import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const Slider = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = React.useState(min)
  const [maxVal, setMaxVal] = React.useState(max)
  const minValRef = React.useRef(null)
  const maxValRef = React.useRef(null)
  const rangeRef = React.useRef(null)

  const getPercentage = React.useCallback(
    value => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  )

  // decreasing the range width from left side
  React.useEffect(() => {
    if (maxValRef.current) {
      const minPercentage = getPercentage(minVal)
      const maxPercentage = getPercentage(+maxValRef.current.value) // + => convert string to number

      if (rangeRef.current) {
        rangeRef.current.style.left = `${minPercentage}%`
        rangeRef.current.style.width = `${maxPercentage - minPercentage}%`
      }
    }
  }, [minVal, getPercentage])

  // decreasing the range width from right side
  React.useEffect(() => {
    if (minValRef.current) {
      const minPercentage = getPercentage(+minValRef.current.value) // + => convert string to number
      const maxPercentage = getPercentage(maxVal)

      if (rangeRef.current) {
        rangeRef.current.style.width = `${maxPercentage - minPercentage}%`
      }
    }
  }, [maxVal, getPercentage])

  React.useEffect(() => {
    //   onChange({ min: minVal, max: maxVal })
    onChange()
  }, [maxVal, minVal, onChange])

  return (
    <div className="conatiner">
      {/* left thumb */}
      <input
        type="range"
        min={min}
        max={max}
        ref={minValRef}
        className={`thumb thumb-zindex3 ${
          minVal > max - 100 && `thumb-zindex5`
        }`}
        onChange={e => {
          const val = Math.min(+e.target.value, maxVal - 1)
          setMinVal(val)
          e.target.value = val
        }}
        value={minVal}
      />
      {/* right thumb */}
      <input
        type="range"
        min={min}
        max={max}
        ref={maxValRef}
        className="thumb thumb-zindex4"
        onChange={e => {
          const val = Math.max(+e.target.value, minVal + 1)
          setMaxVal(val)
          e.target.value = val
        }}
        value={maxVal}
      />

      <div className="slider">
        <div className="slider-track"></div>
        <div ref={rangeRef} className="slider-range"></div>
        <div className="slider-leftValue">{minVal}</div>
        <div className="slider-rightValue">{maxVal}</div>
      </div>
    </div>
  )
}

Slider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Slider
