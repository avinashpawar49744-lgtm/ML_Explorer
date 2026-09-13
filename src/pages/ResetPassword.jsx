import { Link } from 'react-router-dom';

export default function ResetPassword() {
  return <div className="auth-page"><section className="auth-card"><div className="section-kicker">ML Explorer</div><h1>Choose a new password</h1><p className="muted-text">Open this page from the secure Supabase reset email to complete the flow.</p><Link className="action-btn primary" to="/login">Back to sign in</Link></section></div>;
}
