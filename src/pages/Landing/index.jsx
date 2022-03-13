import React from 'react'

import { Navbar, Footer } from '../../components'
import { Hero, Iphone11 } from '../../assets/images'
import './styles.scss'

const Index = () => {
  return (
    <div classNameName="App">
      <Navbar />
      <main>
        <article className="container intro">
          <section className="intro-text">
            <h1 className="h2">hooli phones</h1>
            <h1 className="text-lg text-300 my-2">
              {` We're more than the chat, mail, search and phone that's crowned
              Hooli as the`}
              <h1 className="text-lg text-600">
                most respected brand in the world.
              </h1>
            </h1>
            <div className="intro-btns">
              <a
                href="../Product/index.html"
                className="btn btn-primary mg-r-1"
              >
                shop now
              </a>
              <a href="#promo" className="btn btn-secondary">
                {' '}
                pre-order{' '}
              </a>
            </div>
          </section>
          <section className="illustration">
            <img src={Hero} alt="Illustration" className="img-responsive" />
          </section>
        </article>

        <article className="container promo-container" id="promo">
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
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default Index
