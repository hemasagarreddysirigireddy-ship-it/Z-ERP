import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { day: 'Mon', team1: 85, team2: 78, team3: 92, average: 85 },
  { day: 'Tue', team1: 88, team2: 82, team3: 89, average: 86 },
  { day: 'Wed', team1: 92, team2: 85, team3: 94, average: 90 },
  { day: 'Thu', team1: 87, team2: 83, team3: 91, average: 87 },
  { day: 'Fri', team1: 90, team2: 88, team3: 95, average: 91 },
  { day: 'Sat', team1: 84, team2: 80, team3: 87, average: 84 },
  { day: 'Sun', team1: 86, team2: 79, team3: 90, average: 85 }
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{payload[0].payload.day}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PerformanceChart: React.FC = () => {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Weekly Team Performance</h3>
          <p className="chart-subtitle">Real-time performance metrics across all teams</p>
        </div>
        <div className="performance-badges">
          <span className="badge badge-gradient-success">↑ 5.2% Growth</span>
          <span className="badge badge-gradient-primary">Avg: 87%</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="day" 
            stroke="rgba(255,255,255,0.6)"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.6)"
            style={{ fontSize: '12px' }}
            domain={[70, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}
          />
          <Line 
            type="monotone" 
            dataKey="team1" 
            stroke="#6366f1" 
            strokeWidth={3}
            dot={{ fill: '#6366f1', r: 5 }}
            activeDot={{ r: 7, fill: '#4f46e5' }}
            name="Team Alpha"
          />
          <Line 
            type="monotone" 
            dataKey="team2" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            dot={{ fill: '#8b5cf6', r: 5 }}
            activeDot={{ r: 7, fill: '#7c3aed' }}
            name="Team Beta"
          />
          <Line 
            type="monotone" 
            dataKey="team3" 
            stroke="#14b8a6" 
            strokeWidth={3}
            dot={{ fill: '#14b8a6', r: 5 }}
            activeDot={{ r: 7, fill: '#0d9488' }}
            name="Team Gamma"
          />
          <Line 
            type="monotone" 
            dataKey="average" 
            stroke="#f59e0b" 
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={false}
            name="Average"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
