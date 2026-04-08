import "./Say.css";

/* ── SVG Icons ─────────────────────────────────────────────
   Inline SVGs use CSS custom properties from the global
   design system so they adapt to light / dark mode.
   ─────────────────────────────────────────────────────── */

const IconPlan = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="8" y="4" width="16" height="20" rx="4" fill="var(--green-200)" stroke="var(--green-500)" strokeWidth="1.5" />
    <path d="M11 10h10M11 14h7M11 18h5" stroke="var(--green-600)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="23" cy="23" r="5" fill="var(--orange-400)" />
    <path d="M21 23l1.5 1.5L25 21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSchedule = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="4" y="6" width="24" height="22" rx="4" fill="var(--green-100)" stroke="var(--green-500)" strokeWidth="1.5" />
    <rect x="4" y="6" width="24" height="8" rx="4" fill="var(--green-200)" stroke="var(--green-500)" strokeWidth="1.5" />
    <path d="M10 4v4M22 4v4" stroke="var(--green-600)" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="10" y="20" width="4" height="4" rx="1" fill="var(--orange-400)" />
    <rect x="18" y="20" width="4" height="4" rx="1" fill="var(--green-400)" />
    <rect x="10" y="14" width="4" height="4" rx="1" fill="var(--green-300)" />
    <rect x="18" y="14" width="4" height="4" rx="1" fill="var(--orange-300)" />
  </svg>
);

const IconDeliver = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="2" y="16" width="28" height="12" rx="4" fill="var(--green-100)" stroke="var(--green-500)" strokeWidth="1.5" />
    <path d="M6 16v-5a6 6 0 0 1 12 0" stroke="var(--green-500)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="28" r="3" fill="var(--neutral-400)" />
    <circle cx="22" cy="28" r="3" fill="var(--neutral-400)" />
    <path d="M18 20h6M18 23h4" stroke="var(--green-600)" strokeWidth="1.25" strokeLinecap="round" />
    <circle cx="10" cy="20" r="2" fill="var(--orange-400)" />
    <path d="M9 20l.8.8L12 18.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Data ──────────────────────────────────────────────────── */

const STEPS = [
  {
    id: "01",
    icon: <IconPlan />,
    title: "Choose Your Plan",
    desc: "Walk in for an instant fresh blend or subscribe for regular, scheduled delivery — your call.",
    featured: false,
  },
  {
    id: "02",
    icon: <IconSchedule />,
    title: "Set Your Schedule",
    desc: "Pick daily or weekly deliveries. Customize your juice blend, skip a week, or pause anytime.",
    featured: true,
    featuredLabel: "Most Popular",
  },
  {
    id: "03",
    icon: <IconDeliver />,
    title: "We Deliver Fresh",
    desc: "Cold-pressed and sealed the same morning — at your door before you start your day.",
    featured: false,
  },
];

const PERKS = [
  { label: "No preservatives", accent: false },
  { label: "Cancel anytime", accent: false },
  { label: "Same-day freshness", accent: true },
  { label: "Free delivery over KSh 1,500", accent: false },
];

/* ── Component ─────────────────────────────────────────────── */

export const HowItWorks = () => {
  return (
    <section className="how section">
      <div className="container">

        {/* ── HEADER ── */}
        <div className="how__header">
          <span className="badge badge--green">✦ How It Works</span>
          <h2 className="how__title">
            Simple, <em>Fresh</em>, Reliable
          </h2>
          <p className="how__subtitle">
            From your first sip to your weekly ritual — getting McGray Juice is effortless.
          </p>
        </div>

        {/* ── STEPS ── */}
        <div className="how__steps">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={`how__step card${step.featured ? " how__step--featured" : ""}`}
            >
              {step.featured && (
                <span className="how__featured-label">{step.featuredLabel}</span>
              )}

              <div className="how__num">{step.id}</div>

              <div className="how__icon-wrap">{step.icon}</div>

              <div className="how__step-content">
                <h3 className="how__step-title">{step.title}</h3>
                <p className="how__step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── PERKS STRIP ── */}
        <div className="how__perks">
          {PERKS.map((perk) => (
            <span key={perk.label} className="how__perk">
              <span className={`how__perk-dot${perk.accent ? " how__perk-dot--orange" : ""}`} />
              {perk.label}
            </span>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="how__cta">
          <div className="how__cta-group">
            <button className="btn btn--primary btn--lg">
              Start Subscription
            </button>
            <button className="btn btn--ghost btn--lg">
              Browse Blends
            </button>
          </div>
          <p className="how__cta-note">
            <span className="how__cta-note-dot" />
            First delivery within 24 hours
            &nbsp;·&nbsp;
            <span className="how__cta-note-dot" />
            No commitment required
          </p>
        </div>

      </div>
    </section>
  );
};