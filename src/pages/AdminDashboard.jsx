import { useEffect, useState } from 'react';
import { Activity, BookOpen, Database, FileCheck2, GraduationCap, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats } from '../lib/backend';
import AdminLayout from '../components/admin/AdminLayout';
import PageHeader from '../components/PageHeader';

const cards = [
  ['practicals', 'Total Practicals', BookOpen], ['students', 'Total Students', Users], ['faculty', 'Total Faculty', GraduationCap], ['experiments', 'Total Experiments', Activity], ['completed', 'Completed Experiments', FileCheck2], ['submissions', 'Pending Submissions', FileCheck2], ['datasets', 'Active Datasets', Database],
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ practicals: 0, students: 0, faculty: 0, experiments: 0, completed: 0, submissions: 0, datasets: 0 });
  const [loading, setLoading] = useState(true);
  useEffect(() => { if (user) getDashboardStats(user.id).then(({ data }) => { if (data) setStats((current) => ({ ...current, ...data })); setLoading(false); }); }, [user]);
  return <AdminLayout><PageHeader title="Admin Dashboard" subtitle="Manage your Machine Learning Laboratory" badge="Control Center" /><section className="admin-stat-grid">{cards.map(([key, label, Icon]) => <div className="admin-stat-card" key={key}><div className="admin-stat-icon"><Icon size={20} /></div><span>{label}</span><strong>{loading ? '—' : stats[key] ?? 0}</strong></div>)}</section><section className="admin-dashboard-grid"><div className="admin-panel"><div className="section-head"><h3>Quick Actions</h3></div><div className="admin-actions"><a href="/admin/practicals">+ Add Practical</a><a href="/admin/faculty">+ Add Faculty</a><a href="/admin/datasets">+ Add Dataset</a><a href="/admin/team">+ Add Laboratory Member</a></div></div><div className="admin-panel"><div className="section-head"><h3>System status</h3></div><div className="admin-status-row"><span className="status-dot online" />Supabase Auth and RLS protected data layer</div><div className="admin-status-row"><span className="status-dot online" />Storage policies configured</div><div className="admin-status-row"><span className="status-dot pending" />Realtime notifications available after project setup</div></div></section></AdminLayout>;
}
