import React from 'react'

import { Navbar, Footer } from '../../components'
import { useAuthForm } from '../../hooks'
import { actions, useGlobalState, useUser } from '../../store'
import './styles.scss'

const Signup = () => {
  const {
    creds,
    error,
    checkHandler,
    onBlurHandler,
    onChangeHandler,
    validateForm,
    resetForm,
  } = useAuthForm('Please agree to the terms and conditions')
  const { showToast } = useGlobalState()
  const { dispatchUser } = useUser()

  const onSubmitHandler = e => {
    e.preventDefault()
    if (validateForm()) {
      const userDetails = {
        name: 'Jian Yang',
        email: creds.email,
        password: creds.password,
      }
      dispatchUser({ type: actions.login, payload: userDetails })
      showToast({
        message: 'Success!',
        type: 'success',
      })
      resetForm()
    } else {
      showToast({
        message: 'Try again!',
        type: 'failed',
      })
    }
  }

  return (
    <div className="app">
      <Navbar />

      <main className="main">
        <div className="login-card card-shadow">
          <h1 className="h5 text-700">Sign up</h1>
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
              <div
                className="flex-center cursor-pointer"
                onClick={checkHandler}
              >
                <input
                  type="checkbox"
                  id="remember"
                  className="form-checkbox"
                  checked={creds.checkValue}
                  onChange={checkHandler}
                />
                <p className="text-rg">I accept all the Terms & Conditions</p>
              </div>
              {error.checkValue && (
                <h1 className="error-text">{error.checkValue}</h1>
              )}
            </div>
            <div
              type="submit"
              className="btn btn-primary"
              onClick={onSubmitHandler}
            >
              <h1 className="text-md text-700">Create New Account</h1>
            </div>
          </form>
          <div className="sign-up">
            <p className="text-rg">
              Already have an account{'  '}
              <i className="fas fa-angle-right"></i>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Signup
