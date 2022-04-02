import React from 'react'

import { Navbar, Footer, HorizontalCard, Loader } from '../../components'
import {
  getCartItemsService,
  removeFromCartService,
  updateCartService,
} from '../../services'
import { useCart, useGlobalState, actions } from '../../store'
import animation from '../../assets/gifs/emptyCart.gif'
import './styles.scss'

const Cart = () => {
  const { showToast } = useGlobalState()
  const { products, isLoading, dispatchCart } = useCart()
  const [bill, setBill] = React.useState(0)
  const [totBill, setTotBill] = React.useState(0)

  const getCartItems = async () => {
    dispatchCart({ type: actions.fetchCart })
    setTimeout(async () => {
      try {
        const response = await getCartItemsService()
        console.log('response', response)
        dispatchCart({ type: actions.fetchCartSuccess, payload: response.cart })
      } catch (error) {
        dispatchCart({ type: actions.fetchCartFailure, payload: error })
        showToast({
          message: 'Oops! something went wrong, unable to get your cart :(',
          type: 'failed',
        })
      }
    }, 1000) // simulate a delay, hehe
  }

  React.useEffect(() => getCartItems(), [])

  React.useEffect(() => {
    let bill = 0
    bill = products.reduce((acc, product) => acc + product.cost, 0)
    setBill(bill)
    setTotBill(bill - 200)
  }, [products])

  const removeItemHandler = async productId => {
    dispatchCart({ type: actions.fetchCart })
    try {
      const response = await removeFromCartService(productId)
      console.log('response', response)
      dispatchCart({ type: actions.fetchCartSuccess, payload: response.cart })
    } catch (e) {
      dispatchCart({ type: actions.fetchCartFailure, payload: e })
      showToast({
        message: 'Oops! something went wrong, unable to remove the item :(',
        type: 'failed',
      })
    }
  }

  const updateCartHandler = async (product, type) => {
    // checking stock
    if (type === 'increment' && product.stock < product.qty + 1)
      return showToast({
        message: 'Oops! we ran out of stock :(',
        type: 'failed',
      })

    // validatiing min qty as 1
    if (type === 'decrement' && product.qty === 1)
      return showToast({
        message: 'bhai kya? minimum quantity is 1',
        type: 'failed',
      })
    try {
      const response = await updateCartService(product._id, type)
      console.log('response', response)
      dispatchCart({ type: actions.fetchCartSuccess, payload: response.cart })
    } catch (e) {
      dispatchCart({ type: actions.fetchCartFailure, payload: e })
      showToast({
        message: 'Oops! something went wrong, unable to remove the item :(',
        type: 'failed',
      })
    }
  }

  return (
    <div className="cart-page">
      <Navbar />
      <main className="cart-container">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className="h3 text-700 my-2">My Cart</h1>
            <article className="cart">
              {products && products.length ? (
                <>
                  <section className="product-section">
                    {products.map(product => (
                      <HorizontalCard
                        key={product.id}
                        product={product}
                        removeItem={removeItemHandler}
                        updateQty={updateCartHandler}
                      />
                    ))}
                  </section>

                  <section className="bill-section">
                    <div className="bill card-shadow">
                      <h5 className="h5">Price details</h5>
                      <div className="line"></div>
                      <div className="bill-item">
                        <h6 className="text-rg">
                          Price({products.length} items)
                        </h6>
                        <p className="text-md">₹{bill.toLocaleString()}</p>
                      </div>
                      <div className="bill-item">
                        <h6 className="text-rg">Discount</h6>
                        <p className="text-md">- ₹300</p>
                      </div>
                      <div className="bill-item">
                        <h6 className="text-rg">Delivery Charges</h6>
                        <p className="text-md">₹100</p>
                      </div>
                      <div className="line"></div>
                      <div className="bill-item">
                        <h6 className="text-lg text-700">Total</h6>
                        <h6 className="text-lg text-700">
                          ₹{totBill.toLocaleString()}
                        </h6>
                      </div>
                      <div className="line"></div>
                      <p className="text-md">
                        You will save ₹200 on this order
                      </p>
                      <div className="btn btn-primary mt-2">Place order</div>
                    </div>
                  </section>
                </>
              ) : (
                <div className="empty-cart-container">
                  <img
                    src={animation}
                    className="cart-gif img-responsive"
                    alt="empty cart"
                  />
                  <h1 className="text-lg empty-img-text">
                    Please add something in your cart
                  </h1>
                  <h1 className="h5 empty-text">Your cart is empty</h1>
                </div>
              )}
            </article>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Cart
