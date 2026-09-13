import { useState } from 'react';
import { BarChart3, Database, FileText, GraduationCap, LayoutDashboard, LogOut, Menu, Settings, Users, X, Activity, UserRound } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const groups = [
  { label: 'Overview', items: [{ label: 'Dashboard', path: '/admin', icon: LayoutDashboard }] },
  { label: 'Content', items: [{ label: 'Practicals', path: '/admin/practicals', icon: FileText }, { label: 'Datasets', path: '/admin/datasets', icon: Database }, { label: 'About Laboratory', path: '/admin/about', icon: GraduationCap }, { label: 'Settings', path: '/admin/settings', icon: Settings }] },
  { label: 'People', items: [{ label: 'Students', path: '/admin/students', icon: Users }, { label: 'Faculty', path: '/admin/faculty', icon: GraduationCap }, { label: 'Laboratory Team', path: '/admin/team', icon: Users }] },
  { label: 'Activity', items: [{ label: 'Experiments', path: '/admin/experiments', icon: BarChart3 }, { label: 'Submissions', path: '/admin/submissions', icon: FileText }, { label: 'Activity Logs', path: '/admin/activity', icon: Activity }] },
];

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { profile, logout } = useAuth();
  const signOut = async () => { await logout(); navigate('/admin/login', { replace: true }); };
  return <div className="admin-shell">
    <aside className={`admin-sidebar ${open ? 'open' : ''}`}><div className="admin-brand"><span className="logo-mark">ML</span><div><strong>ML Explorer Admin</strong><small>Laboratory Management</small></div><button className="admin-close" type="button" onClick={() => setOpen(false)} aria-label="Close admin menu"><X size={18} /></button></div><nav>{groups.map((group) => <div className="admin-nav-group" key={group.label}><small>{group.label}</small>{group.items.map(({ label, path, icon: Icon }) => <NavLink end={path === '/admin'} key={path} to={path} onClick={() => setOpen(false)} className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}><Icon size={17} /><span>{label}</span></NavLink>)}</div>)}</nav><div className="admin-account"><NavLink to="/admin/profile" className="admin-nav-item"><UserRound size={17} /><span>{profile?.full_name || 'Admin Profile'}</span></NavLink><button type="button" className="admin-nav-item" onClick={signOut}><LogOut size={17} /><span>Logout</span></button></div></aside>
    <div className="admin-main"><header className="admin-topbar"><button type="button" className="admin-menu-button" onClick={() => setOpen(true)} aria-label="Open admin menu"><Menu size={20} /></button><div><strong>ML Explorer Admin</strong><span>Administration & Laboratory Management</span></div><span className="admin-role">{profile?.role || 'admin'}</span></header><main className="admin-content">{children}</main></div>
  </div>;
}
