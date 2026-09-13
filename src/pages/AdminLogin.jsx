import { useEffect, useState } from 'react';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { user, profile, loading, login, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { if (!loading && user && profile?.role === 'admin') navigate('/admin', { replace: true }); }, [loading, profile, user, navigate]);
    const submit = async (event) => { event.preventDefault(); setBusy(true); setError(''); const result = await login(email.trim(), password); setBusy(false); if (result.error) { setError(result.error.message || 'Unable to sign in.'); return; } };
  return <div className="admin-login-page"><section className="admin-login-card"><div className="admin-login-icon"><ShieldCheck size={28} /></div><div className="section-kicker">Secure console</div><h1>ML Explorer Admin</h1><p>Administration & Laboratory Management</p>{!isConfigured && <div className="inline-error">Supabase is not configured. Add the public URL and anon key first.</div>}{error && <div className="inline-error">{error}</div>}{user && profile && profile.role !== 'admin' && <div className="inline-error">Access denied. Administrator privileges required.</div>}<form onSubmit={submit} className="auth-form"><div className="field"><label htmlFor="admin-email">Email</label><input id="admin-email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required /></div><div className="field"><label htmlFor="admin-password">Password</label><div className="admin-password-field"><input id="admin-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></div><button className="action-btn primary" type="submit" disabled={busy || !isConfigured}>{busy ? 'Signing in...' : 'Sign In'}</button></form><button className="admin-back-link" type="button" onClick={() => navigate('/')}>Return to ML Explorer</button></section></div>;
}
