import { useMemo } from 'react';
import { Brain, Home, NotebookTabs, CircleDashed, Network, BarChart3, LineChart, Target, Info, ChevronLeft, ChevronRight, Sparkles, Menu, X, Layers3, Workflow, Users, ShieldCheck } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/', icon: Home },
  { label: 'Learning Types', path: '/learning-types', icon: NotebookTabs },
  { label: 'Candidate Elimination', path: '/candidate-elimination', icon: CircleDashed },
  { label: 'Supervised ML', path: '/supervised-ml', icon: Brain },
  { label: 'Regression', path: '/regression', icon: LineChart },
  { label: 'KNN Classification', path: '/knn', icon: Target },
  { label: 'VC Dimension', path: '/vc-dimension', icon: BarChart3 },
  { label: 'RBF Network', path: '/rbf-network', icon: Network },
  { label: 'Perceptron', path: '/perceptron', icon: Sparkles },
  { label: 'Multi-Layer Perceptron', path: '/mlp', icon: Layers3 },
  { label: 'Mini Application', path: '/mini-application', icon: Workflow },
  { label: 'Laboratory Team', path: '/laboratory-team', icon: Users },
  { label: 'About Laboratory', path: '/about', icon: Info },
  { label: 'Admin Login', path: '/admin/login', icon: ShieldCheck },
];

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const sidebarClass = useMemo(
    () => ['sidebar', collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'].join(' '),
    [collapsed],
  );

  const navContent = (
    <>
      <div className="sidebar-header">
        <div className="logo-mark">ML</div>
        {!collapsed && (
          <div className="logo-text-wrap">
            <div className="brand-name">ML Explorer</div>
            <div className="brand-subtitle">Learn • Implement • Visualize</div>
          </div>
        )}
        {!collapsed && (
          <button
            type="button"
            className="sidebar-collapse-btn desktop-only"
            aria-label="Collapse sidebar"
            onClick={() => setCollapsed(true)}
          >
            <ChevronLeft size={16} />
          </button>
        )}
        {collapsed && (
          <button
            type="button"
            className="sidebar-collapse-btn desktop-only"
            aria-label="Expand sidebar"
            onClick={() => setCollapsed(false)}
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            title={collapsed ? label : ''}
            onClick={() => setMobileOpen(false)}
          >
            <Icon size={18} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </>
  );

  return (
    <>
      <aside className={`${sidebarClass} ${mobileOpen ? 'mobile-open' : ''}`}>
        {navContent}
      </aside>

      <button
        type="button"
        className="mobile-nav-toggle"
        aria-label="Open navigation menu"
        onClick={() => setMobileOpen((prev) => !prev)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </>
  );
}
