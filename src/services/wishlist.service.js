import { callApi } from './https.service'

export async function getWishlistService() {
  const response = await callApi('/api/user/wishlist', {
    method: 'GET',
  })

  return response
}

export async function addToWishlistService(product) {
  const response = await callApi('/api/user/wishlist', {
    method: 'POST',
    body: { product },
  })

  return response
}

export async function removeFromWishlistService(productId) {
  const response = await callApi(`/api/user/wishlist/${productId}`, {
    method: 'DELETE',
  })
  return response
}
