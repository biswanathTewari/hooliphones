import React from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'

import { Navbar, Footer, TextInput } from '../../components'
import { useAuthForm } from '../../hooks'
import { actions, useGlobalState, useUser } from '../../store'
import { signUpService } from '../../services'
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
  const { isLoggedIn, dispatchUser } = useUser()
  const navigate = useNavigate()

  const signupHandler = async (email, password) => {
    try {
      const response = await signUpService(email, password)
      dispatchUser({ type: actions.login, payload: response })
      showToast({
        message: 'Success!',
        type: 'success',
      })
      resetForm()
      navigate('/shop', { replace: true })
    } catch (error) {
      showToast({
        message: error.message,
        type: 'failed',
      })
    }
  }

  const onSubmitHandler = e => {
    e.preventDefault()
    if (validateForm()) {
      signupHandler(creds.email, creds.password)
    } else {
      showToast({
        message: 'Try again!',
        type: 'failed',
      })
    }
  }

  if (isLoggedIn) return <Navigate to={'/'} replace />

  return (
    <div className="app">
      <Navbar />

      <main className="main">
        <div className="login-card card-shadow">
          <h1 className="h5 text-700">Sign up</h1>
          <form action="submit">
            <TextInput
              id="fullName"
              type="string"
              labelText={'Full Name'}
              value={creds.fullName}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              className={`form-field ${error.fullName ? 'form-error' : ''}`}
              placeholder="Your name"
              required={true}
              errorMsg={error.fullName}
            />
            <TextInput
              id="email"
              type="email"
              labelText={'Email address'}
              value={creds.email}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              className={`form-field ${error.email ? 'form-error' : ''}`}
              placeholder="bizan@hooli.com"
              required={true}
              errorMsg={error.email}
            />

            <TextInput
              id="password"
              type="password"
              labelText={'Password'}
              value={creds.password}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              className={`form-field ${error.password ? 'form-error' : ''}`}
              placeholder="main nahi bataunga"
              required={true}
              errorMsg={error.password}
            />

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
            <Link to={'/login'} className="text-rg">
              Already have an account{'  '}
              <i className="fas fa-angle-right"></i>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Signup
