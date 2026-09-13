import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { getSubmissions } from '../lib/backend';
import { useAuth } from '../context/AuthContext';

export default function Submissions() {
  const { user, isConfigured } = useAuth();
  const [items, setItems] = useState([]);
  useEffect(() => { if (isConfigured && user) getSubmissions(user.id).then(({ data }) => setItems(data || [])); }, [isConfigured, user]);
  return <><PageHeader title="My Submissions" subtitle="Track practical submissions and feedback" badge="Student Workspace" /><section className="section-block"><div className="section-head"><h3>Submission history</h3></div>{!isConfigured ? <div className="empty-state">Configure Supabase to view submissions.</div> : items.length === 0 ? <div className="empty-state">No submissions yet.</div> : <div className="list-stack">{items.map((item) => <div key={item.id}><span>{item.practicals?.title || 'Practical'}</span><strong>{item.status}</strong></div>)}</div>}</section></>;
}
