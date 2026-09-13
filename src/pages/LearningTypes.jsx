import { useMemo, useState } from 'react';
import { BarChart3, Brain, Database, Sparkles } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';

const tabs = ['SUPERVISED', 'UNSUPERVISED', 'SEMI-SUPERVISED'];

const supervisedData = [
  { x: 1, y: 1, label: 'Setosa' },
  { x: 2, y: 2, label: 'Setosa' },
  { x: 3, y: 1.5, label: 'Setosa' },
  { x: 4, y: 4, label: 'Versicolor' },
  { x: 5, y: 5.2, label: 'Versicolor' },
  { x: 6, y: 4.8, label: 'Versicolor' },
  { x: 7, y: 6, label: 'Virginica' },
  { x: 8, y: 7, label: 'Virginica' },
];

const unsupervisedData = [
  { x: 1, y: 2, cluster: 'A' },
  { x: 1.5, y: 2.4, cluster: 'A' },
  { x: 2, y: 1.8, cluster: 'A' },
  { x: 6.5, y: 6.1, cluster: 'B' },
  { x: 7.2, y: 7, cluster: 'B' },
  { x: 6.8, y: 5.8, cluster: 'B' },
];

const semiData = [
  { x: 1, y: 1, type: 'Labeled' },
  { x: 2, y: 2, type: 'Labeled' },
  { x: 5, y: 5, type: 'Unlabeled' },
  { x: 6, y: 6, type: 'Unlabeled' },
  { x: 7, y: 5, type: 'Labeled' },
  { x: 4, y: 4, type: 'Unlabeled' },
];

const labelMap = {
  SUPERVISED: {
    title: 'Supervised Learning',
    definition: 'Learns from labeled examples where each input sample has a known target.',
    examples: ['Classification', 'Regression', 'Decision Trees'],
    algorithms: ['Linear Regression', 'Logistic Regression', 'SVM', 'KNN'],
    dataset: 'Iris-like labeled dataset',
  },
  UNSUPERVISED: {
    title: 'Unsupervised Learning',
    definition: 'Discovers hidden patterns in unlabeled data without explicit target values.',
    examples: ['Clustering', 'Dimensionality Reduction', 'Association'],
    algorithms: ['K-Means', 'DBSCAN', 'PCA'],
    dataset: 'Unlabeled feature points',
  },
  'SEMI-SUPERVISED': {
    title: 'Semi-Supervised Learning',
    definition: 'Combines a small labeled set with a larger unlabeled set to improve learning.',
    examples: ['Pseudo-labeling', 'Graph-based methods', 'Self-training'],
    algorithms: ['Label Propagation', 'Self-Training', 'MixMatch'],
    dataset: 'Partially labeled sample groups',
  },
};

export default function LearningTypes() {
  const [activeTab, setActiveTab] = useState('SUPERVISED');
  const [samples, setSamples] = useState(100);
  const [view, setView] = useState('scatter');

  const renderedData = useMemo(() => {
    if (activeTab === 'SUPERVISED') return supervisedData;
    if (activeTab === 'UNSUPERVISED') return unsupervisedData;
    return semiData;
  }, [activeTab]);

  return (
    <>
      <PageHeader title="Supervised, Unsupervised & Semi-Supervised Learning" subtitle="Learn how data supervision changes the learning objective." badge="Core Learning" />

      <section className="section-block">
        <div className="badge-row" style={{ marginBottom: '16px' }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`action-btn ${activeTab === tab ? 'primary' : 'secondary'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="visual-grid">
          <div className="visual-card">
            <div className="section-head">
              <h3>{labelMap[activeTab].title}</h3>
              <span className="status-badge purple">{labelMap[activeTab].dataset}</span>
            </div>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid stroke="var(--chart-grid)" />
                  <XAxis dataKey="x" name="Feature 1" stroke="var(--muted)" />
                  <YAxis dataKey="y" name="Feature 2" stroke="var(--muted)" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter data={renderedData} fill="#8b5cf6" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="form-panel">
            <div className="section-head">
              <h3>Controls</h3>
            </div>
            <div className="form-grid">
              <div className="field">
                <label>Dataset</label>
                <select value={activeTab} onChange={(e) => setActiveTab(e.target.value)}>
                  {tabs.map((tab) => (
                    <option key={tab} value={tab}>{tab}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Number of Samples</label>
                <input type="range" min="20" max="200" value={samples} onChange={(e) => setSamples(Number(e.target.value))} className="range-input" />
                <span>{samples}</span>
              </div>
              <div className="field">
                <label>Visualization Type</label>
                <select value={view} onChange={(e) => setView(e.target.value)}>
                  <option value="scatter">Scatter</option>
                  <option value="density">Density</option>
                </select>
              </div>
            </div>
            <div className="action-row">
              <Button variant="primary">Generate Dataset</Button>
              <Button variant="secondary">Run Visualization</Button>
              <Button variant="secondary">Reset</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid-two" style={{ marginTop: '24px' }}>
        <div className="section-block">
          <div className="section-head">
            <h3>Key Concepts</h3>
          </div>
          <div className="list-stack">
            <div><span>Definition</span><strong>{labelMap[activeTab].definition}</strong></div>
            <div><span>Examples</span><strong>{labelMap[activeTab].examples.join(', ')}</strong></div>
            <div><span>Algorithms</span><strong>{labelMap[activeTab].algorithms.join(', ')}</strong></div>
          </div>
        </div>

        <div className="section-block">
          <div className="section-head">
            <h3>Explanation</h3>
          </div>
          <div className="info-box">
            <p>
              In supervised learning, the system is guided by labels. In unsupervised learning, it identifies structure without labels. Semi-supervised learning balances both by using a few labeled points to guide interpretation of many unlabeled ones.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
