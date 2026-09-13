import { useMemo, useState } from 'react';
import { Line, LineChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Scatter, ComposedChart } from 'recharts';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { regressionDemoData } from '../data/sampleDatasets';
import { linearRegression, polynomialRegression, calculateMAE, calculateMSE, calculateRMSE, calculateR2 } from '../utils/regression';

export default function Regression() {
  const [modelType, setModelType] = useState('Linear Regression');
  const [samples, setSamples] = useState(12);
  const [degree, setDegree] = useState(2);
  const [testSize, setTestSize] = useState(30);
  const [results, setResults] = useState(null);

  const generatedData = useMemo(() => {
    return Array.from({ length: samples }, (_, i) => ({
      x: i + 1,
      y: 2 + (i * 1.3) + (Math.sin(i / 1.8) * (modelType === 'Polynomial Regression' ? 2.2 : 1.2)),
    }));
  }, [samples, modelType]);

  const runRegression = () => {
    const regression = modelType === 'Polynomial Regression'
      ? polynomialRegression(generatedData, degree)
      : linearRegression(generatedData);

    const actual = generatedData.map((point) => point.y);
    const predicted = regression.predictions.map((point) => point.predicted);

    setResults({
      mae: calculateMAE(actual, predicted),
      mse: calculateMSE(actual, predicted),
      rmse: calculateRMSE(actual, predicted),
      r2: calculateR2(actual, predicted),
      point: { x: generatedData[Math.min(generatedData.length - 1, 7)].x, y: generatedData[Math.min(generatedData.length - 1, 7)].y },
      modelType,
      data: regression.predictions,
    });
  };

  const reset = () => setResults(null);

  const chartData = results?.data || generatedData;

  return (
    <>
      <PageHeader title="Regression Analysis" subtitle="Fit predictive curves and interpret model error." badge="Prediction Lab" />

      <section className="visual-grid">
        <div className="form-panel">
          <div className="section-head">
            <h3>Controls</h3>
          </div>
          <div className="form-grid">
            <div className="field">
              <label>Model Type</label>
              <select value={modelType} onChange={(e) => setModelType(e.target.value)}>
                <option>Linear Regression</option>
                <option>Polynomial Regression</option>
              </select>
            </div>
            <div className="field">
              <label>Number of Samples</label>
              <input type="range" min="5" max="30" value={samples} onChange={(e) => setSamples(Number(e.target.value))} className="range-input" />
              <span>{samples}</span>
            </div>
            <div className="field">
              <label>Polynomial Degree</label>
              <input type="range" min="1" max="5" value={degree} onChange={(e) => setDegree(Number(e.target.value))} className="range-input" />
              <span>{degree}</span>
            </div>
            <div className="field">
              <label>Test Size</label>
              <input type="range" min="10" max="60" value={testSize} onChange={(e) => setTestSize(Number(e.target.value))} className="range-input" />
              <span>{testSize}%</span>
            </div>
          </div>
          <div className="action-row">
            <Button variant="primary" onClick={runRegression}>Run Regression</Button>
            <Button variant="secondary" onClick={() => setSamples(12)}>Generate Dataset</Button>
            <Button variant="secondary" onClick={reset}>Reset</Button>
          </div>
        </div>

        <div className="visual-card">
          <div className="section-head">
            <h3>Regression Curve</h3>
            <span className="status-badge purple">{modelType}</span>
          </div>
          <div className="chart-container" style={{ height: 295 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <CartesianGrid stroke="var(--chart-grid)" />
                <XAxis dataKey="x" stroke="var(--muted)" />
                <YAxis stroke="var(--muted)" />
                <Tooltip />
                <Scatter data={generatedData} fill="#1ea5ff" />
                <Line type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={3} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {results && (
        <section className="section-block" style={{ marginTop: '24px' }}>
          <div className="section-head">
            <h3>Metrics</h3>
          </div>
          <div className="metric-grid">
            <div className="metric-card"><div className="label">MAE</div><div className="value">{results.mae.toFixed(3)}</div></div>
            <div className="metric-card"><div className="label">MSE</div><div className="value">{results.mse.toFixed(3)}</div></div>
            <div className="metric-card"><div className="label">RMSE</div><div className="value">{results.rmse.toFixed(3)}</div></div>
            <div className="metric-card"><div className="label">R² Score</div><div className="value">{results.r2.toFixed(3)}</div></div>
          </div>

          <div className="info-box" style={{ marginTop: '18px' }}>
            <strong>Formula:</strong> {modelType === 'Linear Regression' ? 'y = mx + c' : 'y = a₀ + a₁x + a₂x² + ...'}
            <br />
            <strong>Interpretation:</strong> Regression error measures how far the model predictions deviate from observed outcomes. Lower errors and higher R² indicate better fit.
          </div>
        </section>
      )}
    </>
  );
}
