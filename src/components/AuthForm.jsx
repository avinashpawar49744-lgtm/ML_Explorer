import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthForm({ mode }) {
  const navigate = useNavigate();
  const { login, register, resetPassword, isConfigured } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const isRegister = mode === 'register';
  const isForgot = mode === 'forgot';
  const submit = async (event) => {
    event.preventDefault();
    setBusy(true); setError(''); setMessage('');
    const result = isRegister ? await register(email, password, fullName) : isForgot ? await resetPassword(email) : await login(email, password);
    setBusy(false);
    if (result.error) { setError(result.error.message); return; }
    if (isForgot) { setMessage('If an account exists, a password reset link has been sent.'); return; }
    if (isRegister) { setMessage('Account created. Check your email if confirmation is enabled.'); return; }
    navigate('/');
  };

  return <section className="auth-card">
    <div className="section-kicker">ML Explorer</div>
    <h1>{isRegister ? 'Create student account' : isForgot ? 'Reset password' : 'Welcome back'}</h1>
    <p className="muted-text">{isRegister ? 'Start your practical learning journey.' : isForgot ? 'Enter your email to receive a secure reset link.' : 'Sign in to continue to the laboratory.'}</p>
    {!isConfigured && <div className="inline-error">Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.</div>}
    <form onSubmit={submit} className="auth-form">
      {isRegister && <div className="field"><label htmlFor="full-name">Full name</label><input id="full-name" value={fullName} onChange={(event) => setFullName(event.target.value)} required /></div>}
      <div className="field"><label htmlFor="auth-email">Email</label><input id="auth-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
      {!isForgot && <div className="field"><label htmlFor="auth-password">Password</label><input id="auth-password" type="password" minLength="6" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>}
      {error && <div className="inline-error">{error}</div>}
      {message && <div className="inline-success">{message}</div>}
      <button className="action-btn primary" type="submit" disabled={busy || !isConfigured}>{busy ? 'Working...' : isRegister ? 'Create account' : isForgot ? 'Send reset link' : 'Sign in'}</button>
    </form>
    <div className="auth-links">{!isRegister && !isForgot && <Link to="/forgot-password">Forgot password?</Link>}{!isRegister && <Link to="/register">Create account</Link>}{isRegister && <Link to="/login">Already have an account?</Link>}{isForgot && <Link to="/login">Back to sign in</Link>}</div>
  </section>;
}
