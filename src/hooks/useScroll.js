import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'

const useScroll = () => {
  const controls = useAnimation() // animation
  const [element, view] = useInView({ threshold: 0.3 })

  // if element is in view, we are starting the show animation
  if (view) {
    controls.start('show')
  } else {
    controls.start('hidden')
  }

  return [element, controls]
}

export default useScroll
