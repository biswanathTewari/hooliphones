import React from 'react'
import { Link } from 'react-router-dom'

import { Navbar, Footer } from '../../components'
import { useAuthForm } from '../../hooks'
import { actions, useGlobalState, useUser } from '../../store'
import './styles.scss'

const Login = () => {
  const {
    creds,
    error,
    onBlurHandler,
    onChangeHandler,
    validateForm,
    resetForm,
  } = useAuthForm('', true)
  const { showToast } = useGlobalState()
  const { dispatchUser } = useUser()

  const onSubmitHandler = e => {
    e.preventDefault()
    if (validateForm()) {
      if (creds.email === 'user@gmail.com' && creds.password === '123456') {
        dispatchUser({
          type: actions.login,
          payload: { name: 'bizan', email: creds.email },
        })
        showToast({
          message: 'Success!',
          type: 'success',
        })
        resetForm()
      } else {
        showToast({
          message: 'Oops! Wrong email or password',
          type: 'failed',
        })
      }
    } else {
      showToast({
        message: 'Bhai kya kar raha hai tu?',
        type: 'failed',
      })
    }
  }

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
                value={creds.email}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                className={`form-field ${error.email ? 'form-error' : ''}`}
                placeholder="bizan@hooli.com"
                required
              />
              {error.email && <h1 className="error-text">{error.email}</h1>}
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
                value={creds.password}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                className={`form-field ${error.password ? 'form-error' : ''}`}
                placeholder="main nahi bataunga"
                required
              />
              {error.password && (
                <h1 className="error-text">{error.password}</h1>
              )}
            </div>
            <div className="conditions">
              <div className="flex-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="form-checkbox"
                  defaultChecked
                />
                <p className="text-rg">Remember me</p>
              </div>
              <a href="#" className="text-rg forgot-password">
                {' '}
                Forgot password?{' '}
              </a>
            </div>

            <div
              type="submit"
              className="btn btn-primary"
              onClick={onSubmitHandler}
            >
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
