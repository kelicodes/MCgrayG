import { useState, useEffect, useRef } from "react";
import "./Hero.css";

const FRUITS = [
  { emoji: "🥭", label: "Mango", x: "8%", y: "12%", size: 90, delay: 0, drift: 12 },
  { emoji: "🍍", label: "Pineapple", x: "82%", y: "8%", size: 110, delay: 0.4, drift: -10 },
  { emoji: "🍊", label: "Orange", x: "4%", y: "58%", size: 70, delay: 0.8, drift: 8 },
  { emoji: "🌿", label: "Fresh", x: "90%", y: "55%", size: 55, delay: 0.2, drift: -14 },
  { emoji: "🍋", label: "Lemon", x: "75%", y: "78%", size: 65, delay: 1.0, drift: 10 },
  { emoji: "🍇", label: "Passion", x: "18%", y: "82%", size: 60, delay: 0.6, drift: -8 },
  { emoji: "🥝", label: "Kiwi", x: "88%", y: "32%", size: 52, delay: 1.2, drift: 12 },
  { emoji: "🍓", label: "Berry", x: "2%", y: "34%", size: 48, delay: 0.9, drift: -10 },
];

const PILLS = ["100% Natural", "No Preservatives", "Cold Pressed", "Fresh Daily", "Nairobi Grown"];

export default function McGrayBanner() {
  const [loaded, setLoaded] = useState(false);
  const [activePill, setActivePill] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const bannerRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePill(p => (p + 1) % PILLS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      if (!bannerRef.current) return;
      const rect = bannerRef.current.getBoundingClientRect();
      setCursorPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    const el = bannerRef.current;
    if (el) el.addEventListener("mousemove", handleMove);
    return () => { if (el) el.removeEventListener("mousemove", handleMove); };
  }, []);

  const handleOrder = () => {
    window.open("https://wa.me/254707515846?text=Hey%20McGray!%20I'd%20like%20to%20order%20some%20juice%20🍊", "_blank");
  };

  const handleExplore = () => {
    window.open("https://twitter.com/srlameck", "_blank");
  };

  return (
    <div className={`mcg-banner${loaded ? " mcg-banner--loaded" : ""}`} ref={bannerRef}>

      {/* Ambient glow that tracks cursor */}
      <div
        className="mcg-cursor-glow"
        style={{
          background: `radial-gradient(600px circle at ${cursorPos.x}% ${cursorPos.y}%, rgba(255,146,16,0.12) 0%, transparent 70%)`,
        }}
      />

      {/* Background layers */}
      <div className="mcg-bg">
        <div className="mcg-bg__mesh" />
        <div className="mcg-bg__grain" />
        <div className="mcg-bg__ring mcg-bg__ring--1" />
        <div className="mcg-bg__ring mcg-bg__ring--2" />
        <div className="mcg-bg__ring mcg-bg__ring--3" />
      </div>

      {/* Floating fruits */}
      <div className="mcg-fruits" aria-hidden="true">
        {FRUITS.map((f, i) => (
          <span
            key={i}
            className="mcg-fruit"
            style={{
              left: f.x,
              top: f.y,
              fontSize: f.size,
              animationDelay: `${f.delay}s`,
              "--drift": `${f.drift}px`,
            }}
          >
            {f.emoji}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div className="mcg-content">

        {/* Top badge */}
        <div className="mcg-badge">
          <span className="mcg-badge__dot" />
          <span>Fresh from Nairobi</span>
        </div>

        {/* Wordmark */}
        <div className="mcg-wordmark">
          <span className="mcg-wordmark__mc">Mc</span>
          <span className="mcg-wordmark__gray">Gray</span>
        </div>

        {/* Main headline */}
        <h1 className="mcg-headline">
          <span className="mcg-headline__line1">Squeeze the</span>
          <span className="mcg-headline__line2">
            <em>Day.</em>
          </span>
        </h1>

        {/* Sub copy — Gen Z toned */}
        <p className="mcg-sub">
          No cap, just fruits. Mango, passion, pineapple &amp; more —<br />
          cold-pressed &amp; served fresh. Your body will thank you fr.
        </p>

        {/* Rotating trust pills */}
        <div className="mcg-pills">
          {PILLS.map((p, i) => (
            <span key={p} className={`mcg-pill${i === activePill ? " mcg-pill--active" : ""}`}>
              {p}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div className="mcg-ctas">
          <button className="mcg-btn mcg-btn--primary" onClick={handleOrder}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.563 4.14 1.54 5.875L.057 23.5a.5.5 0 0 0 .621.621l5.625-1.483A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75A9.75 9.75 0 1 1 12 2.25 9.75 9.75 0 0 1 12 21.75z"/>
            </svg>
            Order Now
          </button>
          <button className="mcg-btn mcg-btn--ghost" onClick={handleExplore}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            @srlameck
          </button>
        </div>

        {/* Social proof strip */}
        <div className="mcg-proof">
          <div className="mcg-proof__avatars">
            {["🧃", "🍹", "🥤", "🫙"].map((e, i) => (
              <span key={i} className="mcg-proof__avatar">{e}</span>
            ))}
          </div>
          <span className="mcg-proof__text">
            <strong>1,200+</strong> happy customers in Nairobi
          </span>
        </div>

      </div>

      {/* Right visual panel */}
      <div className="mcg-visual">
        <div className="mcg-bottle-stack">
          <div className="mcg-bottle mcg-bottle--back">
            <div className="mcg-bottle__liquid mcg-bottle__liquid--yellow" />
            <div className="mcg-bottle__shine" />
          </div>
          <div className="mcg-bottle mcg-bottle--mid">
            <div className="mcg-bottle__liquid mcg-bottle__liquid--brown" />
            <div className="mcg-bottle__shine" />
          </div>
          <div className="mcg-bottle mcg-bottle--front">
            <div className="mcg-bottle__liquid mcg-bottle__liquid--orange" />
            <div className="mcg-bottle__shine" />
            <div className="mcg-bottle__label">
              <span className="mcg-bottle__label-mc">McGray</span>
              <span className="mcg-bottle__label-sub">Juice</span>
            </div>
          </div>
        </div>

        {/* Floating stat cards */}
        <div className="mcg-stat mcg-stat--top">
          <span className="mcg-stat__value">100%</span>
          <span className="mcg-stat__label">Fresh fruits</span>
        </div>
        <div className="mcg-stat mcg-stat--bottom">
          <span className="mcg-stat__value">2L</span>
          <span className="mcg-stat__label">Family size</span>
        </div>
      </div>

      {/* Bottom ticker */}
      <div className="mcg-ticker" aria-hidden="true">
        <div className="mcg-ticker__track">
          {[...Array(3)].map((_, ri) =>
            ["Mango Blend", "Passion Fruit", "Pineapple", "Mixed Tropical", "Orange Burst", "Green Detox"].map((item, i) => (
              <span key={`${ri}-${i}`} className="mcg-ticker__item">
                <span className="mcg-ticker__dot">✦</span> {item}
              </span>
            ))
          )}
        </div>
      </div>

    </div>
  );
}