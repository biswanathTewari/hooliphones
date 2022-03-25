import PropTypes from 'prop-types'

import { callApi } from './https.service'

export async function signUpService(email, password, ...rest) {
  const response = await callApi('/api/auth/signup', {
    method: 'POST',
    body: {
      email,
      password,
      ...rest,
    },
  })

  return response
}

signUpService.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export async function loginService(email, password) {
  const response = await callApi('/api/auth/login', {
    method: 'POST',
    body: {
      email,
      password,
    },
  })

  return response
}

loginService.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}
