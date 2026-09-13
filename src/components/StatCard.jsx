export default function StatCard({ label, value, suffix, accent, icon: Icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ '--accent': accent }}>
        <Icon size={20} />
      </div>
      <div>
        <div className="stat-label">{label}</div>
        <div className="stat-value">
          {value}
          {suffix && <span>{suffix}</span>}
        </div>
      </div>
    </div>
  );
}
