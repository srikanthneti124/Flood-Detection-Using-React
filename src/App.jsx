import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AuthForms from './components/AuthForms';
import WeatherDashboard from './components/WeatherDashboard';
import FloodAlerts from './components/FloodAlerts';
import NavigationAssistant from './components/NavigationAssistant';
import InfoSections from './components/InfoSections';
import Footer from './components/Footer';

const mockReportedFloods = [
  { id: 1, location: 'Downtown Ring Road', severity: 'high', description: 'Water above knee level reported by 12 commuters', updatedAt: '2 mins ago' },
  { id: 2, location: 'Riverside Avenue', severity: 'medium', description: 'Drain overflow causing slow traffic', updatedAt: '7 mins ago' },
  { id: 3, location: 'Tech Park Underpass', severity: 'low', description: 'Puddle forming near exit 4', updatedAt: '15 mins ago' }
];

const safeRoutes = [
  { id: 'A12', label: 'Ring Road → Central Plaza', status: 'safe', eta: '18 mins', advisory: 'Light drizzle only' },
  { id: 'B08', label: 'Metro Line → Tech Park', status: 'caution', eta: '24 mins', advisory: 'Watch for standing water near Gate 3' },
  { id: 'C21', label: 'Harbor Bridge → Old Town', status: 'flooded', eta: '—', advisory: 'Bridge entry closed due to flooding' }
];

function App() {
  const [authMode, setAuthMode] = useState('login');
  const alertsBySeverity = useMemo(() => ({
    high: mockReportedFloods.filter((a) => a.severity === 'high'),
    medium: mockReportedFloods.filter((a) => a.severity === 'medium'),
    low: mockReportedFloods.filter((a) => a.severity === 'low')
  }), []);

  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero />
        <InfoSections />
        <section id="auth" className="section-panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Access Controls</p>
              <h2>Sign in to personalize alerts</h2>
              <p className="muted">Frontend-only authentication UI with inline validation.</p>
            </div>
            <div className="pill-toggle">
              <button className={authMode === 'login' ? 'active' : ''} onClick={() => setAuthMode('login')}>Log in</button>
              <button className={authMode === 'signup' ? 'active' : ''} onClick={() => setAuthMode('signup')}>Sign up</button>
            </div>
          </div>
          <AuthForms mode={authMode} />
        </section>

        <section id="weather" className="section-panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Live Weather</p>
              <h2>Real-time meteorological signals</h2>
              <p className="muted">Global coverage powered by a public API with safe frontend handling.</p>
            </div>
          </div>
          <WeatherDashboard />
        </section>

        <section id="alerts" className="section-panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Flood Intelligence</p>
              <h2>Visualize high-risk zones instantly</h2>
              <p className="muted">Color-coded indicators for situational awareness.</p>
            </div>
          </div>
          <FloodAlerts alerts={mockReportedFloods} grouped={alertsBySeverity} />
        </section>

        <section id="routes" className="section-panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Navigation Assist</p>
              <h2>Stay on the safest path</h2>
              <p className="muted">Route indicators, simulated closures, and proactive warnings.</p>
            </div>
          </div>
          <NavigationAssistant routes={safeRoutes} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
