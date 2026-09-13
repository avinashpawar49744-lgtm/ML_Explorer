import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';

export default function Admin({ section = 'overview' }) {
  const { profile } = useAuth();
  return <><PageHeader title={`Admin ${section[0].toUpperCase()}${section.slice(1)}`} subtitle="Manage the ML Explorer laboratory" badge="Restricted" /><section className="section-block"><div className="section-head"><h3>Administrative workspace</h3></div><div className="info-box">Signed in as {profile?.full_name || 'staff'}. Database-backed management for practicals, students, submissions, and datasets is protected by Supabase RLS.</div></section></>;
}
