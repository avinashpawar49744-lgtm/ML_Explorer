import { useState } from 'react';
import { Activity, Play, RotateCcw } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { initialMlpWeights, trainXorEpoch } from '../utils/mlp';

export default function MLP() {
  const [epochs, setEpochs] = useState(25);
  const [hidden, setHidden] = useState(2);
  const [learningRate, setLearningRate] = useState(0.35);
  const [state, setState] = useState({ epoch: 0, loss: 0.25, accuracy: 50, weights: initialMlpWeights });
  const runEpoch = () => setState((current) => { const result = trainXorEpoch(current.weights, learningRate); return { ...result, epoch: current.epoch + 1 }; });
  const train = () => { let next = { ...state }; for (let index = 0; index < epochs; index += 1) { const result = trainXorEpoch(next.weights, learningRate); next = { ...result, epoch: next.epoch + 1 }; } setState(next); };
  const reset = () => setState({ epoch: 0, loss: 0.25, accuracy: 50, weights: initialMlpWeights });

  return <>
    <PageHeader title="Multi-Layer Perceptron" subtitle="Neural Network Learning with Backpropagation" badge="Practical 9" />
    <div className="grid-two">
      <section className="form-panel"><div className="section-head"><h3>Network Controls</h3><Activity size={18} /></div><div className="form-grid">
        <div className="field"><label>Input neurons</label><input value="2" readOnly /></div>
        <div className="field"><label>Hidden layer neurons</label><input type="number" min="2" max="8" value={hidden} onChange={(event) => setHidden(Number(event.target.value))} /></div>
        <div className="field"><label>Learning rate</label><input type="number" min="0.05" max="1" step="0.05" value={learningRate} onChange={(event) => setLearningRate(Number(event.target.value))} /></div>
        <div className="field"><label>Epochs</label><input type="number" min="1" max="200" value={epochs} onChange={(event) => setEpochs(Number(event.target.value))} /></div>
      </div><div className="action-row"><button className="action-btn primary" type="button" onClick={train}><Play size={16} /> Train Network</button><button className="action-btn secondary" type="button" onClick={runEpoch}>Step Epoch</button><button className="action-btn secondary" type="button" onClick={reset}><RotateCcw size={16} /> Reset</button></div></section>
      <section className="visual-card network-panel"><div className="section-head"><h3>Network Architecture</h3><span className="status-badge purple">XOR Demo</span></div><div className="network-layers"><div><span className="layer-label">INPUT</span><i>1</i><i>2</i></div><b>→</b><div><span className="layer-label">HIDDEN</span>{Array.from({ length: hidden }, (_, index) => <i className="active-node" key={index}>σ</i>)}</div><b>→</b><div><span className="layer-label">OUTPUT</span><i className="output-node">ŷ</i></div></div><p className="muted-text">Forward propagation → loss calculation → backpropagation → weight update</p></section>
    </div>
    <section className="metric-grid"><div className="result-card tone-default"><span className="result-title">Epoch</span><strong className="result-value">{state.epoch}</strong></div><div className="result-card tone-warning"><span className="result-title">Training Loss</span><strong className="result-value">{state.loss.toFixed(4)}</strong></div><div className="result-card tone-success"><span className="result-title">Accuracy</span><strong className="result-value">{state.accuracy.toFixed(0)}%</strong></div></section>
    <section className="section-block" style={{ marginTop: '22px' }}><div className="section-head"><h3>Backpropagation Notes</h3></div><div className="grid-four"><div className="info-box"><strong>Forward Propagation</strong><br />Activations flow from the input layer to the prediction.</div><div className="info-box"><strong>Loss Calculation</strong><br />The squared error measures how far the output is from XOR.</div><div className="info-box"><strong>Backpropagation</strong><br />Gradients distribute output error through hidden neurons.</div><div className="info-box"><strong>Weight Update</strong><br />The learning rate controls each correction step.</div></div></section>
  </>;
}
