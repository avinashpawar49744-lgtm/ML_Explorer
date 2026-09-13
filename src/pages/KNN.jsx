import { useMemo, useState } from 'react';
import { CartesianGrid, Scatter, ScatterChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { knnDemoData } from '../data/sampleDatasets';
import { predictKNN, calculateClassificationMetrics } from '../utils/knn';

export default function KNN() {
  const [k, setK] = useState(3);
  const [metric, setMetric] = useState('euclidean');
  const [dataset, setDataset] = useState(knnDemoData);
  const [selectedPoint, setSelectedPoint] = useState({ x: 2.3, y: 2.0 });
  const [result, setResult] = useState(null);

  const chartData = useMemo(() => dataset.map((point) => ({ ...point })), [dataset]);

  const runKNN = () => {
    const prediction = predictKNN(dataset, [selectedPoint.x, selectedPoint.y], k, metric);
    const labels = dataset.map((point) => point.label);
    const predicted = dataset.map((point) => point.label === prediction.predictedClass ? point.label : 'B');
    const metrics = calculateClassificationMetrics(labels, predicted);
    setResult({ ...prediction, metrics });
  };

  const reset = () => {
    setResult(null);
    setK(3);
    setMetric('euclidean');
  };

  return (
    <>
      <PageHeader title="K-Nearest Neighbors Classification" subtitle="Use local neighborhood voting to classify new observations." badge="Instance Learning" />

      <section className="visual-grid">
        <div className="form-panel">
          <div className="section-head">
            <h3>Controls</h3>
          </div>
          <div className="form-grid">
            <div className="field">
              <label>K value: {k}</label>
              <input type="range" min="1" max="15" value={k} onChange={(e) => setK(Number(e.target.value))} className="range-input" />
            </div>
            <div className="field">
              <label>Distance Metric</label>
              <select value={metric} onChange={(e) => setMetric(e.target.value)}>
                <option value="euclidean">Euclidean</option>
                <option value="manhattan">Manhattan</option>
              </select>
            </div>
            <div className="field">
              <label>Selected Point</label>
              <input type="text" value={`${selectedPoint.x}, ${selectedPoint.y}`} onChange={(e) => { const [x, y] = e.target.value.split(',').map(Number); setSelectedPoint({ x: x || 2.3, y: y || 2.0 }); }} />
            </div>
          </div>
          <div className="action-row">
            <Button variant="primary" onClick={runKNN}>Run KNN</Button>
            <Button variant="secondary" onClick={() => setDataset(knnDemoData)}>Generate Dataset</Button>
            <Button variant="secondary" onClick={reset}>Reset</Button>
          </div>
        </div>

        <div className="visual-card">
          <div className="section-head">
            <h3>2D Scatter Plot</h3>
            <span className="status-badge purple">{result ? result.predictedClass : 'Awaiting'}</span>
          </div>
          <div className="chart-container" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid stroke="var(--chart-grid)" />
                <XAxis type="number" dataKey="x" stroke="var(--muted)" />
                <YAxis type="number" dataKey="y" stroke="var(--muted)" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="A" data={chartData.filter((entry) => entry.label === 'A')} fill="#8b5cf6" />
                <Scatter name="B" data={chartData.filter((entry) => entry.label === 'B')} fill="#1ea5ff" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {result && (
        <section className="section-block" style={{ marginTop: '24px' }}>
          <div className="section-head">
            <h3>Nearest Neighbors & Metrics</h3>
          </div>
          <div className="metric-grid">
            <div className="metric-card"><div className="label">Selected Point</div><div className="value">({selectedPoint.x.toFixed(1)}, {selectedPoint.y.toFixed(1)})</div></div>
            <div className="metric-card"><div className="label">Nearest Neighbors</div><div className="value">{result.nearest.length}</div></div>
            <div className="metric-card"><div className="label">Predicted Class</div><div className="value">{result.predictedClass}</div></div>
            <div className="metric-card"><div className="label">Accuracy</div><div className="value">{result.metrics.accuracy.toFixed(3)}</div></div>
          </div>
          <div className="info-box" style={{ marginTop: '18px' }}>
            KNN estimates the label of a point by observing the nearest k training points. Distance metrics and local neighborhood size shape the decision boundary.
          </div>
        </section>
      )}
    </>
  );
}
