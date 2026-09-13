import { ArrowUpRight } from 'lucide-react';

export default function PracticalCard({ number, title, description, category, difficulty, icon: Icon, onOpen }) {
  return (
    <div className="practical-card">
      <div className="card-header-row">
        <div className="card-number">{number}</div>
        <div className="card-icon-wrap">
          <Icon size={18} />
        </div>
      </div>
      <div className="card-body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="meta-row">
        <span className="meta-badge">{category}</span>
        <span className="meta-badge subtle">{difficulty}</span>
      </div>
      <button type="button" className="primary-btn block-btn" onClick={onOpen}>
        Open Practical
        <ArrowUpRight size={16} />
      </button>
    </div>
  );
}
