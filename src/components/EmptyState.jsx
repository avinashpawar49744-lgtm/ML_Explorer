export default function EmptyState({ title, message, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state-title">{title}</div>
      <p>{message}</p>
      {action}
    </div>
  );
}
