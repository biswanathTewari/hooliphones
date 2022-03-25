import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const TextInput = ({ id, required = true, labelText, errorMsg, ...rest }) => {
  return (
    <div className="input-container">
      <label
        htmlFor={id}
        className={`form-label ${required ? 'form-label-required' : ''}`}
      >
        {labelText}
      </label>
      <input id={id} required={required} {...rest} />
      {errorMsg && <h1 className="error-text">{errorMsg}</h1>}
    </div>
  )
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  errorMsg: PropTypes.string,
}

export default TextInput
