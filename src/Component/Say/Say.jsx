import "./Say.css";

export const HowItWorks = () => {
  return (
    <section className="how section">
      <div className="container">

        {/* ── HEADER ── */}
        <div className="how__header text-center">
          <span className="badge badge--green">How It Works</span>
          <h2>Simple, Fresh, Reliable</h2>
          <p>
            Getting your juice is easy — choose your plan and enjoy fresh delivery.
          </p>
        </div>

        {/* ── STEPS ── */}
        <div className="how__steps">

          {/* STEP 1 */}
          <div className="how__step card">
            <div className="how__icon">🥤</div>
            <h3>Choose Your Plan</h3>
            <p>
              Walk in for instant juice or subscribe for regular delivery.
            </p>
          </div>

          {/* STEP 2 */}
          <div className="how__step card how__step--featured">
            <div className="how__icon">📅</div>
            <h3>Set Your Schedule</h3>
            <p>
              Pick daily or weekly delivery and customize your juice selection.
            </p>
          </div>

          {/* STEP 3 */}
          <div className="how__step card">
            <div className="how__icon">🚚</div>
            <h3>We Deliver Fresh</h3>
            <p>
              Your juice arrives fresh at your doorstep — no stress.
            </p>
          </div>

        </div>

        {/* ── CTA ── */}
        <div className="how__cta text-center">
          <button className="btn btn--primary btn--lg">
            Start Subscription
          </button>
        </div>

      </div>
    </section>
  );
};