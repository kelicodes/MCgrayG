import { useState } from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "1,200",
    period: "/ week",
    tagline: "Perfect for beginners starting their health journey.",
    juices: 3,
    features: ["3 juices per week", "Delivery every 3 days", "Fixed flavors"],
    cta: "Get Started",
    btnClass: "btn btn--ghost",
  },
  {
    id: "standard",
    name: "Standard",
    price: "2,000",
    period: "/ week",
    tagline: "Best for consistency and daily healthy living.",
    juices: 5,
    features: ["5 juices per week", "Delivery every 3 days", "Choose your flavors", "Free delivery"],
    cta: "Start Plan",
    btnClass: "btn btn--primary",
    featured: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "3,500",
    period: "/ week",
    tagline: "For serious health lovers & fitness routines.",
    juices: 7,
    features: ["Daily juice (7/week)", "Priority delivery", "Custom detox plan", "Free weekend juice"],
    cta: "Go Premium",
    btnClass: "btn btn--accent",
  },
];

const benefits = [
  { icon: "🛒", label: "No daily buying stress", sub: "Set it once, enjoy always" },
  { icon: "💸", label: "Save up to 20%", sub: "vs. single orders" },
  { icon: "🚚", label: "Reliable delivery", sub: "Rain or shine, on time" },
  { icon: "🥗", label: "Stay consistent", sub: "Health goals on autopilot" },
];

export const SubscriptionPage = () => {
     const navigate=useNavigate()
   
  return (
    <section className="subscription section">
      <style>{`
        /* ══ SUBSCRIPTION PAGE — uses global design tokens ══ */

        .subscription {
          background: var(--bg-base);
          transition: background-color var(--duration-slow) var(--ease-out);
        }

        /* ── HERO ── */
        .subscription__hero {
          max-width: 640px;
          margin: 0 auto var(--space-16);
          animation: sub-fade-up 0.7s var(--ease-out) both;
        }

        .subscription__hero h1 {
          font-size: clamp(2.4rem, 6vw, 4.5rem);
          color: var(--fg-primary);
          margin-top: var(--space-6);
          margin-bottom: var(--space-5);
        }

        .subscription__hero h1 em {
          color: var(--brand-primary);
          font-style: italic;
        }

        .subscription__hero > p {
          font-size: var(--text-md);
          color: var(--fg-secondary);
          line-height: var(--leading-loose);
          margin-bottom: 0;
        }

        /* OFFER BADGE */
        .subscription__offer {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          background: var(--green-100);
          color: var(--green-700);
          padding: var(--space-2) var(--space-5);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          font-weight: 600;
          border: 1px solid var(--green-200);
          transition: background var(--duration-slow) var(--ease-out),
                      color var(--duration-slow) var(--ease-out);
        }

        [data-theme="dark"] .subscription__offer,
        .dark .subscription__offer {
          background: rgba(31, 158, 60, 0.15);
          color: var(--green-300);
          border-color: rgba(31, 158, 60, 0.25);
        }

        .subscription__offer-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--brand-primary);
          animation: sub-pulse 2s ease infinite;
          flex-shrink: 0;
        }

        /* HERO DIVIDER */
        .subscription__hero-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
          margin-top: var(--space-8);
        }

        .subscription__hero-divider span:not(.subscription__hero-leaf) {
          display: block;
          width: 72px;
          height: 1px;
          background: var(--border-default);
        }

        /* ── PLANS GRID ── */
        .subscription__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-6);
          align-items: start;
          margin-bottom: var(--space-20);
        }

        /* ── CARD ── */
        .subscription__card {
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition:
            transform var(--duration-base) var(--ease-spring),
            box-shadow var(--duration-base) var(--ease-out),
            border-color var(--duration-base) var(--ease-out),
            background-color var(--duration-slow) var(--ease-out);
          animation: sub-fade-up 0.6s var(--ease-out) both;
        }

        .subscription__card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
          border-color: var(--border-default);
        }

        /* FEATURED CARD */
        .subscription__card--featured {
          border: 2px solid var(--brand-primary);
          box-shadow: var(--shadow-md), var(--glow-green);
          transform: translateY(-10px);
        }

        .subscription__card--featured:hover {
          transform: translateY(-16px);
          box-shadow: var(--shadow-xl), var(--glow-green);
        }

        /* TOP ACCENT BAR */
        .subscription__card-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--border-subtle);
          transition: background var(--duration-slow) var(--ease-out);
        }

        .subscription__card--featured .subscription__card-bar {
          background: linear-gradient(90deg, var(--green-500), var(--green-300));
        }

        /* BADGE POSITION */
        .subscription__card .badge {
          position: absolute;
          top: var(--space-5);
          right: var(--space-5);
        }

        /* JUICE DOTS VISUALISER */
        .subscription__juice-dots {
          display: flex;
          align-items: flex-end;
          gap: 5px;
          height: 24px;
          margin-bottom: var(--space-5);
        }

        .subscription__juice-dot {
          border-radius: var(--radius-full);
          background: var(--brand-primary);
          width: 9px;
          flex-shrink: 0;
          transition: background var(--duration-slow) var(--ease-out);
        }

        /* PLAN NAME */
        .subscription__plan-name {
          font-family: var(--font-brand);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--fg-primary);
          letter-spacing: -0.02em;
          margin-bottom: var(--space-3);
          transition: color var(--duration-slow) var(--ease-out);
        }

        /* PRICE ROW */
        .subscription__price-row {
          display: flex;
          align-items: baseline;
          gap: var(--space-1);
          margin-bottom: var(--space-2);
        }

        .subscription__price-currency {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--fg-muted);
          letter-spacing: 0.05em;
        }

        .subscription__price-amount {
          font-family: var(--font-brand);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: var(--fg-primary);
          line-height: 1;
          letter-spacing: -0.03em;
          transition: color var(--duration-slow) var(--ease-out);
        }

        .subscription__price-period {
          font-size: var(--text-sm);
          color: var(--fg-muted);
        }

        /* TAGLINE */
        .subscription__card-tagline {
          font-size: var(--text-sm);
          color: var(--fg-muted);
          margin-bottom: var(--space-5);
          line-height: var(--leading-normal);
        }

        /* DIVIDER */
        .subscription__card-divider {
          height: 1px;
          background: var(--border-subtle);
          margin-bottom: var(--space-5);
          transition: background var(--duration-slow) var(--ease-out);
        }

        /* FEATURES */
        .subscription__features {
          list-style: none;
          padding: 0;
          margin: 0 0 var(--space-6) 0;
        }

        .subscription__features li {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          font-size: var(--text-sm);
          color: var(--fg-secondary);
          padding: var(--space-2) 0;
          line-height: var(--leading-normal);
          transition: color var(--duration-slow) var(--ease-out);
        }

        .subscription__check {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--green-100);
          color: var(--green-700);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          flex-shrink: 0;
          transition: background var(--duration-slow) var(--ease-out),
                      color var(--duration-slow) var(--ease-out);
        }

        [data-theme="dark"] .subscription__check,
        .dark .subscription__check {
          background: rgba(31, 158, 60, 0.18);
          color: var(--green-300);
        }

        /* ── WHY SECTION ── */
        .subscription__why {
          animation: sub-fade-up 0.7s var(--ease-out) 0.15s both;
        }

        .subscription__why-eyebrow {
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--brand-primary);
          margin-bottom: var(--space-3);
        }

        .subscription__why h2 {
          font-size: clamp(1.8rem, 4vw, 3rem);
          color: var(--fg-primary);
          margin-bottom: var(--space-10);
          transition: color var(--duration-slow) var(--ease-out);
        }

        /* BENEFITS GRID */
        .subscription__benefits {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: var(--space-4);
        }

        .subscription__benefit {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          text-align: left;
          cursor: default;
          transition:
            transform var(--duration-base) var(--ease-spring),
            box-shadow var(--duration-base) var(--ease-out),
            border-color var(--duration-base) var(--ease-out),
            background-color var(--duration-slow) var(--ease-out);
        }

        .subscription__benefit:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: var(--brand-primary);
          background: var(--bg-elevated);
        }

        .subscription__benefit-icon {
          font-size: 1.75rem;
          margin-bottom: var(--space-3);
          line-height: 1;
        }

        .subscription__benefit-label {
          font-family: var(--font-brand);
          font-size: var(--text-md);
          font-weight: 700;
          color: var(--fg-primary);
          margin-bottom: var(--space-1);
          transition: color var(--duration-slow) var(--ease-out);
        }

        .subscription__benefit-sub {
          font-size: var(--text-sm);
          color: var(--fg-muted);
          line-height: var(--leading-normal);
          transition: color var(--duration-slow) var(--ease-out);
        }

        /* FOOTER NOTE */
        .subscription__footer-note {
          text-align: center;
          font-size: var(--text-sm);
          color: var(--fg-muted);
          margin-top: var(--space-12);
          letter-spacing: 0.03em;
          transition: color var(--duration-slow) var(--ease-out);
        }

        /* ANIMATIONS */
        @keyframes sub-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes sub-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(0.8); }
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .subscription__card--featured {
            transform: translateY(0);
          }
          .subscription__card--featured:hover {
            transform: translateY(-8px);
          }
          .subscription__grid {
            gap: var(--space-4);
          }
        }
      `}</style>

      <div className="container">

     
        {/* ── HERO ── */}
        <div  className="subscription__hero text-center">
          <div className="subscription__offer">
            <span className="subscription__offer-dot" />
            🎁 2 FREE juices on your first subscription
          </div>

          <h1>
            Stay Healthy,<br />
            <em>Effortlessly.</em>
          </h1>

          <p>
            Fresh cold-pressed juice delivered every 3 days.<br />
            No waste. No stress. Pure vitality, on repeat.
          </p>

          <div className="subscription__hero-divider">
            <span />
            <span className="subscription__hero-leaf">🌿</span>
            <span />
          </div>
        </div>

        {/* ── PLANS ── */}
        <div className="subscription__grid">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              className={`subscription__card${plan.featured ? " subscription__card--featured" : ""}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="subscription__card-bar" />

              {plan.featured && (
                <span className="badge badge--green">Most Popular</span>
              )}

              {/* Juice count visualiser */}
              <div className="subscription__juice-dots">
                {Array.from({ length: plan.juices }).map((_, j) => (
                  <div
                    key={j}
                    className="subscription__juice-dot"
                    style={{
                      height: `${40 + (j / plan.juices) * 60}%`,
                      opacity: 0.3 + (j / plan.juices) * 0.7,
                    }}
                  />
                ))}
              </div>

              <div className="subscription__plan-name">{plan.name}</div>

              <div className="subscription__price-row">
                <span className="subscription__price-currency">KES</span>
                <span className="subscription__price-amount">{plan.price}</span>
                <span className="subscription__price-period">{plan.period}</span>
              </div>

              <p className="subscription__card-tagline">{plan.tagline}</p>

              <div className="subscription__card-divider" />

              <ul className="subscription__features">
                {plan.features.map((f, fi) => (
                  <li key={fi}>
                    <span className="subscription__check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

             <button
  onClick={() => navigate("/check", { state: plan })}
  className={`${plan.btnClass} btn--lg`}
  style={{ width: "100%" }}
>
  {plan.cta} →
</button>
            </div>
          ))}
        </div>

        {/* ── WHY SECTION ── */}
        <div className="subscription__why text-center">
          <div className="subscription__why-eyebrow">The Subscription Difference</div>
          <h2>Why go on subscription?</h2>

          <div className="subscription__benefits">
            {benefits.map((b, i) => (
              <div key={i} className="subscription__benefit">
                <div className="subscription__benefit-icon">{b.icon}</div>
                <div className="subscription__benefit-label">{b.label}</div>
                <div className="subscription__benefit-sub">{b.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="subscription__footer-note">
          Cancel anytime · No hidden fees · Fresh ingredients always
        </p>

      </div>
    </section>
  );
};

export default SubscriptionPage;