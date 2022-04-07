import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { Navbar, Footer, Address, Orders } from '../../components'
import dp from '../../assets/images/dinesh.png'
import { useUser, useGlobalState, actions } from '../../store'
import { Storage } from '../../utils'
import './styles.scss'

const Section = ({ title, icon, tab, setTab }) => {
  const onClickHandler = () => {
    setTab(title)
  }
  return (
    <div
      className={`profile__section card-shadow ${
        tab === title ? 'profile__section--active' : ''
      }`}
      onClick={onClickHandler}
    >
      <i className={`fas ${icon} mr-1`}></i>
      <p className="text-lg">{title}</p>
    </div>
  )
}

const Profile = () => {
  const { showToast } = useGlobalState()
  const {
    userDetails: { foundUser: user },
    dispatchUser,
  } = useUser()
  const navigate = useNavigate()
  const [tab, setTab] = React.useState('address')

  const logoutHandler = async () => {
    dispatchUser({ type: actions.logout })
    await Storage.store('authToken', null)
    await Storage.store('userDetails', null)
    showToast({ message: 'Logged out successfully', type: 'success' })
    navigate('/')
  }

  return (
    <>
      <Navbar />
      <div className="profile padding-default">
        <img src={dp} alt="profile" className="responsive-img profile__pic" />
        <div className="profile__details">
          <h3 className="h6">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-lg">{user.email}</p>
        </div>
        <div className="profile__info">
          <div className="section__container">
            <Section
              title="Address"
              icon="fa-map-marker-alt"
              setTab={setTab}
              tab={tab}
            />
            <Section
              title="Orders"
              icon="fa-shopping-bag"
              setTab={setTab}
              tab={tab}
            />
            <Section
              title="Logout"
              icon="fa-sign-out-alt"
              setTab={setTab}
              tab={tab}
            />
          </div>
          <div className="profile__section--conatiner">
            {tab === 'Address' && <Address />}
            {tab === 'Orders' && <Orders />}
            {tab === 'Logout' && (
              <div className="profile__section--logout" onClick={logoutHandler}>
                <p className="h6">Hope to see you soon again</p>
                <i className="fas fa-praying-hands"></i>
                <div className="btn btn-secondary">Continue</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

Section.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  tab: PropTypes.string,
  setTab: PropTypes.func,
}

export default Profile
