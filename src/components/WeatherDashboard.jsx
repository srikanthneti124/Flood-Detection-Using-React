import React, { useEffect, useMemo, useState } from 'react';

const defaultCity = 'Hyderabad';

const conditionIcon = (code) => {
  if (code === undefined || code === null) return '☁️';
  if (code === 0) return '☀️';
  if ([1, 2, 3].includes(code)) return '⛅';
  if ([45, 48].includes(code)) return '🌫️';
  if ([51, 53, 55, 61, 63, 65].includes(code)) return '🌧️';
  if ([71, 73, 75].includes(code)) return '❄️';
  if ([80, 81, 82].includes(code)) return '⛈️';
  return '🌦️';
};

function WeatherDashboard() {
  const [query, setQuery] = useState(defaultCity);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const precipitationRisk = useMemo(() => {
    if (!weather?.precipitation) return 'low';
    if (weather.precipitation >= 15) return 'high';
    if (weather.precipitation >= 5) return 'medium';
    return 'low';
  }, [weather]);

  const fetchWeather = async (city) => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();
      const place = geoData?.results?.[0];
      if (!place) {
        throw new Error('Location not found. Try a nearby city.');
      }
      const { latitude, longitude, name, country } = place;
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=precipitation&timezone=auto`);
      const weatherData = await weatherRes.json();
      const precipitation = weatherData?.hourly?.precipitation?.[0] ?? 0;
      setLocation({ name, country, latitude, longitude });
      setWeather({
        temperature: weatherData?.current_weather?.temperature,
        wind: weatherData?.current_weather?.windspeed,
        time: weatherData?.current_weather?.time,
        precipitation,
        code: weatherData?.current_weather?.weathercode
      });
    } catch (err) {
      setError(err.message || 'Unable to load weather.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(defaultCity);
  }, []);

  return (
    <div className="weather-card">
      <div className="weather-search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any city or locality"
          aria-label="Search city"
        />
        <button className="primary" onClick={() => fetchWeather(query)} disabled={loading}>
          {loading ? 'Loading...' : 'Get weather'}
        </button>
      </div>
      {error && <p className="form-status error">{error}</p>}
      <div className="weather-grid">
        <div className="weather-main">
          <div className="weather-head">
            <div>
              <p className="eyebrow">Current snapshot</p>
              <h3>{location ? `${location.name}, ${location.country}` : 'Search a location'}</h3>
              {weather?.time && <p className="muted small-text">Updated {new Date(weather.time).toLocaleTimeString()}</p>}
            </div>
            <div className={`badge badge-${precipitationRisk}`}>
              {precipitationRisk === 'high' && 'High rainfall risk'}
              {precipitationRisk === 'medium' && 'Moderate rainfall'}
              {precipitationRisk === 'low' && 'Low rainfall'}
            </div>
          </div>
          <div className="weather-meta">
            <div>
              <p className="stat-value">
                {weather ? `${weather.temperature}°C` : '--'}
                <span className="icon">{conditionIcon(weather?.code)}</span>
              </p>
              <p className="stat-label">Temperature</p>
            </div>
            <div>
              <p className="stat-value">{weather ? `${weather.wind} km/h` : '--'}</p>
              <p className="stat-label">Wind speed</p>
            </div>
            <div>
              <p className="stat-value">{weather ? `${weather.precipitation} mm` : '--'}</p>
              <p className="stat-label">Precipitation (next hour)</p>
            </div>
          </div>
          <div className="weather-bar">
            <div className="bar-track">
              <div
                className={`bar-fill ${precipitationRisk}`}
                style={{ width: `${Math.min(weather?.precipitation ?? 0, 20) * 5}%` }}
              />
            </div>
            <p className="muted small-text">Visualization of rainfall intensity to gauge flooding risk.</p>
          </div>
        </div>
        <div className="weather-side">
          <p className="eyebrow">Flood cues</p>
          <ul className="bullet-list">
            <li>Red: roads likely submerged, avoid if possible.</li>
            <li>Orange: ponding expected; proceed with caution.</li>
            <li>Green: no active flooding; maintain awareness.</li>
            <li>Simulated user flags appear in alerts below.</li>
          </ul>
          <div className="mini-map">
            <div className="legend">
              <span className="dot high" /> High
              <span className="dot medium" /> Medium
              <span className="dot low" /> Low
            </div>
            <div className="map-grid">
              <span className="cell high" />
              <span className="cell medium" />
              <span className="cell low" />
              <span className="cell medium" />
              <span className="cell low" />
              <span className="cell high" />
            </div>
            <p className="muted small-text">Map styling placeholder for a real basemap integration.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDashboard;
