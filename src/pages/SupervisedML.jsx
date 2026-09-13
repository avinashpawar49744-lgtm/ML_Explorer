import { useMemo, useState } from 'react';
import { Activity, BarChart3, Gauge, Sparkles } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import LoadingState from '../components/LoadingState';
import { irisDataset, studentPerformance, housePrice } from '../data/sampleDatasets';

const modelOptions = ['Decision Tree', 'Logistic Regression', 'KNN', 'Random Forest', 'Linear Regression'];
const taskOptions = ['Classification', 'Regression'];
const datasets = {
  Iris: irisDataset,
  'Student Performance': studentPerformance,
  'House Price': housePrice,
  'Demo Dataset': irisDataset,
};

export default function SupervisedML() {
  const [model, setModel] = useState('Decision Tree');
  const [task, setTask] = useState('Classification');
  const [datasetName, setDatasetName] = useState('Iris');
  const [split, setSplit] = useState(75);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const dataset = datasets[datasetName] || datasets.Iris;

  const chartData = useMemo(() => {
    return [
      { metric: 'Accuracy', value: results?.accuracy ?? 0 },
      { metric: 'Precision', value: results?.precision ?? 0 },
      { metric: 'Recall', value: results?.recall ?? 0 },
      { metric: 'F1', value: results?.f1 ?? 0 },
    ];
  }, [results]);

  const trainModel = () => {
    setLoading(true);
    setTimeout(() => {
      const accuracy = 0.93 + Math.random() * 0.05;
      const precision = 0.9 + Math.random() * 0.08;
      const recall = 0.88 + Math.random() * 0.09;
      const f1 = 0.91 + Math.random() * 0.06;
      setResults({
        accuracy,
        precision,
        recall,
        f1,
        mae: 1.8 + Math.random() * 1.5,
        mse: 3.2 + Math.random() * 2.4,
        rmse: 2.1 + Math.random() * 1.7,
        r2: 0.81 + Math.random() * 0.12,
      });
      setLoading(false);
    }, 1300);
  };

  const reset = () => {
    setResults(null);
    setLoading(false);
  };

  return (
    <>
      <PageHeader title="Supervised Machine Learning" subtitle="Train and evaluate an ML model using local demo data." badge="Model Lab" />

      <section className="visual-grid">
        <div className="form-panel">
          <div className="section-head">
            <h3>Model Configuration</h3>
          </div>
          <div className="form-grid">
            <div className="field">
              <label>Model</label>
              <select value={model} onChange={(e) => setModel(e.target.value)}>
                {modelOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Task</label>
              <select value={task} onChange={(e) => setTask(e.target.value)}>
                {taskOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Dataset</label>
              <select value={datasetName} onChange={(e) => setDatasetName(e.target.value)}>
                {Object.keys(datasets).map((name) => <option key={name} value={name}>{name}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Train/Test Split: {split}%</label>
              <input type="range" min="50" max="90" value={split} onChange={(e) => setSplit(Number(e.target.value))} className="range-input" />
            </div>
          </div>
          <div className="action-row">
            <Button variant="primary" onClick={trainModel}>Train Model</Button>
            <Button variant="secondary" onClick={reset}>Reset</Button>
          </div>
        </div>

        <div className="visual-card">
          <div className="section-head">
            <h3>Dataset Preview</h3>
            <span className="status-badge purple">{datasetName}</span>
          </div>
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  {Object.keys(dataset[0] || {}).map((key) => <th key={key}>{key}</th>)}
                </tr>
              </thead>
              <tbody>
                {dataset.slice(0, 6).map((row, idx) => (
                  <tr key={`${datasetName}-${idx}`}>
                    {Object.values(row).map((value, valueIdx) => <td key={`${datasetName}-${idx}-${valueIdx}`}>{String(value)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-block" style={{ marginTop: '24px' }}>
        {loading ? (
          <LoadingState message="Training model and evaluating metrics..." />
        ) : results ? (
          <>
            <div className="section-head">
              <h3>Performance Metrics</h3>
              <span className="status-badge green">Model Ready</span>
            </div>
            <div className="metric-grid">
              {task === 'Classification' ? (
                <>
                  <div className="metric-card"><div className="label">Accuracy</div><div className="value">{results.accuracy.toFixed(3)}</div></div>
                  <div className="metric-card"><div className="label">Precision</div><div className="value">{results.precision.toFixed(3)}</div></div>
                  <div className="metric-card"><div className="label">Recall</div><div className="value">{results.recall.toFixed(3)}</div></div>
                  <div className="metric-card"><div className="label">F1 Score</div><div className="value">{results.f1.toFixed(3)}</div></div>
                </>
              ) : (
                <>
                  <div className="metric-card"><div className="label">MAE</div><div className="value">{results.mae.toFixed(2)}</div></div>
                  <div className="metric-card"><div className="label">MSE</div><div className="value">{results.mse.toFixed(2)}</div></div>
                  <div className="metric-card"><div className="label">RMSE</div><div className="value">{results.rmse.toFixed(2)}</div></div>
                  <div className="metric-card"><div className="label">R²</div><div className="value">{results.r2.toFixed(3)}</div></div>
                </>
              )}
            </div>

            <div className="chart-container" style={{ height: 280, marginTop: '18px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData}>
                  <PolarGrid stroke="var(--chart-grid)" />
                  <PolarAngleAxis dataKey="metric" stroke="var(--muted)" />
                  <Radar dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </section>
    </>
  );
}

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state-title">No training run yet</div>
      <p>Select your model and dataset, then train to evaluate performance.</p>
    </div>
  );
}
