export default function ResultCard({ title, value, description, tone = 'default' }) {
  return (
    <div className={`result-card tone-${tone}`}>
      <div className="result-title">{title}</div>
      <div className="result-value">{value}</div>
      {description && <div className="result-description">{description}</div>}
    </div>
  );
}
