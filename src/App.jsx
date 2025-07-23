import React from 'react'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <div className='home'>
      <Navbar />
      <Home />
    </div>
  )
}

export default App
