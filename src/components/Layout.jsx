import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout({ children, theme, setTheme }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const pageTitleMap = {
    '/': { title: 'Machine Learning Laboratory', subtitle: 'Explore, Implement & Visualize Machine Learning Concepts' },
    '/learning-types': { title: 'Supervised, Unsupervised & Semi-Supervised Learning', subtitle: 'Understand core learning settings' },
    '/candidate-elimination': { title: 'Candidate Elimination Algorithm', subtitle: 'Explore Specific and General Hypothesis Boundaries' },
    '/supervised-ml': { title: 'Supervised Machine Learning', subtitle: 'Classification and regression experiments' },
    '/regression': { title: 'Regression Analysis', subtitle: 'Model fitting and error interpretation' },
    '/knn': { title: 'K-Nearest Neighbors Classification', subtitle: 'Distance-based decision making' },
    '/vc-dimension': { title: 'VC Dimension & Sample Complexity', subtitle: 'Capacity of hypothesis classes' },
    '/rbf-network': { title: 'Radial Basis Function Network', subtitle: 'Local activation and center learning' },
    '/perceptron': { title: 'Perceptron & Linear Threshold Neuron', subtitle: 'Simple binary classification' },
    '/mlp': { title: 'Multi-Layer Perceptron', subtitle: 'Neural network learning with backpropagation' },
    '/mini-application': { title: 'ML Mini Application', subtitle: 'Complete machine learning workflow' },
    '/laboratory-team': { title: 'Laboratory Team', subtitle: 'Guidance, coordination and student work' },
    '/about': { title: 'About ML Explorer', subtitle: 'Project overview and learning journey' },
  };

  const current = pageTitleMap[location.pathname] || { title: 'ML Explorer', subtitle: 'Learn • Implement • Visualize' };

  return (
    <div className="app-shell">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className={`main-panel ${collapsed ? 'panel-collapsed' : 'panel-expanded'}`}>
        <Navbar
          title={current.title}
          subtitle={current.subtitle}
          theme={theme}
          setTheme={setTheme}
          onMenuClick={() => setMobileOpen((prev) => !prev)}
        />
        <main className="page-shell">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
