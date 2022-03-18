import React from 'react'
import PropTypes from 'prop-types'

const credsObj = {
  email: '',
  password: '',
  checkValue: false,
}

const useAuthForm = (checkErrorMsg = '', optionalCheck = false) => {
  const [creds, setCreds] = React.useState(credsObj)
  const [error, setError] = React.useState(credsObj)

  const onChangeHandler = e => {
    const { id, value } = e.target
    setCreds({ ...creds, [id]: value })
  }

  const onBlurHandler = e => {
    const { id, value } = e.target
    if (value === '') {
      setError({ ...error, [id]: 'This field is required' })
    } else {
      setError({ ...error, [id]: '' })
    }
  }

  const checkHandler = () => {
    setCreds({ ...creds, checkValue: !creds.checkValue })
  }

  const validateForm = () => {
    const { email, password, checkValue } = creds
    const errors = {}
    if (!email) {
      errors.email = 'Email is required'
    }
    if (!password) {
      errors.password = 'Password is required'
    }
    if (!checkValue && !optionalCheck) {
      errors.checkValue = checkErrorMsg
    }
    setError(errors)
    return Object.keys(errors).length === 0
  }

  const resetForm = () => {
    setCreds(credsObj)
    setError(credsObj)
  }

  return {
    creds,
    error,
    onChangeHandler,
    onBlurHandler,
    checkHandler,
    validateForm,
    resetForm,
  }
}

useAuthForm.propTypes = {
  checkErrorMsg: PropTypes.string,
  optionalCheck: PropTypes.bool,
}

export default useAuthForm
