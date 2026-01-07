import React, { useMemo, useState } from 'react';

const initialState = { name: '', email: '', password: '', confirm: '' };

function AuthForms({ mode = 'login' }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const fields = useMemo(() => (mode === 'signup'
    ? ['name', 'email', 'password', 'confirm']
    : ['email', 'password']), [mode]);

  const validate = () => {
    const nextErrors = {};
    if (fields.includes('name') && !form.name.trim()) {
      nextErrors.name = 'Name is required';
    }
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      nextErrors.email = 'Enter a valid email address';
    }
    if (form.password.length < 8) {
      nextErrors.password = 'Use at least 8 characters';
    }
    if (fields.includes('confirm') && form.password !== form.confirm) {
      nextErrors.confirm = 'Passwords must match';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStatus(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const message = mode === 'signup'
      ? 'Account created locally. Connect backend to persist.'
      : 'Login simulated. Wire to auth provider to go live.';
    setStatus({ type: 'success', message });
  };

  return (
    <div className="auth-grid">
      <div className="auth-panel">
        <div className="pill pill-soft">UI only</div>
        <h3>{mode === 'signup' ? 'Create account' : 'Welcome back'}</h3>
        <p className="muted">Frontend validation prevents invalid submissions.</p>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {fields.includes('name') && (
            <label>
              Full name
              <input
                type="text"
                placeholder="Alex Rivers"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                aria-invalid={!!errors.name}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </label>
          )}
          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              aria-invalid={!!errors.email}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              aria-invalid={!!errors.password}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </label>
          {fields.includes('confirm') && (
            <label>
              Confirm password
              <input
                type="password"
                placeholder="Re-enter password"
                value={form.confirm}
                onChange={(e) => handleChange('confirm', e.target.value)}
                aria-invalid={!!errors.confirm}
              />
              {errors.confirm && <span className="field-error">{errors.confirm}</span>}
            </label>
          )}
          <button type="submit" className="primary full-width">
            {mode === 'signup' ? 'Create account' : 'Sign in'}
          </button>
          {status && (
            <p className={`form-status ${status.type}`}>
              {status.message}
            </p>
          )}
        </form>
        <div className="helper">
          <p className="muted small-text">
            Want MFA, SSO, or passwordless? Plug this UI into your auth backend.
          </p>
        </div>
      </div>
      <div className="auth-side">
        <div className="side-card">
          <p className="eyebrow">Security posture</p>
          <h4>Risk-aware journeys</h4>
          <ul className="bullet-list">
            <li>Client-side validation for instant feedback</li>
            <li>Form-ready for OAuth/JWT integration</li>
            <li>Accessible inputs with clear focus states</li>
            <li>Inline states for success, warning, or error</li>
          </ul>
        </div>
        <div className="side-card compact">
          <p className="eyebrow">Reminder</p>
          <p className="muted small-text">
            This is a frontend-only simulation. No credentials are stored or transmitted.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthForms;
