import axios from 'axios'
import PropTypes from 'prop-types'

import { Storage } from '../utils'
export function callApi(
  endpoint,
  { method, body, headers, params } = { method: 'GET' },
) {
  let authToken
  let auth = Storage.get('authToken')

  if (auth) authToken = auth
  return axios({
    method: method,
    url: endpoint,
    data: body,
    params: params,
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
      Accept: 'application/json',
      ...headers,
    },
  })
    .then(res => {
      if (res.data.encodedToken) {
        Storage.store('authToken', res.data.encodedToken)
      }
      return res.data
    })
    .catch(e => {
      if (e.response?.data?.errors?.length > 0) {
        throw new Error(e.response.data.errors[0])
      } else {
        throw e
      }
    })
}

callApi.propTypes = {
  endpoint: PropTypes.string.isRequired,
  optionalObject: PropTypes.shape({
    method: PropTypes.string,
    body: PropTypes.object,
    headers: PropTypes.object,
    params: PropTypes.object,
  }),
}
