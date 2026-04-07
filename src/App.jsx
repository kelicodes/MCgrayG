import { useState } from 'react'
import Navbar from './Component/Navbar/Navbar'
import './App.css'

import { Footer } from './Component/Footer/Footer'

import Home from './Pages/Home/Home'

function App() {

  return (
    <>
    <Navbar/>
   <Home/>
      <Footer/>
    </>
  )
}

export default App
