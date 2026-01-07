import React, { useState } from 'react';

const statusCopy = {
  safe: { label: 'Safe', message: 'Clear to proceed' },
  caution: { label: 'Caution', message: 'Watch for pooling water' },
  flooded: { label: 'Flooded', message: 'Route blocked; pick alternate' }
};

function NavigationAssistant({ routes = [] }) {
  const [selected, setSelected] = useState(routes[0]);
  const [popup, setPopup] = useState(null);

  const handleSelect = (route) => {
    setSelected(route);
    if (route.status === 'flooded') {
      setPopup({ title: 'Flooded route detected', message: route.advisory });
    } else if (route.status === 'caution') {
      setPopup({ title: 'Caution advised', message: 'Reduced speed recommended.' });
    } else {
      setPopup(null);
    }
  };

  return (
    <div className="routes-grid">
      <div className="routes-list">
        <p className="eyebrow">Route options</p>
        <ul>
          {routes.map((route) => (
            <li
              key={route.id}
              className={`route-card ${route.status} ${selected?.id === route.id ? 'active' : ''}`}
              onClick={() => handleSelect(route)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' ? handleSelect(route) : null)}
            >
              <div className="route-head">
                <p className="route-label">{route.label}</p>
                <span className={`badge badge-${route.status}`}>{statusCopy[route.status].label}</span>
              </div>
              <p className="muted small-text">{route.advisory}</p>
              <div className="route-meta">
                <span>ETA: {route.eta}</span>
                <span className="muted">ID {route.id}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="routes-detail">
        <div className="pill pill-soft">Navigation sim</div>
        <h3>Route conditions</h3>
        <p className="muted">
          Tap any route card to preview simulated guidance, closures, and advisories.
          Visual statuses mimic a live navigation app without backend dependencies.
        </p>
        {selected && (
          <div className={`detail-panel ${selected.status}`}>
            <div className="detail-top">
              <div>
                <p className="eyebrow">Selected path</p>
                <h4>{selected.label}</h4>
              </div>
              <div className={`badge badge-${selected.status}`}>{statusCopy[selected.status].label}</div>
            </div>
            <p className="muted">{selected.advisory}</p>
            <div className="detail-meta">
              <span>ETA {selected.eta}</span>
              <span>Route {selected.id}</span>
            </div>
            <button className="primary" onClick={() => setPopup({ title: 'Navigation simulated', message: 'Turn-by-turn preview only. Connect maps SDK to go live.' })}>
              Preview navigation
            </button>
          </div>
        )}
        {popup && (
          <div className="banner warning">
            <div>
              <p className="eyebrow">{popup.title}</p>
              <p className="muted small-text">{popup.message}</p>
            </div>
            <button className="ghost" onClick={() => setPopup(null)}>Dismiss</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavigationAssistant;
