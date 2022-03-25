import React from 'react'
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom'

import { Navbar, Footer, TextInput } from '../../components'
import { useAuthForm } from '../../hooks'
import { actions, useGlobalState, useUser } from '../../store'
import { loginService } from '../../services'
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
  const { isLoggedIn, dispatchUser } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state ? location.state.from?.pathname : '/'

  const loginHandler = async (email, password) => {
    try {
      const response = await loginService(email, password)
      dispatchUser({ type: actions.login, payload: response })
      showToast({
        message: 'Success!',
        type: 'success',
      })
      resetForm()
      navigate(from, { replace: true })
    } catch (error) {
      showToast({
        message: 'Oops! something went wrong :(',
        type: 'failed',
      })
    }
  }

  const onSubmitHandler = e => {
    e.preventDefault()
    if (validateForm()) {
      loginHandler(creds.email, creds.password)
    } else {
      showToast({
        message: 'Bhai kya kar raha hai tu?',
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
          <h1 className="h5 text-700">Login</h1>
          <form action="submit">
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
