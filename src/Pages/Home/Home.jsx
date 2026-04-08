import { useState } from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import './Home.css'
import ProductCard, { ProductCardDemo } from '../../Component/Card/Card'
import McGrayBanner from '../../Component/Hero/Hero'
import { Footer } from "../../Component/Footer/Footer"
import { Services } from '../../Component/Services/Services'
import { HowItWorks } from '../../Component/Say/Say'
import { SubscriptionPage } from '../Sub/Sub'
import McGrayHero from '../../Component/Banner/Banner'

function Home() {

  return (
    <>
    <McGrayBanner/>
    {/* <McGrayHero/> */}
    <SubscriptionPage/>
    <Services/>
    <ProductCardDemo/>
    <HowItWorks/>
    </>
  )
}

export default Home
