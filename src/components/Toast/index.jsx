import React from 'react'
import { motion } from 'framer-motion'

import { useGlobalState, actions } from '../../store'
import './styles.scss'

const Toast = () => {
  const { globalState, globalDispatch } = useGlobalState()
  const { message, type, show } = globalState.toast
  const [timer, setTimer] = React.useState(4000)
  let timerId = null

  const variants = {
    visible: {
      x: [-70, 0],
      transition: {
        ease: 'linear',
      },
    },
    hidden: {
      x: 100,
      transition: {
        ease: 'linear',
      },
    },
  }

  const onCloseHandler = () => globalDispatch({ type: actions.closeToast })

  React.useEffect(() => {
    if (timer === 0) onCloseHandler()
  }, [timer])

  React.useEffect(() => {
    if (show) {
      setTimer(4000)
      timerId = setInterval(() => {
        setTimer(prev => prev - 100)
      }, 100)
    }

    return () => clearInterval(timerId)
  }, [show])

  if (!show) return null

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={`toast toast-${type}`}
    >
      <p className="text-rg mg-r-1">{message}</p>
      <i
        className="fas fa-times btn-icon btn-icon-sm"
        onClick={onCloseHandler}
      ></i>
      <div
        className="timer"
        style={{ width: `${(timer / 4000) * 100}%` }}
      ></div>
    </motion.div>
  )
}

export default Toast
