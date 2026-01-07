import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="logo-mark">
        <span className="logo-dot" />
        <div>
          <p className="logo-title">FloodSense</p>
          <p className="logo-sub">Real-Time Flood Alert Navigation</p>
        </div>
      </div>
      <nav className="nav">
        <a href="#home">Home</a>
        <a href="#weather">Weather</a>
        <a href="#alerts">Alerts</a>
        <a href="#routes">Routes</a>
        <a href="#auth" className="nav-cta">Get Alerts</a>
      </nav>
    </header>
  );
}

export default Header;
