import React from 'react'
import Lottie from 'react-lottie'

import animation from '../../assets/lotties/loading.json'
import './styles.scss'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animation,
}

const Loader = () => {
  return (
    <div className="loader-container">
      <Lottie options={defaultOptions} height="70%" />
    </div>
  )
}

export default Loader
