import PropTypes from 'prop-types'

import { callApi } from './https.service'

export async function signUpService(email, password) {
  const response = await callApi('/api/auth/signup', {
    method: 'POST',
    body: {
      email,
      password,
    },
  })

  return {
    user: response,
  }
}

signUpService.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}
