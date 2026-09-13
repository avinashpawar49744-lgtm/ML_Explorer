export default function PageHeader({ title, subtitle, badge }) {
  return (
    <div className="page-header">
      <div>
        <div className="section-kicker">{badge || 'Practical Lab'}</div>
        <h1>{title}</h1>
      </div>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
