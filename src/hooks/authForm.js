import React from 'react'
import PropTypes from 'prop-types'

const credsObj = {
  fullName: '',
  email: '',
  password: '',
  checkValue: false,
}

const pwdRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
const emailRegex = /^\S+@\S+\.\S+$/

const useAuthForm = (checkErrorMsg = '', optionalCheck = false) => {
  const [creds, setCreds] = React.useState(credsObj)
  const [error, setError] = React.useState(credsObj)

  const onChangeHandler = e => {
    const { id, value } = e.target
    setCreds({ ...creds, [id]: value })
  }

  const hackHandler = () => {
    setCreds({ ...creds, email: 'bizan@hooli.com', password: 'hoolicloud' })
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
    const { email, password, checkValue, fullName } = creds
    const errors = {}
    if (!email) {
      errors.email = 'Email is required'
    } else if (!emailRegex.test(email)) {
      errors.email = 'Invalid email'
    }
    if (!password) {
      errors.password = 'Password is required'
    } else if (!pwdRegex.test(password) && !optionalCheck) {
      errors.password =
        'Password must be 6 characters long and contain atleast 1 letter , 1 digit & 1 special character!'
    }
    if (!optionalCheck) {
      if (!checkValue) errors.checkValue = checkErrorMsg
      if (!fullName) {
        errors.fullName = 'Full Name is required'
      }
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
    hackHandler,
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
