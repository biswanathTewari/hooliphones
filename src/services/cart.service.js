import { callApi } from './https.service'

export async function getCartItemsService() {
  const response = await callApi('/api/user/cart', {
    method: 'GET',
  })

  return response
}

export async function addToCartService(product) {
  const response = await callApi('/api/user/cart', {
    method: 'POST',
    body: { product },
  })

  return response
}

export async function removeFromCartService(productId) {
  const response = await callApi(`/api/user/cart/${productId}`, {
    method: 'DELETE',
  })

  return response
}

export async function updateCartService(productId, type) {
  const response = await callApi(`/api/user/cart/${productId}`, {
    method: 'POST',
    body: { action: { type } },
  })

  return response
}
