import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'

import { useUser } from '../../store'
import './styles.scss'

const NavLink = ({ to, text, toggleNav, isOpen, isBtn, icon }) => {
  const { pathname } = useLocation()
  // render the nav link unless we are currently on the page, edge case home nav link
  if (!pathname.includes(to) || (to === '/' && pathname !== '/'))
    return (
      <li
        style={{
          animation: `${isOpen && 'nav-link-fade 0.5s ease forwards 0.5s'}`,
        }}
        onClick={toggleNav}
      >
        {isBtn ? (
          <Link to={to} className="btn btn-transparent">
            {text}
          </Link>
        ) : (
          <Link to={to} className="nav-link">
            <i className={`fas ${icon}`}></i> {text}
          </Link>
        )}
      </li>
    )

  return <></>
}

const Index = ({ hasSearch }) => {
  const body = document.querySelector('body')
  const html = document.querySelector('html')
  const [isOpen, setIsOpen] = React.useState(false)
  const { isLoggedIn } = useUser()

  const toggleNav = () => {
    setIsOpen(prev => !prev)
    body.classList.toggle('body-overflow')
    html.classList.toggle('body-overflow')
  }

  return (
    <nav className="navbar">
      <svg
        className="e-logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 598.63 202.32"
      >
        <path
          d="M475.86,582.5H530V395l-54.12,25.5v162Zm69-104.12V582.5H599V478.38H544.88ZM310.33,470c-17-17-47.17-16-47.17-16S233,453,216,470a66.14,66.14,0,0,0-5,5.58h0c-35.71-27.67-67.8-47.62-95.5-61.19V395l-21.06,9.92c-50.89-20.67-83.28-17-91,.11,0,0-23.28,34.73,57.91,107.81v-29c-45.65-51.06-36.46-75.27-33-78.16,12.62-10.68,35.12-7.5,60.24,2L61.38,420.5v63.33c12.29,13.75,28.54,29.43,50,47.17,1.39,1.15,2.78,2.28,4.17,3.39V506.5c0-6.5,1.56-17,10.06-17s9.94,6.5,9.94,14v45.6a248.61,248.61,0,0,0,54,27.75V489c0-17.5-12.5-35-38-35a41.25,41.25,0,0,0-36,20.5V419.64c39.15,19.58,78.5,47.58,93.49,58.62-9.58,13.66-8.66,26.3-8.66,40.91,0,17.5-1.33,32.17,15.67,49.17s47.17,16,47.17,16,30.17,1,47.17-16S326,536.67,326,519.17,327.33,487,310.33,470Zm-37.17,67.33c0,3.33-1.67,11.67-10,11.67s-10-8.33-10-11.67V499.5c0-8.17,6.83-10.17,10-10.17s10,2,10,10.17v37.83ZM446.86,470c-17-17-47.17-16-47.17-16s-30.17-1-47.17,16-15.67,31.67-15.67,49.17-1.33,32.17,15.67,49.17,47.17,16,47.17,16,30.17,1,47.17-16,15.67-31.67,15.67-49.17S463.86,487,446.86,470Zm-37.17,67.33c0,3.33-1.67,11.67-10,11.67s-10-8.33-10-11.67V499.5c0-8.17,6.83-10.17,10-10.17s10,2,10,10.17v37.83ZM571.94,469a27,27,0,1,0-27-27A27,27,0,0,0,571.94,469ZM135.5,582.5h35.84a246.83,246.83,0,0,1-35.84-15.7v15.7Zm-20,0V555q-9.09-5.86-18.17-12.7c-13.82-10.45-25.72-20.27-36-29.49V582.5H115.5Zm55.84,0c34.13,11.73,65.36,13.28,88.57,6.76-18.65.22-42.87-2.42-70.4-12.41v5.64H171.34Z"
          transform="translate(-0.37 -390.76)"
          fill="#fff"
        ></path>
      </svg>
      {hasSearch && (
        <div className="searchbar-wrapper">
          <input type="text" className="searchbar" placeholder="Search" />
          <i className="fas fa-search search-icon"></i>
        </div>
      )}
      <ul
        className={`nav-links align-items-center ${
          isOpen && 'navlinks-active'
        }`}
      >
        <NavLink
          to={'/'}
          text="home"
          toggleNav={toggleNav}
          isOpen={isOpen}
          isBtn={false}
          icon="fa-home"
        />

        <NavLink
          to={'/shop'}
          text="shop"
          toggleNav={toggleNav}
          isOpen={isOpen}
          isBtn={false}
          icon="fa-store"
        />
        <NavLink
          to={'/cart'}
          text="cart"
          toggleNav={toggleNav}
          isOpen={isOpen}
          isBtn={false}
          icon="fa-shopping-cart"
        />
        {!isLoggedIn ? (
          <NavLink
            to={'/login'}
            text="login"
            toggleNav={toggleNav}
            isOpen={isOpen}
            isBtn={true}
          />
        ) : (
          <NavLink
            to={'/profile'}
            text="profile"
            toggleNav={toggleNav}
            isOpen={isOpen}
            isBtn={true}
          />
        )}
      </ul>
      <div className="burger" onClick={toggleNav}>
        <i className="fas fa-bars"></i>
      </div>
    </nav>
  )
}

NavLink.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string,
  toggleNav: PropTypes.func,
  isOpen: PropTypes.bool,
  isBtn: PropTypes.bool,
  icon: PropTypes.string,
}

Index.propTypes = {
  hasSearch: PropTypes.bool,
}

export default Index
