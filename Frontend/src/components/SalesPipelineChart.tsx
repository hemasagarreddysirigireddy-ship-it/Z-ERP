import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const data = [
  { stage: 'Leads', count: 136, color: '#ff00ff' },      // Magenta
  { stage: 'Qualified', count: 84, color: '#00d4ff' },   // Electric Cyan
  { stage: 'Proposals', count: 52, color: '#ffd700' },   // Gold
  { stage: 'Negotiation', count: 28, color: '#ff2d95' }, // Hot Pink
  { stage: 'Closed Won', count: 15, color: '#00ff9f' }   // Neon Green
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{payload[0].payload.stage}</p>
        <p style={{ color: payload[0].payload.color }}>
          Count: {payload[0].value}
        </p>
        <p style={{ color: '#94a3b8', fontSize: '12px' }}>
          {((payload[0].value / 136) * 100).toFixed(1)}% of total leads
        </p>
      </div>
    );
  }
  return null;
};

const SalesPipelineChart: React.FC = () => {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Sales Pipeline</h3>
          <p className="chart-subtitle">Current sales funnel distribution</p>
        </div>
        <div className="chart-stats">
          <div className="stat-item">
            <span className="stat-label">Total Leads</span>
            <span className="stat-value-mini">136</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Conversion Rate</span>
            <span className="stat-value-mini">11%</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <defs>
            {data.map((entry, index) => (
              <linearGradient key={index} id={`barGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={entry.color} stopOpacity={0.9}/>
                <stop offset="95%" stopColor={entry.color} stopOpacity={0.6}/>
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="stage" 
            stroke="rgba(255,255,255,0.6)"
            style={{ fontSize: '12px' }}
            angle={-15}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.6)"
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="count" 
            radius={[8, 8, 0, 0]}
            animationDuration={1000}
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#barGradient${index})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesPipelineChart;
