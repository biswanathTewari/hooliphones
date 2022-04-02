import React from 'react'
import Lottie from 'react-lottie'

import animation from '../../assets/lotties/loading2.json'
import './styles.scss'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animation,
}

const Loader = () => {
  return (
    <div className="loader-container">
      <Lottie options={defaultOptions} height="90%" speed={1.5} />
    </div>
  )
}

export default Loader
