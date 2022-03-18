import axios from 'axios'
import PropTypes from 'prop-types'

export function callApi(
  endpoint,
  { method, body, headers, params } = { method: 'GET' },
) {
  let authToken
  let auth = localStorage.getItem('authToken')

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
        localStorage.setItem('authToken', res.data.encodedToken)
      }
    })
    .catch(e => {
      //TODO: add toast message
      //   if (e.response.data?.errors?.length > 0) {
      //     throw new Error(e.response.data.errors[0])
      //   } else {
      //     throw e
      //   }
      console.log(e)
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
