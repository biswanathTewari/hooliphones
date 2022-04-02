import { callApi } from './https.service'
import { signUpService, loginService } from './auth.service'
import { getProductService } from './shop.service'
import {
  getCartItemsService,
  addToCartService,
  removeFromCartService,
  updateCartService,
} from './cart.service'
import {
  getWishlistService,
  addToWishlistService,
  removeFromWishlistService,
} from './wishlist.service'

export {
  callApi,
  signUpService,
  loginService,
  getProductService,
  getCartItemsService,
  addToCartService,
  removeFromCartService,
  updateCartService,
  getWishlistService,
  addToWishlistService,
  removeFromWishlistService,
}
