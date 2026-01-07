import React from 'react';

const features = [
  { title: 'Live weather lens', desc: 'Global coverage with precipitation focus and wind telemetry.', tone: 'primary' },
  { title: 'Flood color system', desc: 'Red/Orange/Green chips to instantly judge road safety.', tone: 'warning' },
  { title: 'Crowd pulse', desc: 'Simulated commuter updates to mimic real-world reporting.', tone: 'success' },
  { title: 'Navigation overlay', desc: 'Safe vs flooded route indicators with warning banners.', tone: 'danger' }
];

const steps = [
  'Search your location to fetch live weather and rainfall intensity.',
  'Review flood alerts and community reports mapped to severity colors.',
  'Choose safer routes; flooded paths trigger inline warnings.',
  'Connect to a maps SDK/backend later for production deployments.'
];

function InfoSections() {
  return (
    <section className="section-panel info-section" id="overview">
      <div className="section-header">
        <div>
          <p className="eyebrow">Why this matters</p>
          <h2>Built for real-world commuter safety</h2>
          <p className="muted">A frontend-only, API-ready shell that looks and feels production-grade.</p>
        </div>
      </div>
      <div className="features-grid">
        {features.map((item) => (
          <div key={item.title} className={`feature-card ${item.tone}`}>
            <p className="eyebrow">{item.title}</p>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="how-steps">
        <p className="eyebrow">How it works</p>
        <ol>
          {steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </div>
    </section>
  );
}

export default InfoSections;
