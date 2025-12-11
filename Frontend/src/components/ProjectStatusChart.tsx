import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Completed', value: 42, color: '#10b981' },    // Emerald Green
  { name: 'In Progress', value: 28, color: '#6366f1' },  // Indigo Purple
  { name: 'Pending', value: 15, color: '#f59e0b' },      // Amber Orange
  { name: 'Overdue', value: 8, color: '#ef4444' }        // Red
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const percentage = ((payload[0].value / total) * 100).toFixed(1);
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{payload[0].name}</p>
        <p style={{ color: payload[0].payload.color }}>
          Count: {payload[0].value}
        </p>
        <p style={{ color: '#94a3b8', fontSize: '12px' }}>
          {percentage}% of total tasks
        </p>
      </div>
    );
  }
  return null;
};

const ProjectStatusChart: React.FC = () => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="chart-card chart-card-small">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Project Status Overview</h3>
          <p className="chart-subtitle">Real-time project tracking & analytics</p>
        </div>
        <div className="status-badge-total">
          <span className="badge badge-gradient-info">{total} Total Projects</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="pie-chart-legend">
        {data.map((entry, index) => (
          <div key={index} className="pie-legend-item">
            <div className="pie-legend-color" style={{ background: entry.color }}></div>
            <div className="pie-legend-info">
              <span className="pie-legend-label">{entry.name}</span>
              <span className="pie-legend-value">{entry.value} ({((entry.value / total) * 100).toFixed(0)}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectStatusChart;
