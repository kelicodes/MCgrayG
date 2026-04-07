import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__grid">

        {/* ── BRAND ── */}
        <div className="footer__brand">
          <h3 className="footer__logo">McGray Juice</h3>

          <p className="footer__text">
            Fresh juices made from locally sourced fruits in Nairobi.
            Healthy, natural, and delivered to your doorstep.
          </p>

          <div className="footer__socials">
            <a href="#"><span>🌍</span></a>
            <a href="#"><span>📸</span></a>
            <a href="#"><span>🐦</span></a>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <div className="footer__col">
          <h4 className="footer__title">Services</h4>
          <ul className="footer__links">
            <li><a href="#">Juice Walking</a></li>
            <li><a href="#">Subscriptions</a></li>
            <li><a href="#">Corporate Supply</a></li>
          </ul>
        </div>

        {/* ── QUICK LINKS ── */}
        <div className="footer__col">
          <h4 className="footer__title">Quick Links</h4>
          <ul className="footer__links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Menu</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* ── NEWSLETTER ── */}
        <div className="footer__newsletter card">
          <h4 className="footer__title">Stay Fresh 🍊</h4>

          <p className="footer__text">
            Get updates, offers & healthy juice tips.
          </p>

          <form className="footer__form">
            <input
              type="email"
              placeholder="Enter your email"
              required
            />
            <button type="submit" className="btn btn--primary btn--sm">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* ── DIVIDER ── */}
      <div className="footer__divider"></div>

      {/* ── BOTTOM BAR ── */}
      <div className="container footer__bottom">
        <p>
          © {new Date().getFullYear()} McGray Juice. All rights reserved.
        </p>

        <div className="footer__bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
};