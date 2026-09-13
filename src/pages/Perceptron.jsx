import { useState } from 'react';
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { demoAnd, demoOr } from '../data/sampleDatasets';
import { trainPerceptron } from '../utils/perceptron';

const datasets = {
  AND: demoAnd,
  OR: demoOr,
  'Demo Dataset': demoAnd,
};

export default function Perceptron() {
  const [datasetName, setDatasetName] = useState('AND');
  const [learningRate, setLearningRate] = useState(0.1);
  const [epochs, setEpochs] = useState(10);
  const [history, setHistory] = useState([]);
  const [weights, setWeights] = useState([0, 0]);
  const [bias, setBias] = useState(0);

  const train = () => {
    const dataset = datasets[datasetName];
    const result = trainPerceptron(
      dataset.map((sample) => ({ features: [sample.x1, sample.x2], label: sample.label })),
      learningRate,
      epochs,
    );
    setHistory(result.history);
    setWeights(result.weights);
    setBias(result.bias);
  };

  const reset = () => {
    setHistory([]);
    setWeights([0, 0]);
    setBias(0);
  };

  return (
    <>
      <PageHeader title="Perceptron & Linear Threshold Neuron" subtitle="Train a simple linear binary classifier with local simulation." badge="Neural Computation" />

      <section className="visual-grid">
        <div className="form-panel">
          <div className="section-head">
            <h3>Training Controls</h3>
          </div>
          <div className="form-grid">
            <div className="field">
              <label>Dataset</label>
              <select value={datasetName} onChange={(e) => setDatasetName(e.target.value)}>
                {Object.keys(datasets).map((key) => <option key={key} value={key}>{key}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Learning Rate</label>
              <input type="range" min="0.05" max="1" step="0.05" value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} className="range-input" />
              <span>{learningRate}</span>
            </div>
            <div className="field">
              <label>Epochs</label>
              <input type="range" min="1" max="30" value={epochs} onChange={(e) => setEpochs(Number(e.target.value))} className="range-input" />
              <span>{epochs}</span>
            </div>
          </div>
          <div className="action-row">
            <Button variant="primary" onClick={train}>Train Perceptron</Button>
            <Button variant="secondary">Step Training</Button>
            <Button variant="secondary" onClick={reset}>Reset</Button>
          </div>
        </div>

        <div className="visual-card">
          <div className="section-head">
            <h3>Decision Boundary</h3>
            <span className="status-badge purple">Positive / Negative</span>
          </div>
          <div className="chart-container" style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={history.slice(-5).map((entry, index) => ({ epoch: `E${entry.epoch}`, value: entry.errorRate * 100 }))}>
                <CartesianGrid stroke="var(--chart-grid)" />
                <XAxis dataKey="epoch" stroke="var(--muted)" />
                <YAxis stroke="var(--muted)" />
                <Tooltip />
                <Bar dataKey="value" fill="#1ea5ff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="section-block" style={{ marginTop: '24px' }}>
        <div className="metric-grid">
          <div className="metric-card"><div className="label">Weights</div><div className="value">[{weights.join(', ')}]</div></div>
          <div className="metric-card"><div className="label">Bias</div><div className="value">{bias.toFixed(2)}</div></div>
          <div className="metric-card"><div className="label">Prediction</div><div className="value">{weights[0] + weights[1] + bias >= 0 ? 'Positive' : 'Negative'}</div></div>
          <div className="metric-card"><div className="label">Accuracy</div><div className="value">{history.length ? `${(history[history.length - 1].accuracy).toFixed(1)}%` : '0%'}</div></div>
        </div>
        <div className="info-box" style={{ marginTop: '18px' }}>
          The perceptron updates its weights when a sample is misclassified. This creates a linear decision boundary that separates classes in feature space.
        </div>
      </section>
    </>
  );
}
