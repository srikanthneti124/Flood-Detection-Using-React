import React from 'react';

function Hero() {
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <p className="eyebrow">Real-Time Flood Alert Navigation System</p>
        <h1>
          Travel smart during heavy rainfall with
          {' '}
          <span className="accent">live flood intelligence</span>
        </h1>
        <p className="muted">
          Visualize waterlogged roads, understand rainfall intensity, and pick safer routes.
          Built for commuters, emergency responders, and smart city teams.
        </p>
        <div className="hero-actions">
          <button className="primary" onClick={() => scrollToId('weather')}>Explore Map & Weather</button>
          <button className="ghost" onClick={() => scrollToId('auth')}>Get Alerts</button>
        </div>
        <div className="hero-highlights">
          <div>
            <p className="stat-value">120+</p>
            <p className="stat-label">Cities monitored</p>
          </div>
          <div>
            <p className="stat-value">6 sec</p>
            <p className="stat-label">Alert refresh cycle</p>
          </div>
          <div>
            <p className="stat-value">4.9/5</p>
            <p className="stat-label">Reliability rating</p>
          </div>
        </div>
      </div>
      <div className="hero-card">
        <div className="status-dot online" />
        <p className="hero-card-title">Live flood radar</p>
        <div className="hero-radar">
          <div className="radar-sweep" />
          <div className="radar-ping ping-1" />
          <div className="radar-ping ping-2" />
          <div className="radar-ping ping-3" />
        </div>
        <div className="hero-badges">
          <span className="badge badge-high">High risk • Downtown</span>
          <span className="badge badge-medium">Moderate • Riverside</span>
          <span className="badge badge-low">Low • Uptown</span>
        </div>
        <p className="muted small-text">Frontend-only simulation showing how alerts pulse in real time.</p>
      </div>
    </section>
  );
}

export default Hero;
