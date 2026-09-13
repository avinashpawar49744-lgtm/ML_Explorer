import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/PageHeader';

export default function Profile() {
  const { user, profile, isConfigured } = useAuth();
  return <><PageHeader title="My Profile" subtitle="Your ML Explorer account" badge="Account" /><section className="form-panel profile-view"><div className="section-head"><h3>Profile details</h3></div>{!isConfigured ? <div className="inline-error">Configure Supabase to load account data.</div> : <div className="list-stack"><div><span>Name</span><strong>{profile?.full_name || user?.user_metadata?.full_name || 'Student'}</strong></div><div><span>Email</span><strong>{profile?.email || user?.email}</strong></div><div><span>Role</span><strong>{profile?.role || 'student'}</strong></div><div><span>Department</span><strong>{profile?.department || 'Artificial Intelligence & Machine Learning'}</strong></div><div><span>Batch</span><strong>{profile?.batch || 'B2'}</strong></div></div>}</section></>;
}
