import PageHeader from '../components/PageHeader';

const technologies = ['React.js', 'JavaScript', 'Vite', 'CSS', 'Recharts', 'Machine Learning'];
const timeline = [
  'Learning Types: Core theory and problem framing',
  'Candidate Elimination: Querying and version space reduction',
  'Supervised ML: Model training and evaluation',
  'Regression: Curve fitting and error analysis',
  'KNN: Neighborhood voting and classification',
  'VC Dimension: capacity and sample complexity',
  'RBF Network: basis functions and local response',
  'Perceptron: linear threshold learning',
  'Multi-Layer Perceptron: backpropagation and XOR learning',
  'Mini Application: end-to-end ML workflow',
];

export default function About() {
  return (
    <>
      <PageHeader title="About ML Explorer" subtitle="An interactive laboratory for understanding machine learning concepts." badge="Project Overview" />

      <section className="about-grid">
        <div className="about-card">
          <div className="section-head">
            <h3>About the Project</h3>
          </div>
          <div className="info-box">
            ML Explorer is a premium frontend learning dashboard designed to visualize and explain essential machine learning concepts through local, interactive simulations. It focuses on clarity, conceptual understanding, and modern presentation for academic and portfolio use.
          </div>
        </div>

        <div className="about-card">
          <div className="section-head">
            <h3>Objectives</h3>
          </div>
          <div className="list-stack">
            <div><span>Understand</span><strong>Core ML theory</strong></div>
            <div><span>Implement</span><strong>Local algorithms</strong></div>
            <div><span>Visualize</span><strong>Learning behavior</strong></div>
          </div>
        </div>
      </section>

      <section className="grid-two" style={{ marginTop: '24px' }}>
        <div className="about-card">
          <div className="section-head">
            <h3>Machine Learning Practicals</h3>
          </div>
          <div className="timeline">
            {timeline.map((item, idx) => (
              <div key={item} className="timeline-item">
                <strong>{idx + 1}. Practical {idx + 1}</strong>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-card">
          <div className="section-head">
            <h3>Technologies Used</h3>
          </div>
          <div className="badge-row">
            {technologies.map((item) => (
              <span key={item} className="status-badge purple">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" style={{ marginTop: '24px' }}>
        <div className="section-head">
          <h3>How This Laboratory Works</h3>
        </div>
        <div className="info-box">
          Every practical is a self-contained, frontend-only module. The application uses small demonstration datasets and JavaScript-based calculations to model learning behavior, evaluate metrics, and illustrate concept boundaries without requiring any backend or external API.
        </div>
        <div className="info-box" style={{ marginTop: '14px' }}>
          Batch: B2
          <br />
          Project type: Machine Learning Laboratory
        </div>
      </section>
    </>
  );
}
