import { callApi } from './https.service'

export async function getProductService() {
  const response = await callApi('/api/products', {
    method: 'GET',
  })
  return response
}
