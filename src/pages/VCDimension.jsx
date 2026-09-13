import { useState } from 'react';
import { AreaChart, Area, CartesianGrid, LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { getVCDimension, calculateSampleComplexity } from '../utils/vcDimension';

const hypothesisClasses = ['Line', 'Interval', 'Circle'];
const lineChartData = [
  { x: 0, y: 2 },
  { x: 1, y: 1.8 },
  { x: 2, y: 2.5 },
  { x: 3, y: 3.4 },
  { x: 4, y: 4.3 },
  { x: 5, y: 5.1 },
];

export default function VCDimension() {
  const [hypothesisClass, setHypothesisClass] = useState('Line');
  const [epsilon, setEpsilon] = useState(0.05);
  const [confidence, setConfidence] = useState(0.95);
  const [result, setResult] = useState({ vc: 3, sample: 0 });

  const calculate = () => {
    const vc = getVCDimension(hypothesisClass.toLowerCase());
    const sample = calculateSampleComplexity(vc, epsilon, confidence);
    setResult({ vc, sample });
  };

  const reset = () => {
    setHypothesisClass('Line');
    setEpsilon(0.05);
    setConfidence(0.95);
    setResult({ vc: 3, sample: 0 });
  };

  return (
    <>
      <PageHeader title="VC Dimension & Sample Complexity" subtitle="Evaluate model capacity and required sample size." badge="Theory Lab" />

      <section className="visual-grid">
        <div className="form-panel">
          <div className="section-head">
            <h3>Input Parameters</h3>
          </div>
          <div className="form-grid">
            <div className="field">
              <label>Hypothesis Class</label>
              <select value={hypothesisClass} onChange={(e) => setHypothesisClass(e.target.value)}>
                {hypothesisClasses.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Error (ε): {epsilon}</label>
              <input type="range" min="0.01" max="0.5" step="0.01" value={epsilon} onChange={(e) => setEpsilon(Number(e.target.value))} className="range-input" />
            </div>
            <div className="field">
              <label>Confidence (1-δ): {confidence}</label>
              <input type="range" min="0.5" max="0.99" step="0.01" value={confidence} onChange={(e) => setConfidence(Number(e.target.value))} className="range-input" />
            </div>
          </div>
          <div className="action-row">
            <Button variant="primary" onClick={calculate}>Calculate</Button>
            <Button variant="secondary" onClick={reset}>Reset</Button>
          </div>
        </div>

        <div className="visual-card">
          <div className="section-head">
            <h3>Visualization</h3>
            <span className="status-badge purple">{hypothesisClass}</span>
          </div>
          <div className="chart-container" style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid stroke="var(--chart-grid)" />
                <XAxis dataKey="x" stroke="var(--muted)" />
                <YAxis stroke="var(--muted)" />
                <Tooltip />
                <Line type="monotone" dataKey="y" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid-three" style={{ marginTop: '24px' }}>
        <div className="result-card tone-default">
          <div className="result-title">Hypothesis Class</div>
          <div className="result-value">{hypothesisClass}</div>
        </div>
        <div className="result-card tone-success">
          <div className="result-title">VC Dimension</div>
          <div className="result-value">{result.vc}</div>
        </div>
        <div className="result-card tone-warning">
          <div className="result-title">Sample Complexity</div>
          <div className="result-value">{result.sample}</div>
        </div>
      </section>

      <section className="grid-two" style={{ marginTop: '24px' }}>
        <div className="section-block">
          <div className="section-head">
            <h3>Formula</h3>
          </div>
          <div className="info-box">
            m ≥ (4 / ε) × (d log(2/ε) + log(1/δ))
            <br />
            Where d is the VC Dimension and δ = 1 − confidence.
          </div>
        </div>

        <div className="section-block">
          <div className="section-head">
            <h3>About</h3>
          </div>
          <div className="info-box">
            VC Dimension measures the capacity of a hypothesis class to separate different labelings of data points. Higher capacity usually requires more samples to generalize well.
          </div>
        </div>
      </section>
    </>
  );
}
