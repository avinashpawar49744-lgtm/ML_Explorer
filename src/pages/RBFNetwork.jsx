import { useState } from 'react';
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line } from 'recharts';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';

const gaussianData = Array.from({ length: 12 }, (_, index) => ({
  x: index,
  value: Math.exp(-((index - 6) ** 2) / 10),
}));

export default function RBFNetwork() {
  const [centers, setCenters] = useState(3);
  const [sigma, setSigma] = useState(1.2);
  const [learningRate, setLearningRate] = useState(0.1);
  const [epochs, setEpochs] = useState(20);
  const [trainingError, setTrainingError] = useState(0.34);

  const trainRBF = () => {
    const nextError = (0.28 + Math.random() * 0.25).toFixed(3);
    setTrainingError(Number(nextError));
  };

  const reset = () => {
    setCenters(3);
    setSigma(1.2);
    setLearningRate(0.1);
    setEpochs(20);
    setTrainingError(0.34);
  };

  return (
    <>
      <PageHeader title="Radial Basis Function Network" subtitle="Simulate local activation through Gaussian basis functions." badge="Neural Network" />

      <section className="visual-grid">
        <div className="form-panel">
          <div className="section-head">
            <h3>Controls</h3>
          </div>
          <div className="form-grid">
            <div className="field"><label>Number of Centers</label><input type="range" min="1" max="8" value={centers} onChange={(e) => setCenters(Number(e.target.value))} className="range-input" /><span>{centers}</span></div>
            <div className="field"><label>Gaussian Sigma</label><input type="range" min="0.5" max="3" step="0.1" value={sigma} onChange={(e) => setSigma(Number(e.target.value))} className="range-input" /><span>{sigma}</span></div>
            <div className="field"><label>Learning Rate</label><input type="range" min="0.01" max="0.5" step="0.01" value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className="range-input" /><span>{learningRate}</span></div>
            <div className="field"><label>Epochs</label><input type="range" min="5" max="100" value={epochs} onChange={(e) => setEpochs(Number(e.target.value))} className="range-input" /><span>{epochs}</span></div>
          </div>
          <div className="action-row">
            <Button variant="primary" onClick={trainRBF}>Train RBF</Button>
            <Button variant="secondary" onClick={() => setTrainingError(0.34)}>Generate Dataset</Button>
            <Button variant="secondary" onClick={reset}>Reset</Button>
          </div>
        </div>

        <div className="visual-card">
          <div className="section-head">
            <h3>Architecture</h3>
          </div>
          <div className="info-box">
            INPUT LAYER → RBF HIDDEN LAYER → OUTPUT LAYER
            <br />
            φ(x) = exp(-||x-c||² / 2σ²)
          </div>
          <div className="chart-container" style={{ height: 220, marginTop: '18px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gaussianData}>
                <CartesianGrid stroke="var(--chart-grid)" />
                <XAxis dataKey="x" stroke="var(--muted)" />
                <YAxis stroke="var(--muted)" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#70e1ff" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="section-block" style={{ marginTop: '24px' }}>
        <div className="section-head">
          <h3>Training Feedback</h3>
        </div>
        <div className="metric-grid">
          <div className="metric-card"><div className="label">Training Error</div><div className="value">{trainingError}</div></div>
          <div className="metric-card"><div className="label">Prediction</div><div className="value">Class A</div></div>
          <div className="metric-card"><div className="label">Centers</div><div className="value">{centers}</div></div>
          <div className="metric-card"><div className="label">Activation</div><div className="value">Gaussian</div></div>
        </div>
      </section>
    </>
  );
}
