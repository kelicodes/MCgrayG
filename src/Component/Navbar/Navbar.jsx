import { useState, useEffect, useCallback } from "react";
import "./Navbar.css";

// ── ICONS ─────────────────────────────────────────────────────

const SunIcon = () => (
  <svg
    className="mcgray-nav__icon-sun"
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
    className="mcgray-nav__icon-moon"
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

// ── NAV LINKS CONFIG ──────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "Menu",     href: "/menu" },
  { label: "About",    href: "/about" },
  { label: "Branches", href: "/branches" },
  { label: "Contact",  href: "/contact" },
];

// ── COMPONENT ─────────────────────────────────────────────────

/**
 * McGray Juice — Navbar
 *
 * Props:
 *  @param {string}   activePath      - Current route path (e.g. "/menu")
 *  @param {boolean}  showAnnounce    - Show the top announcement bar
 *  @param {string}   announceText    - Text for the announcement bar
 *  @param {function} onOrderClick    - Called when the "Order Now" CTA is clicked
 */
export default function Navbar({
  activePath = "/",
  showAnnounce = false,
  announceText = "🍊 Free delivery on orders over KSh 500 — Limited time!",
  onOrderClick,
}) {
  const [theme, setTheme]           = useState("light");
  const [menuOpen, setMenuOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  // ── Read/apply persisted theme ──────────────────────────────
  useEffect(() => {
    const stored = localStorage.getItem("mcgray-theme");
    const prefersDark =
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  // ── Scroll detection ────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close menu on resize to desktop ─────────────────────────
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Lock body scroll when mobile menu open ──────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Theme toggle ────────────────────────────────────────────
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("mcgray-theme", next);
      return next;
    });
  }, []);

  // ── Helpers ─────────────────────────────────────────────────
  const isActive = (href) => activePath === href;

  const handleMobileLink = () => setMenuOpen(false);

  const handleOrderClick = (e) => {
    if (onOrderClick) {
      e.preventDefault();
      onOrderClick();
    }
    setMenuOpen(false);
  };

  // ── Render ──────────────────────────────────────────────────
  return (
    <>
      {/* ── Announce Bar ── */}
      {showAnnounce && (
        <div className="mcgray-nav__announce-bar" role="banner">
          {announceText}
        </div>
      )}

      {/* ── Main Navbar ── */}
      <nav
        className={`mcgray-nav${scrolled ? " scrolled" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mcgray-nav__inner">

          {/* ── Logo ── */}
          <a
            href="/"
            className="mcgray-nav__logo"
            aria-label="McGray Juice — Home"
          >
            <div className="mcgray-nav__logo-wordmark">
              <span className="mcgray-nav__logo-mc">Mc</span>
              <span className="mcgray-nav__logo-gray">Gray</span>
              <span
                className="mcgray-nav__logo-dot"
                aria-hidden="true"
              />
            </div>
          </a>

          {/* ── Desktop Links ── */}
          <ul className="mcgray-nav__links" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`mcgray-nav__link${isActive(href) ? " active" : ""}`}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Right Actions ── */}
          <div className="mcgray-nav__actions">
            {/* Theme Toggle */}
            <button
              className="mcgray-nav__theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              <SunIcon />
              <MoonIcon />
            </button>

            {/* Desktop CTA */}
            <a
              href="/order"
              className="mcgray-nav__cta mcgray-nav__cta--desktop"
              onClick={handleOrderClick}
              role="button"
            >
              Order Now
            </a>

            {/* Hamburger */}
            <button
              className={`mcgray-nav__hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mcgray-mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className="mcgray-nav__hamburger-line" aria-hidden="true" />
              <span className="mcgray-nav__hamburger-line" aria-hidden="true" />
              <span className="mcgray-nav__hamburger-line" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          id="mcgray-mobile-menu"
          className={`mcgray-nav__mobile-menu${menuOpen ? " open" : ""}`}
          aria-hidden={!menuOpen}
        >
          <ul className="mcgray-nav__mobile-links" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`mcgray-nav__mobile-link${isActive(href) ? " active" : ""}`}
                  aria-current={isActive(href) ? "page" : undefined}
                  onClick={handleMobileLink}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mcgray-nav__mobile-divider" aria-hidden="true" />

          <a
            href="/order"
            className="mcgray-nav__mobile-cta"
            onClick={handleOrderClick}
          >
            Order Now 🍊
          </a>
        </div>
      </nav>
    </>
  );
}