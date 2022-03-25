import React from 'react'

import Navigation from './navigation'
import { Toast } from './components'
import './styles.scss'

function App() {
  return (
    <div className="App">
      <Toast />
      <Navigation />
    </div>
  )
}

export default App
