import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div>
        <p className="logo-title">FloodSense</p>
        <p className="muted small-text">Smart city flood awareness dashboard.</p>
      </div>
      <div className="footer-links">
        <a href="#home">Home</a>
        <a href="#weather">Weather</a>
        <a href="#alerts">Alerts</a>
        <a href="#routes">Routes</a>
      </div>
      <div className="footer-contact">
        <p className="muted small-text">Contact: safety@floodsense.app</p>
        <p className="muted small-text">Made for demo purposes. No backend calls beyond public APIs.</p>
      </div>
    </footer>
  );
}

export default Footer;
