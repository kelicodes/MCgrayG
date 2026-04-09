import { useState } from 'react'
import Navbar from './Component/Navbar/Navbar'
import './App.css'

import { Footer } from './Component/Footer/Footer'
import { Routes,Route } from 'react-router-dom'

import Home from './Pages/Home/Home'
import { SubscriptionPage } from './Pages/Sub/Sub'
import Checkout from './Pages/Check/Check'
import Login from './Pages/Login/Login'
import ScrollToTop from './Component/Scroll/Scroll'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubscriptionSuccess from './Pages/Mysub/Mysub'
import { ProductCardDemo } from './Component/Card/Card'
function App() {

  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <ScrollToTop/>
    <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/sub' element={<SubscriptionPage/>}/>
  <Route path='/check' element={<Checkout/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/mysub' element={<SubscriptionSuccess/>}/>
  <Route path='/menu' element={<ProductCardDemo/>}/>
   </Routes>


      <Footer/>
    </>
  )
}

export default App
