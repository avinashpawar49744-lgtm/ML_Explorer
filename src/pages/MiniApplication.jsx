import { useState } from 'react';
import { Check, Play, RotateCcw } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const steps = ['Data', 'Preprocessing', 'Model', 'Training', 'Evaluation', 'Visualization'];
const rows = [['Ava', 82, 'Pass'], ['Riya', 74, 'Pass'], ['Noah', 48, 'Review'], ['Omar', 91, 'Pass']];

export default function MiniApplication() {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const next = () => setActive((value) => Math.min(value + 1, steps.length - 1));
  const previous = () => setActive((value) => Math.max(value - 1, 0));
  const run = () => { setRunning(true); setActive(5); };
  return <>
    <PageHeader title="ML Mini Application" subtitle="Complete Machine Learning Workflow" badge="Practical 10" />
    <section className="section-block pipeline-stepper">{steps.map((step, index) => <button type="button" key={step} className={`pipeline-step ${index === active ? 'active' : ''} ${index < active ? 'complete' : ''}`} onClick={() => setActive(index)}><span>{index < active ? <Check size={15} /> : index + 1}</span>{step}</button>)}</section>
    <div className="grid-two" style={{ marginTop: '22px' }}><section className="section-block"><div className="section-head"><h3>Step {active + 1}: {steps[active]}</h3><span className="status-badge blue">Browser local</span></div>
      {active === 0 && <><p className="muted-text">A compact student-performance dataset is ready for exploration.</p><div className="data-table-wrap"><table className="data-table"><thead><tr><th>Student</th><th>Score</th><th>Label</th></tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div></>}
      {active === 1 && <div className="list-stack"><div><span>Missing values</span><strong className="text-success">0 found</strong></div><div><span>Normalization</span><strong>Min-max scaling</strong></div><div><span>Train / test split</span><strong>75% / 25%</strong></div></div>}
      {active === 2 && <div className="form-grid"><div className="field"><label>Model</label><select defaultValue="knn"><option value="knn">KNN</option><option>Decision Tree</option><option>Regression</option></select></div><div className="field"><label>Parameters</label><input value="K = 5" readOnly /></div></div>}
      {active === 3 && <div className="loading-state"><div className="spinner" /><strong>{running ? 'Training complete' : 'Ready to train'}</strong><span>Local simulation uses the prepared sample rows.</span></div>}
      {active === 4 && <div className="metric-grid"><div className="metric-card"><span className="label">Accuracy</span><strong className="value">87.5%</strong></div><div className="metric-card"><span className="label">F1 Score</span><strong className="value">0.86</strong></div></div>}
      {active === 5 && <div className="workflow-chart"><div style={{ height: '82%' }} /><div style={{ height: '60%' }} /><div style={{ height: '92%' }} /><div style={{ height: '72%' }} /><div style={{ height: '96%' }} /></div>}
      <div className="action-row"><button className="action-btn secondary" type="button" onClick={previous}>Previous</button><button className="action-btn primary" type="button" onClick={active === 5 ? run : next}>{active === 5 ? <><Play size={16} /> Run Pipeline</> : 'Next'}</button><button className="action-btn secondary" type="button" onClick={() => { setActive(0); setRunning(false); }}><RotateCcw size={16} /> Reset</button></div>
    </section><section className="visual-card"><div className="section-head"><h3>Workflow Signal</h3></div><div className="workflow-list">{steps.map((step, index) => <div className={index <= active ? 'reached' : ''} key={step}><span>{index <= active ? <Check size={15} /> : index + 1}</span><div><strong>{step}</strong><small>{index <= active ? 'Complete' : 'Waiting'}</small></div></div>)}</div></section></div>
  </>;
}
