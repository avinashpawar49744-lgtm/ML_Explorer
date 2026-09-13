import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { getExperimentHistory } from '../lib/backend';
import { useAuth } from '../context/AuthContext';

export default function ExperimentHistory() {
  const { user, isConfigured } = useAuth();
  const [items, setItems] = useState([]);
  useEffect(() => { if (isConfigured && user) getExperimentHistory(user.id).then(({ data }) => setItems(data || [])); }, [isConfigured, user]);
  return <><PageHeader title="Experiment History" subtitle="Review your saved laboratory runs" badge="Student Workspace" /><section className="section-block"><div className="section-head"><h3>Saved experiments</h3></div>{!isConfigured ? <div className="empty-state">Configure Supabase to view saved experiments.</div> : items.length === 0 ? <div className="empty-state">No experiments saved yet.</div> : <div className="list-stack">{items.map((item) => <div key={item.id}><span>{item.practicals?.title || 'Practical'}</span><strong>{item.status}</strong></div>)}</div>}</section></>;
}
