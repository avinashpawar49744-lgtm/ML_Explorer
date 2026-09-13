import { ResponsiveContainer } from 'recharts';

export default function ChartContainer({ children, height = 260 }) {
  return (
    <div className="chart-container" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}
