import { ArrowRight, BarChart3, BookOpen, BrainCircuit, Gauge, Network, Sparkles, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PracticalCard from '../components/PracticalCard';
import StatCard from '../components/StatCard';
import PageHeader from '../components/PageHeader';
import { practicals } from '../data/practicals';

const stats = [
  { label: 'Total Practicals', value: 8, icon: BookOpen, accent: '#8b5cf6' },
  { label: 'Interactive Modules', value: 8, icon: BrainCircuit, accent: '#1ea5ff' },
  { label: 'Learning Categories', value: 3, icon: Gauge, accent: '#70e1ff' },
  { label: 'ML Algorithms', value: '10+', icon: BarChart3, accent: '#3ddc97' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title="Machine Learning Laboratory" subtitle="Explore, Implement & Visualize Machine Learning Concepts" badge="ML Explorer" />

      <section className="hero-panel">
        <div className="hero-content">
          <div className="section-kicker">Premium AI Lab</div>
          <h2>Build intuition through interactive machine learning experiments.</h2>
          <p>
            Discover core principles, train lightweight models, and visualize learning behaviour with locally simulated ML practicals built for fast understanding.
          </p>
          <div className="hero-actions">
            <button type="button" className="action-btn primary" onClick={() => navigate('/learning-types')}>
              Start Learning <ArrowRight size={16} />
            </button>
            <button type="button" className="action-btn secondary" onClick={() => navigate('/supervised-ml')}>
              Explore Practicals
            </button>
          </div>
        </div>

        <div className="hero-stats">
          {stats.map(({ label, value, icon: Icon, accent }) => (
            <StatCard key={label} label={label} value={value} accent={accent} icon={Icon} />
          ))}
        </div>
      </section>

      <section className="section-block" style={{ marginTop: '22px' }}>
        <div className="section-head">
          <h3>Practical Laboratory</h3>
          <span className="status-badge purple">8 modules</span>
        </div>
        <div className="practical-grid">
          {practicals.map((item, index) => {
            const icons = [BookOpen, Target, BrainCircuit, BarChart3, Sparkles, Gauge, Network, BrainCircuit];
            const Icon = icons[index];
            return (
              <PracticalCard
                key={item.path}
                number={String(index + 1).padStart(2, '0')}
                title={item.title}
                description={item.description}
                category={item.category}
                difficulty={item.difficulty}
                icon={Icon}
                onOpen={() => navigate(item.path)}
              />
            );
          })}
        </div>
      </section>

      <div className="grid-two" style={{ marginTop: '26px' }}>
        <section className="section-block">
          <div className="section-head">
            <h3>Recent Activity</h3>
            <span className="status-badge blue">Live</span>
          </div>
          <div className="list-stack">
            <div><span>Learning Types</span><strong>Updated</strong></div>
            <div><span>Regression Demo</span><strong>Active</strong></div>
            <div><span>Perceptron Training</span><strong>Ready</strong></div>
            <div><span>VC Dimension</span><strong>Calculated</strong></div>
          </div>
        </section>

        <section className="section-block">
          <div className="section-head">
            <h3>Learning Progress</h3>
            <span className="status-badge green">72%</span>
          </div>
          <div className="list-stack">
            <div><span>Core Theory</span><strong>80%</strong></div>
            <div><span>Algorithms</span><strong>71%</strong></div>
            <div><span>Visualization</span><strong>69%</strong></div>
            <div><span>Review</span><strong>76%</strong></div>
          </div>
        </section>
      </div>

      <section className="section-block" style={{ marginTop: '24px' }}>
        <div className="section-head">
          <h3>Quick Start</h3>
        </div>
        <div className="grid-four">
          <div className="metric-card">
            <div className="label">Theme</div>
            <div className="value">Dark</div>
          </div>
          <div className="metric-card">
            <div className="label">Estimation</div>
            <div className="value">Local</div>
          </div>
          <div className="metric-card">
            <div className="label">Visualization</div>
            <div className="value">Interactive</div>
          </div>
          <div className="metric-card">
            <div className="label">Focus</div>
            <div className="value">Practical</div>
          </div>
        </div>
      </section>
    </>
  );
}
