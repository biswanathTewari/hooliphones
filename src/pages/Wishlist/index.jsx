import React from 'react'
import Lottie from 'react-lottie'
import { motion } from 'framer-motion'

import { Navbar, Footer, VerticalCard, Loader } from '../../components'
import { useWishlist, useGlobalState, actions } from '../../store'
import { getWishlistService } from '../../services'
import animation from '../../assets/lotties/wishlist.json'
import { fadingParent } from '../../utils'
import './styles.scss'

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animation,
}

const Wishlist = () => {
  const { showToast } = useGlobalState()
  const { products: wishlist, isLoading, dispatchWishlist } = useWishlist()

  const getItems = async () => {
    dispatchWishlist({ type: actions.fetchWishlist })
    setTimeout(async () => {
      try {
        const response = await getWishlistService()
        dispatchWishlist({
          type: actions.fetchWishlistSuccess,
          payload: response.wishlist,
        })
      } catch (error) {
        dispatchWishlist({ type: actions.fetchWishlistFailure, payload: error })
        showToast({
          message: 'Oops! something went wrong, unable to get your cart :(',
          type: 'failed',
        })
      }
    }, 1000) // simulate a delay, hehe
  }

  React.useEffect(() => getItems(), [])

  return (
    <motion.div
      variants={fadingParent}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <Navbar />
      <main className="wishlist-container">
        {isLoading ? (
          <Loader />
        ) : (
          <article className="wishlist-list-wrapper padding-default flex-1">
            <section className="wishlist-list-header">
              <h1 className="h5 text-700">My Wishlist</h1>
            </section>
            <section className="wishlist-list">
              {wishlist && wishlist.length > 0 ? (
                wishlist.map(product => (
                  <VerticalCard product={product} key={product._id} />
                ))
              ) : (
                <div className="empty-wishlist">
                  <Lottie options={defaultOptions} height="15rem" />
                  <h1 className="h5">Your wishlist is empty</h1>
                </div>
              )}
            </section>
          </article>
        )}
      </main>
      <Footer />
    </motion.div>
  )
}

export default Wishlist
