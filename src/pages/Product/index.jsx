import React from 'react'
import { useParams, Link } from 'react-router-dom'

import { Navbar, Footer } from '../../components'
import { getProductByIdService, addToCartService } from '../../services'
import { useCart, useUser, useGlobalState, actions } from '../../store'
import './styles.scss'

const Product = () => {
  const { id } = useParams()
  const { showToast } = useGlobalState()
  const { isLoggedIn } = useUser()
  const { products: cartItems, dispatchCart } = useCart()
  const [product, setProduct] = React.useState({})
  const [isInCart, setIsInCart] = React.useState(false)

  const getProduct = async id => {
    const response = await getProductByIdService(id)
    setProduct(response.product)
  }

  const handleAddToCart = async e => {
    e.preventDefault()
    if (!isLoggedIn) {
      showToast({
        message: 'Please login to continue',
        type: 'failed',
      })
      return
    }

    try {
      await addToCartService(product)
      showToast({
        message: `${product.title} added to cart`,
        type: 'success',
      })
      dispatchCart({ type: actions.addToCart, payload: product })
      return setIsInCart(true)
    } catch {
      showToast({
        message: 'Oops! something went wrong, unable to add to cart :(',
        type: 'failed',
      })
      return
    }
  }

  const checkIfInCart = () => {
    if (cartItems.length === 0) return
    const cartItem = cartItems.find(item => item._id === id)
    if (cartItem) {
      setIsInCart(true)
    }
  }

  React.useEffect(() => {
    getProduct(id)
    checkIfInCart(id)
  }, [])

  return (
    <div className="">
      <Navbar />
      <div className="details padding-default">
        <div className="details__image">
          <img
            loading="eager"
            src={product.img}
            alt="product"
            className=" img-responsive"
          />
        </div>
        <div className="details__info">
          <h1 className="details__title h2">{product.title}</h1>
          <h1 className="details__description h6">{product.subtitle}</h1>
          <div className="details__rating">
            <div className="details__rating__stars">
              {product.rating}
              <i className="fas fa-star"></i>
            </div>
            <div className="vertical__divider"></div>
            <div className="details__rating__count">9111 ratings</div>
          </div>
          <p className="h6 details__price">
            ₹{product.price}{' '}
            <span className="text-line-through text-tertiary text-lg mr-1">
              ₹{product.prevPrice}
            </span>
            <span className="text-secondary text-lg">10%</span>
          </p>
          <div className="divider"></div>
          <h1 className="h5">Available offers</h1>
          <ul className="discounts">
            <li>
              Bank OfferFlat ₹50 Instant Cashback on Paytm Wallet. Min Order
              Value ₹500. Valid once per Paytm account
            </li>
            <li>Bank Offer5% Cashback on Flipkart Axis Bank Card</li>
            <li>
              Special PriceGet extra ₹4000 off (price inclusive of discount)
            </li>
          </ul>
          {isInCart ? (
            <Link to={`/cart`} className="details__button btn btn-primary">
              View cart
            </Link>
          ) : (
            <div
              className="details__button btn btn-primary"
              onClick={handleAddToCart}
            >
              Add to cart
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Product
