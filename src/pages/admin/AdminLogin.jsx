import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === '1') {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const validUser = import.meta.env.VITE_ADMIN_USER;
    const validPass = import.meta.env.VITE_ADMIN_PASS;

    setTimeout(() => {
      if (username === validUser && password === validPass) {
        sessionStorage.setItem('admin_auth', '1');
        sessionStorage.setItem('admin_user', username);
        navigate('/admin', { replace: true });
      } else {
        setError('Invalid username or password. Please try again.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
      padding: '1rem',
    }}>
      {/* Background geometric decoration */}
      <div style={{
        position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none',
      }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            border: '1px solid rgba(255,255,255,0.04)',
            borderRadius: '50%',
            width: `${200 + i * 120}px`,
            height: `${200 + i * 120}px`,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }} />
        ))}
      </div>

      <div style={{
        width: '100%', maxWidth: '420px',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '20px',
        padding: '2.5rem',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
        position: 'relative',
      }}>
        {/* Logo / Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px', height: '64px',
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 8px 24px rgba(37,99,235,0.4)',
          }}>
            <ShieldCheck size={32} color="#fff" />
          </div>
          <h1 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 4px' }}>
            NBKRIST Admin
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', margin: 0 }}>
            Management Portal — Authorized Access Only
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.15)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            color: '#fca5a5', fontSize: '0.875rem',
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {/* Username */}
          <div>
            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 500, display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)' }} />
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                autoComplete="username"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem 0.75rem 2.75rem',
                  color: '#fff', fontSize: '0.95rem',
                  outline: 'none', transition: 'border 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(37,99,235,0.7)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 500, display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)' }} />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoComplete="current-password"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '10px',
                  padding: '0.75rem 3rem 0.75rem 2.75rem',
                  color: '#fff', fontSize: '0.95rem',
                  outline: 'none', transition: 'border 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(37,99,235,0.7)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(255,255,255,0.4)', padding: '2px',
              }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '0.5rem',
              background: loading ? 'rgba(37,99,235,0.5)' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              color: '#fff', border: 'none', borderRadius: '10px',
              padding: '0.85rem', fontSize: '0.95rem', fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: loading ? 'none' : '0 4px 15px rgba(37,99,235,0.4)',
            }}
          >
            {loading ? 'Verifying…' : 'Sign In to Admin Portal'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>
          © {new Date().getFullYear()} NBKRIST — Restricted Access
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
