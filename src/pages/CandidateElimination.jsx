import { useMemo, useState } from 'react';
import { CheckCircle, Database, Sparkles } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { candidateExampleData } from '../data/sampleDatasets';

const columns = ['Sky', 'AirTemp', 'Humidity', 'Wind', 'Water', 'Forecast', 'EnjoySport'];

const initialSpecific = {
  Sky: 'Sunny',
  AirTemp: 'Warm',
  Humidity: 'Normal',
  Wind: 'Strong',
  Water: 'Warm',
  Forecast: 'Same',
};

const initialGeneral = ['?', '?', '?', '?', '?', '?'];

export default function CandidateElimination() {
  const [dataset, setDataset] = useState(candidateExampleData);
  const [steps, setSteps] = useState([
    { specific: { ...initialSpecific }, general: [...initialGeneral], note: 'Initial boundary' },
  ]);
  const [specific, setSpecific] = useState({ ...initialSpecific });
  const [general, setGeneral] = useState([...initialGeneral]);

  const runAlgorithm = () => {
    let currentSpecific = { ...initialSpecific };
    let currentGeneral = [...initialGeneral];
    const progress = [{ specific: { ...currentSpecific }, general: [...currentGeneral], note: 'Initial boundary' }];

    dataset.forEach((row, index) => {
      if (row.EnjoySport !== 'Yes') return;

      const nextSpecific = {};
      Object.keys(currentSpecific).forEach((key) => {
        if (row[key] === currentSpecific[key]) {
          nextSpecific[key] = currentSpecific[key];
        } else if (currentSpecific[key] === '?') {
          nextSpecific[key] = row[key];
        } else {
          nextSpecific[key] = '?';
        }
      });

      currentSpecific = nextSpecific;
      currentGeneral = currentGeneral.map((value) => value === '?' ? '?' : '?');
      progress.push({ specific: { ...currentSpecific }, general: [...currentGeneral], note: `Step ${index + 1}: positive example accepted` });
    });

    setSpecific(currentSpecific);
    setGeneral(currentGeneral);
    setSteps(progress);
  };

  const reset = () => {
    setSpecific({ ...initialSpecific });
    setGeneral([...initialGeneral]);
    setSteps([{ specific: { ...initialSpecific }, general: [...initialGeneral], note: 'Initial boundary' }]);
  };

  const versionSpace = useMemo(
    () => [
      { label: 'Specific Hypothesis', value: JSON.stringify(specific) },
      { label: 'General Hypothesis', value: JSON.stringify(general) },
      { label: 'Version Space', value: 'Set of consistent hypotheses between S and G' },
    ],
    [specific, general],
  );

  return (
    <>
      <PageHeader title="Candidate Elimination Algorithm" subtitle="Explore Specific and General Hypothesis Boundaries" badge="Concept Learning" />

      <section className="section-block">
        <div className="section-head">
          <h3>Input Dataset</h3>
          <div className="badge-row">
            <span className="status-badge blue">Positive/Negative</span>
          </div>
        </div>

        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                {columns.map((column) => <th key={column}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
              {dataset.map((row, idx) => (
                <tr key={`${row.Sky}-${idx}`}>
                  {columns.map((column) => (
                    <td key={`${row.Sky}-${column}`}>{row[column]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="action-row">
          <Button variant="primary" onClick={() => setDataset(candidateExampleData)}>Load Example</Button>
          <Button variant="secondary" onClick={runAlgorithm}>Run Algorithm</Button>
          <Button variant="secondary" onClick={reset}>Reset</Button>
        </div>
      </section>

      <section className="grid-two" style={{ marginTop: '24px' }}>
        <div className="section-block">
          <div className="section-head">
            <h3>Algorithm Progress</h3>
          </div>
          <div className="list-stack">
            {steps.map((step, idx) => (
              <div key={`${step.note}-${idx}`}>
                <span>{`Step ${idx + 1}`}</span>
                <strong>{step.note}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="section-block">
          <div className="section-head">
            <h3>Version Space</h3>
          </div>
          <div className="metric-grid">
            {versionSpace.map((item) => (
              <div key={item.label} className="result-card tone-default">
                <div className="result-title">{item.label}</div>
                <div className="result-value" style={{ fontSize: '1rem' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" style={{ marginTop: '24px' }}>
        <div className="section-head">
          <h3>Explanation</h3>
          <span className="status-badge green"><CheckCircle size={14} /> Educational</span>
        </div>
        <div className="info-box">
          Candidate Elimination maintains the most specific and most general hypotheses consistent with observed examples. This narrows the version space as each positive or negative training example is processed.
        </div>
      </section>
    </>
  );
}
