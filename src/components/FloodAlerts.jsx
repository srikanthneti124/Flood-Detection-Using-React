import React from 'react';

const severityCopy = {
  high: { label: 'High', description: 'Severe flooding; reroute immediately.' },
  medium: { label: 'Medium', description: 'Ponding likely; proceed with caution.' },
  low: { label: 'Low', description: 'Minor pooling; stay aware of updates.' }
};

function FloodAlerts({ alerts = [], grouped = {} }) {
  return (
    <div className="alerts-grid">
      <div className="alerts-map">
        <div className="map-header">
          <p className="eyebrow">City overlay</p>
          <div className="legend">
            <span className="dot high" /> High
            <span className="dot medium" /> Medium
            <span className="dot low" /> Low
          </div>
        </div>
        <div className="map-placeholder">
          <div className="pulse pulse-1" />
          <div className="pulse pulse-2" />
          <div className="pulse pulse-3" />
          <p className="muted small-text">Simulated heat-map showing hotspots.</p>
        </div>
        <div className="insight">
          <p className="eyebrow">Situational awareness</p>
          <p className="muted">Flood intelligence aggregates API data and user flags.</p>
          <div className="badge badge-high">Radar: heavy band moving east</div>
          <div className="badge badge-medium">Crowdsourced: 12 reports in last hour</div>
        </div>
      </div>
      <div className="alerts-list">
        <div className="pill pill-soft">Live feed</div>
        <h3>Community & sensor updates</h3>
        <ul className="alert-items">
          {alerts.map((alert) => (
            <li key={alert.id} className={`alert-card ${alert.severity}`}>
              <div className="alert-top">
                <span className={`badge badge-${alert.severity}`}>{severityCopy[alert.severity]?.label}</span>
                <p className="muted small-text">{alert.updatedAt}</p>
              </div>
              <h4>{alert.location}</h4>
              <p className="muted">{alert.description}</p>
            </li>
          ))}
        </ul>
        <div className="alert-summary">
          {['high', 'medium', 'low'].map((level) => (
            <div key={level} className="summary-card">
              <p className="eyebrow">{severityCopy[level].label} risk</p>
              <p className="muted small-text">{severityCopy[level].description}</p>
              <div className={`badge badge-${level}`}>
                {grouped[level]?.length || 0}
                {' '}
                active
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FloodAlerts;
