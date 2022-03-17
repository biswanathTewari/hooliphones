import React from 'react'
import { Link } from 'react-router-dom'

import { Navbar, Footer } from '../../components'
import './styles.scss'

const Login = () => {
  return (
    <div className="app">
      <Navbar />

      <main className="main">
        <div className="login-card card-shadow">
          <h1 className="h5 text-700">Login</h1>
          <form action="submit">
            <div className="input-container">
              <label htmlFor="email" className="form-label form-label-required">
                Email address
              </label>
              <input
                id="email"
                type="email"
                className="form-field"
                placeholder="bizan@hooli.com"
                required
              />
            </div>
            <div className="input-container">
              <label
                htmlFor="password"
                className="form-label form-label-required"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-field"
                placeholder="main nahi bataunga"
                required
              />
            </div>
            <div className="conditions">
              <div className="flex-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="form-checkbox"
                  checked
                />
                <p className="text-rg">Remember me</p>
              </div>
              <a href="#" className="text-rg forgot-password">
                {' '}
                Forgot password?{' '}
              </a>
            </div>
            <div type="submit" className="btn btn-primary">
              <h1 className="text-md text-700">Login</h1>
            </div>
          </form>
          <div className="sign-up">
            <Link to={'/signup'} className="text-rg">
              Create new account
              <i className="fas fa-angle-right"></i>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Login
