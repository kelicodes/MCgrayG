import { useState, useEffect, useCallback, useRef } from "react";
import "./Banner.css";

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────

const PLANS = {
  weekly: {
    big: "1,200",
    unit: "/wk",
    note: "Delivered every Friday",
    save: "",
    modalName: "Weekly",
    modalPrice: "KSh 1,200",
    modalUnit: "/wk",
  },
  monthly: {
    big: "3,840",
    unit: "/mo",
    note: "4 deliveries per month",
    save: "You save KSh 960 a month",
    modalName: "Monthly",
    modalPrice: "KSh 3,840",
    modalUnit: "/mo",
  },
};

const PERKS = [
  "6 cold-pressed bottles",
  "Free delivery",
  "Skip any week",
  "No lock-in contract",
];

const TRUST = [
  { icon: "🌿", label: "100% natural" },
  { icon: "❄️", label: "Cold-pressed daily" },
  { icon: "🔁", label: "Cancel any time" },
  { icon: "⭐", label: "4.9 · 800+ subscribers" },
];

// ─────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────

const SunIcon = () => (
  <svg
    className="icon-sun"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4.5" />
    <line x1="12" y1="2" x2="12" y2="4.5" />
    <line x1="12" y1="19.5" x2="12" y2="22" />
    <line x1="2" y1="12" x2="4.5" y2="12" />
    <line x1="19.5" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="4.93" x2="6.7" y2="6.7" />
    <line x1="17.3" y1="17.3" x2="19.07" y2="19.07" />
    <line x1="4.93" y1="19.07" x2="6.7" y2="17.3" />
    <line x1="17.3" y1="6.7" x2="19.07" y2="4.93" />
  </svg>
);

const MoonIcon = () => (
  <svg
    className="icon-moon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────

/** Reusable animated price display */
function PriceDisplay({ plan }) {
  const [swapping, setSwapping] = useState(false);
  const [displayed, setDisplayed] = useState(plan);
  const prevPlan = useRef(plan);

  useEffect(() => {
    if (plan === prevPlan.current) return;
    prevPlan.current = plan;
    setSwapping(true);
    const t = setTimeout(() => {
      setDisplayed(plan);
      setSwapping(false);
    }, 160);
    return () => clearTimeout(t);
  }, [plan]);

  const d = PLANS[displayed];

  return (
    <div className="hero__price" aria-live="polite" aria-atomic="true">
      <div className={`price-main${swapping ? " swap" : ""}`}>
        <sup>KSh</sup> {d.big} <sub>{d.unit}</sub>
      </div>
      <p className="price-note">{d.note}</p>
      <span className={`price-save${PLANS[plan].save ? " show" : ""}`}>
        {PLANS[plan].save}
      </span>
    </div>
  );
}

/** Modal subscribe form */
function SubscribeModal({ plan, isOpen, onClose }) {
  const [name, setName]   = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea]   = useState("");
  const [errors, setErrors] = useState({});
  const [done, setDone]   = useState(false);
  const nameRef           = useRef(null);

  // Focus trap — focus first input on open
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => nameRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape" && isOpen) handleClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setDone(false);
      setName(""); setPhone(""); setArea(""); setErrors({});
    }, 450);
  }, [onClose]);

  const handleSubmit = () => {
    const e = {};
    if (!name.trim())  e.name  = true;
    if (!phone.trim()) e.phone = true;
    if (Object.keys(e).length) {
      setErrors(e);
      setTimeout(() => setErrors({}), 1600);
      return;
    }
    setDone(true);
  };

  const p = PLANS[plan];

  return (
    <div
      className={`overlay${isOpen ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="modal">
        <button className="modal-close" onClick={handleClose} aria-label="Close">✕</button>

        {/* ── Form ── */}
        {!done && (
          <div className="form-wrap">
            <h2 className="modal-title" id="modal-heading">Almost there.</h2>
            <p className="modal-sub">We'll confirm your first box via WhatsApp.</p>

            <div className="modal-plan">
              <div>
                <div className="plan-label">Your plan</div>
                <div className="plan-val">{p.modalName}</div>
              </div>
              <div className="plan-price-modal">
                {p.modalPrice}<sub>{p.modalUnit}</sub>
              </div>
            </div>

            <div className="field">
              <label htmlFor="m-name">Your name</label>
              <input
                ref={nameRef}
                id="m-name"
                type="text"
                placeholder="e.g. Amara Osei"
                autoComplete="given-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "err" : ""}
              />
            </div>

            <div className="field">
              <label htmlFor="m-phone">WhatsApp number</label>
              <input
                id="m-phone"
                type="tel"
                placeholder="+254 7XX XXX XXX"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={errors.phone ? "err" : ""}
              />
            </div>

            <div className="field">
              <label htmlFor="m-area">Delivery area</label>
              <input
                id="m-area"
                type="text"
                placeholder="e.g. Westlands, Kilimani…"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>

            <button className="btn-confirm" onClick={handleSubmit}>
              Confirm my subscription →
            </button>
            <p className="modal-disclaimer">No payment now · We'll reach out to confirm</p>
          </div>
        )}

        {/* ── Success ── */}
        {done && (
          <div className="modal-success show" aria-live="polite">
            <div className="success-ring">🎉</div>
            <p className="success-title">You're in!</p>
            <p className="success-body">
              Expect a WhatsApp message from us shortly.<br />
              Your first box lands <strong>this Friday.</strong>
            </p>
            <button
              className="btn-confirm"
              style={{ maxWidth: "180px", marginTop: "0.5rem" }}
              onClick={handleClose}
            >
              Done ✓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

/**
 * McGray Juice — Subscription Landing Page
 *
 * Props:
 *  None — self-contained page component.
 *
 * Usage:
 *  import LandingPage from "./LandingPage";
 *  <LandingPage />
 *
 * Expects global.css + LandingPage.css to be loaded.
 * Also expects Navbar.css tokens (--z-nav etc.) from global.css.
 */
export default function LandingPage() {
  const [theme, setTheme]       = useState("light");
  const [plan, setPlan]         = useState("weekly");
  const [modalOpen, setModalOpen] = useState(false);

  // ── Init theme ──────────────────────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem("mcgray-theme");
    const sys    = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark" : "light";
    const initial = stored || sys;
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("mcgray-theme", next);
      return next;
    });
  }, []);

  // ── Scroll to perks ─────────────────────────────────────────
  const scrollToPerks = () => {
    document.querySelector(".hero__perks")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // ── Render ──────────────────────────────────────────────────
  return (
    <>
      {/* ── Navbar ── */}
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="nav__inner">
          <a href="/" className="nav__logo" aria-label="McGray Juice home">
            <div className="nav__logo-wordmark">
              <span className="nav__logo-mc">Mc</span>
              <span className="nav__logo-gray">Gray</span>
              <span className="nav__logo-dot" aria-hidden="true" />
            </div>
          </a>

          <button
            className="nav__toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <SunIcon />
            <MoonIcon />
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero" aria-label="Subscribe to McGray Juice">
        <div className="hero__inner">

          {/* Badge */}
          <span className="hero__badge">
            <span className="badge-dot" aria-hidden="true" />
            Delivering across Nairobi
          </span>

          {/* Headline */}
          <h1 className="hero__headline">
            Cold-pressed juice,<br />
            <em>fresh to your door</em><br />
            every <span className="hl-accent">week.</span>
          </h1>

          {/* Sub */}
          <p className="hero__sub">
            Pick your plan. We squeeze, pack, and deliver — you just drink.
          </p>

          {/* Plan toggle */}
          <div className="plan-toggle" role="group" aria-label="Subscription plan">
            {["weekly", "monthly"].map((p) => (
              <button
                key={p}
                className={`plan-btn${plan === p ? " active" : ""}`}
                onClick={() => setPlan(p)}
                aria-pressed={plan === p}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
                {p === "monthly" && (
                  <span className="save-badge">Save 20%</span>
                )}
              </button>
            ))}
          </div>

          {/* Price */}
          <PriceDisplay plan={plan} />

          {/* Perks */}
          <ul className="hero__perks" aria-label="What's included">
            {PERKS.map((perk) => (
              <li key={perk} className="perk">
                <span className="perk-tick" aria-hidden="true">✓</span>
                {perk}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hero__actions">
            <button
              className="btn-sub"
              onClick={() => setModalOpen(true)}
            >
              Start my subscription →
            </button>
            <button className="btn-ghost-link" onClick={scrollToPerks}>
              What's in the box?
            </button>
          </div>

          {/* Trust strip */}
          <div className="hero__trust">
            {TRUST.map(({ icon, label }) => (
              <div key={label} className="trust-item">
                <span className="trust-icon" aria-hidden="true">{icon}</span>
                {label}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Modal ── */}
      <SubscribeModal
        plan={plan}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}