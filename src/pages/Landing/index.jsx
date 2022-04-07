import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Navbar, Footer, Wave } from '../../components'
import { Hero, Iphone11 } from '../../assets/images'
import { photoAnim, pageAnimation, fade, scrollReveal } from '../../utils'
import { useScroll } from '../../hooks'
import './styles.scss'

const Index = () => {
  const [element, controls] = useScroll()
  return (
    <motion.div
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
      className="landing"
    >
      <Navbar />
      <main>
        <article className="container intro">
          <section className="intro-text">
            <motion.h1 className="h2" variants={fade}>
              hooli phones
            </motion.h1>
            <motion.h1 className="text-lg text-300 my-2" variants={fade}>
              {` We're more than the chat, mail, search and phone that's crowned
              Hooli as the`}
              <motion.h1 className="text-lg text-600" variants={fade}>
                most respected brand in the world.
              </motion.h1>
            </motion.h1>
            <motion.div className="intro-btns" variants={fade}>
              <Link to="/shop" className="btn btn-primary mg-r-1">
                shop now
              </Link>
              <a href="#promo" className="btn btn-secondary">
                {' '}
                pre-order{' '}
              </a>
            </motion.div>
          </section>
          <section className="illustration">
            <motion.img
              src={Hero}
              alt="Illustration"
              className="img-responsive"
              variants={photoAnim}
            />
          </section>
          <Wave />
        </article>

        <motion.article
          className="container promo-container"
          id="promo"
          ref={element}
          variants={scrollReveal}
          animate={controls}
          initial="hidden"
        >
          <div className="card-horizontal promo-card card-shadow">
            <img
              src={Iphone11}
              alt="item"
              loading="lazy"
              className="img-responsive promo-card-img"
            />

            <div className="card-info-horizontal">
              <div className="card-title">
                <p className="h5 text-600">Hooli 11</p>
              </div>
              <div className="card-subtitle">
                <p className="text-lg">Latest arrival, pre-order now</p>
                <p className="text-rg">
                  $799{' '}
                  <span className="text-line-through text-tertiary">$999</span>
                  <span className="text-secondary">10%</span>
                </p>
              </div>
              <div className="card-btns">
                <a href="#" className="btn btn-primary mg-right1">
                  pre-order
                </a>
              </div>
            </div>
          </div>
          <div className="card-horizontal promo-card card-shadow">
            <img
              src={Iphone11}
              alt="item"
              loading="lazy"
              className="img-responsive promo-card-img"
            />

            <div className="card-info-horizontal">
              <div className="card-title">
                <p className="h5 text-600">Hooli 11 mini</p>
              </div>
              <div className="card-subtitle">
                <p className="text-lg">Latest arrival, pre-order now</p>
                <p className="text-rg">
                  $719{' '}
                  <span className="text-line-through text-tertiary">$799</span>
                  <span className="text-secondary">10%</span>
                </p>
              </div>
              <div className="card-btns">
                <a href="#" className="btn btn-primary mg-right1">
                  pre-order
                </a>
              </div>
            </div>
          </div>
        </motion.article>
      </main>
      <Footer />
    </motion.div>
  )
}

export default Index
