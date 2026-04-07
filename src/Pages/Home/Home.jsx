import { useState } from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import './Home.css'
import ProductCard, { ProductCardDemo } from '../../Component/Card/Card'
import McGrayBanner from '../../Component/Hero/Hero'
import { Footer } from "../../Component/Footer/Footer"
import { Services } from '../../Component/Services/Services'

function Home() {

  return (
    <>
    <McGrayBanner/>
 
    <Services/>
    <ProductCardDemo/>
  
    </>
  )
}

export default Home
