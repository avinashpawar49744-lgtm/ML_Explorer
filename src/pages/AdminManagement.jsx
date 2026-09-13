import { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import PageHeader from '../components/PageHeader';
import { supabase } from '../lib/supabase';

const config = {
  practicals: { title: 'Practical Management', subtitle: 'Create, publish, and organize ML practicals', table: 'practicals', columns: ['practical_number', 'title', 'category', 'difficulty', 'is_active'] },
  students: { title: 'Student Management', subtitle: 'Review student profiles and progress', table: 'profiles', columns: ['full_name', 'email', 'department', 'batch', 'role'] },
  faculty: { title: 'Faculty Management', subtitle: 'Manage faculty and coordinator records', table: 'profiles', columns: ['full_name', 'email', 'department', 'role'] },
  datasets: { title: 'Dataset Management', subtitle: 'Manage public educational datasets', table: 'datasets', columns: ['name', 'dataset_type', 'source', 'is_public'] },
  experiments: { title: 'Experiment Management', subtitle: 'Read-only experiment sessions and results', table: 'experiment_sessions', columns: ['user_id', 'practical_id', 'status', 'started_at'] },
  submissions: { title: 'Submission Management', subtitle: 'Review and evaluate practical submissions', table: 'practical_submissions', columns: ['student_id', 'practical_id', 'status', 'marks', 'submitted_at'] },
  activity: { title: 'Activity Logs', subtitle: 'Audit important laboratory events', table: 'activity_logs', columns: ['user_id', 'activity_type', 'description', 'created_at'] },
  team: { title: 'Laboratory Team Management', subtitle: 'Manage public HOD, faculty, and student profiles', table: 'laboratory_members', columns: ['name', 'designation', 'role_type', 'display_order', 'is_active'] },
  settings: { title: 'Application Settings', subtitle: 'Manage database-backed application settings', table: 'app_settings', columns: ['key', 'description', 'updated_at'] },
  about: { title: 'About Laboratory Management', subtitle: 'Manage editable laboratory content', table: 'app_settings', columns: ['key', 'description', 'updated_at'] },
};

export default function AdminManagement({ section }) {
  const page = config[section] || config.practicals;
  const [rows, setRows] = useState([]); const [query, setQuery] = useState(''); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => { let active = true; setLoading(true); setError(''); if (!supabase) { setLoading(false); return undefined; } supabase.from(page.table).select('*').limit(50).then(({ data, error: requestError }) => { if (!active) return; setRows(data || []); setError(requestError?.message || ''); setLoading(false); }); return () => { active = false; }; }, [page.table]);
  const filtered = rows.filter((row) => JSON.stringify(row).toLowerCase().includes(query.toLowerCase()));
  return <AdminLayout><PageHeader title={page.title} subtitle={page.subtitle} badge="Admin Workspace" /><section className="admin-panel"><div className="admin-toolbar"><div className="admin-search"><Search size={16} /><input placeholder="Search records..." value={query} onChange={(event) => setQuery(event.target.value)} /></div><button className="action-btn primary" type="button"><Plus size={16} /> Add {section === 'practicals' ? 'Practical' : 'Record'}</button></div>{error && <div className="inline-error">Unable to load this management table. Apply the Supabase migrations and confirm your admin role.</div>}{!supabase && <div className="empty-state">Configure Supabase to load admin records.</div>}{loading ? <div className="loading-state"><div className="spinner" />Loading...</div> : rows.length === 0 && !error ? <div className="empty-state">No records found.</div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr>{page.columns.map((column) => <th key={column}>{column.replaceAll('_', ' ')}</th>)}</tr></thead><tbody>{filtered.map((row) => <tr key={row.id}>{page.columns.map((column) => <td key={column}>{typeof row[column] === 'boolean' ? (row[column] ? 'Active' : 'Inactive') : String(row[column] ?? '—')}</td>)}</tr>)}</tbody></table></div>}</section></AdminLayout>;
}
