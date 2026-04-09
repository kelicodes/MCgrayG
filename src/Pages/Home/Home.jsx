import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

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
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* your sections */}
      <McGrayBanner />
      <Services />
      <ProductCardDemo />
      <SubscriptionPage />
      <HowItWorks />

      {/* WhatsApp Button */}
      {showBtn && (
        <a
          href="https://wa.me/254708374149?text=Hello%20McGray,%20I%20want%20to%20know%20more%20about%20your%20juice%20delivery"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: "var(--z-overlay)",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "var(--brand-primary)",
            color: "var(--fg-inverse)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            boxShadow: "var(--shadow-md), var(--glow-green)",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          <FaWhatsapp />
        </a>
      )}
    </>
  );
}

export default Home;