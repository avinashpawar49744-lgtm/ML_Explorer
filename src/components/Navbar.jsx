import { BookOpen, Layers3, MoonStar } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ title, subtitle, theme, setTheme, onMenuClick }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button type="button" className="mobile-menu-button" onClick={onMenuClick} aria-label="Toggle sidebar">
          <Layers3 size={18} />
        </button>
        <div>
          <div className="page-title">{title}</div>
          {subtitle && <div className="page-subtitle">{subtitle}</div>}
        </div>
      </div>

      <div className="topbar-right">
        <div className="batch-pill">
          <BookOpen size={14} />
          <span>Batch: B2</span>
        </div>
        <div className="lab-badge">Machine Learning Lab</div>
        <ThemeToggle theme={theme} onToggle={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))} />
      </div>
    </header>
  );
}
