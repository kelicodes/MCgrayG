import "./Services.css";
import { useNavigate } from "react-router-dom";

export const Services = () => {
  const navigate=useNavigate()
  return (
    <section className="services section">
      <div className="container">

        {/* ── HEADER ── */}
        <div className="services__header text-center">
          <span className="badge badge--green">Our Services</span>
          <h2>Flexible Juice Plans For You</h2>
          <p>
            Choose how you enjoy your juice — instant, recurring, or for your business.
          </p>
        </div>

        {/* ── SERVICES GRID ── */}
        <div className="services__grid">

          {/* WALK-IN */}
          <div className="services__card card">
            <span className="badge badge--orange">Instant</span>

            <h3>Walk-In Orders</h3>
            <p>
              Visit our juice stand and get your drink instantly.
              Perfect for quick, fresh refreshment.
            </p>

            <ul className="services__features">
              <li>⚡ Instant orders</li>
              <li>🚫 No delivery</li>
              <li>💰 Pay on the spot</li>
            </ul>

            <button className="btn btn--ghost btn--sm">
              Find Location
            </button>
          </div>

          {/* SUBSCRIPTIONS (FEATURED) */}
          <div onClick={()=>navigate("/sub")} className="services__card services__card--featured card">
            <span className="badge badge--green">Most Popular</span>

            <h3>Subscriptions</h3>
            <p>
              Get fresh juice delivered daily or weekly.
              Stay consistent with your health routine effortlessly.
            </p>

            <ul className="services__features">
              <li>🚚 Home delivery</li>
              <li>🔁 Recurring plans</li>
              <li>🥤 Custom juice selection</li>
            </ul>

            <button className="btn btn--primary btn--sm">
              Subscribe Now
            </button>
          </div>

          {/* CORPORATE */}
          <div className="services__card card">
            <span className="badge badge--green">Business</span>

            <h3>Corporate Supply</h3>
            <p>
              Provide healthy juice options for your team or events.
              Request a custom quote tailored to your needs.
            </p>

            <ul className="services__features">
              <li>🏢 Bulk supply</li>
              <li>📩 Custom quotes</li>
              <li>🚚 Delivery included</li>
            </ul>

            <button className="btn btn--accent btn--sm">
              Request Quote
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};