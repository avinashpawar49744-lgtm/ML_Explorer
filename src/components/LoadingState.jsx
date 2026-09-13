export default function LoadingState({ message = 'Training model...' }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="spinner" />
      <span>{message}</span>
    </div>
  );
}
