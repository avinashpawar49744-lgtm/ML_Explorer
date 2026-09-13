export default function Button({ children, variant = 'primary', className = '', type = 'button', onClick, disabled = false }) {
  return (
    <button type={type} className={`action-btn ${variant} ${className}`.trim()} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
