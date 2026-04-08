import { useState, useEffect, useRef } from "react";
import "./Banner.css";

const FLAVOURS = [
  { emoji: "🥭", name: "Mango Sunrise", tag: "Bestseller", color: "#f97316" },
  { emoji: "🍍", name: "Pineapple Zing", tag: "Sweet", color: "#eab308" },
  { emoji: "🍊", name: "Orange Burst", tag: "Classic", color: "#f59e0b" },
  { emoji: "🍇", name: "Passion Purple", tag: "Exotic", color: "#a855f7" },
  { emoji: "🥝", name: "Green Detox", tag: "Clean", color: "#22c55e" },
];

const MARQUEE_ITEMS = [
  "Cold Pressed", "100% Natural", "Nairobi Made",
  "No Sugar Added", "Fresh Daily", "Zero Preservatives",
  "Cold Pressed", "100% Natural", "Nairobi Made",
  "No Sugar Added", "Fresh Daily", "Zero Preservatives",
  "Cold Pressed", "100% Natural", "Nairobi Made",
  "No Sugar Added", "Fresh Daily", "Zero Preservatives",
];

export default function McGrayHero() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Animate customer counter
  useEffect(() => {
    const target = 1247;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setTimeout(() => {
      const iv = setInterval(() => {
        current += increment;
        if (current >= target) { setCount(target); clearInterval(iv); }
        else setCount(Math.floor(current));
      }, duration / steps);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate flavours
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive(a => (a + 1) % FLAVOURS.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleOrder = () => {
    window.open(
      `https://wa.me/254707515846?text=Hey%20McGray!%20I'd%20like%20to%20order%20some%20${encodeURIComponent(FLAVOURS[active].name)}%20juice%20${FLAVOURS[active].emoji}`,
      "_blank"
    );
  };

  const current = FLAVOURS[active];

  return (
    <section className={`mcg2 ${loaded ? "mcg2--in" : ""}`}>

      {/* ── LEFT PANEL ── */}
      <div className="mcg2-left">

        <header className="mcg2-header">
          <div className="mcg2-logo">
            <span className="mcg2-logo-mark">M</span>
            <span className="mcg2-logo-text">cGray</span>
          </div>
          <a
            href="https://twitter.com/srlameck"
            target="_blank"
            rel="noreferrer"
            className="mcg2-twitter"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @srlameck
          </a>
        </header>

        <div className="mcg2-eyebrow">
          <span className="mcg2-dot" />
          Fresh · Nairobi · Cold-Pressed
        </div>

        <h1 className="mcg2-headline">
          <span className="mcg2-h-top">Your daily</span>
          <span className="mcg2-h-middle">dose of</span>
          <span className="mcg2-h-accent">real fruit.</span>
        </h1>

        <p className="mcg2-body">
          No concentrates. No added sugar. Just whole Kenyan fruits
          pressed fresh every morning and delivered to your door.
        </p>

        {/* Flavour selector */}
        <div className="mcg2-flavours">
          <p className="mcg2-flavours-label">Choose your flavour</p>
          <div className="mcg2-flavour-row">
            {FLAVOURS.map((f, i) => (
              <button
                key={f.name}
                className={`mcg2-flavour-btn ${i === active ? "mcg2-flavour-btn--active" : ""}`}
                style={{ "--fc": f.color }}
                onClick={() => {
                  setActive(i);
                  clearInterval(intervalRef.current);
                }}
                aria-label={f.name}
              >
                <span className="mcg2-flavour-emoji">{f.emoji}</span>
              </button>
            ))}
          </div>
          <div className="mcg2-flavour-info">
            <span className="mcg2-flavour-name" key={current.name}>
              {current.emoji} {current.name}
            </span>
            <span className="mcg2-flavour-tag" style={{ "--fc": current.color }}>
              {current.tag}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mcg2-cta-group">
          <button className="mcg2-cta-order" onClick={handleOrder}>
            <span className="mcg2-cta-inner">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.563 4.14 1.54 5.875L.057 23.5a.5.5 0 0 0 .621.621l5.625-1.483A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75A9.75 9.75 0 1 1 12 2.25 9.75 9.75 0 0 1 12 21.75z" />
              </svg>
              Order Now — WhatsApp
            </span>
            <span className="mcg2-cta-arrow">→</span>
          </button>
          <p className="mcg2-cta-sub">
            Delivered same day within Nairobi
          </p>
        </div>

        {/* Social proof */}
        <div className="mcg2-proof">
          <div className="mcg2-proof-number">{count.toLocaleString()}+</div>
          <div className="mcg2-proof-text">happy customers this year</div>
        </div>

      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="mcg2-right" style={{ "--fc": current.color }}>
        {/* Big background letter */}
        <div className="mcg2-bg-letter" aria-hidden="true">
          {current.emoji.slice(0, 2)}
        </div>

        {/* Central fruit showcase */}
        <div className="mcg2-showcase">
          <div className="mcg2-showcase-ring mcg2-showcase-ring--1" />
          <div className="mcg2-showcase-ring mcg2-showcase-ring--2" />
          <div className="mcg2-showcase-fruit" key={active}>
            {current.emoji}
          </div>
        </div>

        {/* Floating info cards */}
        <div className="mcg2-card mcg2-card--tl">
          <span className="mcg2-card-icon">🌿</span>
          <div>
            <strong>Zero additives</strong>
            <span>Whole fruit only</span>
          </div>
        </div>

        <div className="mcg2-card mcg2-card--br">
          <span className="mcg2-card-icon">🧊</span>
          <div>
            <strong>Cold pressed</strong>
            <span>Max nutrients kept</span>
          </div>
        </div>

        {/* Volume badge */}
        <div className="mcg2-vol">
          <span className="mcg2-vol-size">500ml</span>
          <span className="mcg2-vol-label">per bottle</span>
        </div>

        {/* Vertical flavour name */}
        <div className="mcg2-vertical-label" aria-hidden="true" key={`vl-${active}`}>
          {current.name.toUpperCase()}
        </div>
      </div>

      {/* ── BOTTOM MARQUEE ── */}
      <div className="mcg2-marquee" aria-hidden="true">
        <div className="mcg2-marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="mcg2-marquee-item">
              <span className="mcg2-marquee-sep">◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}