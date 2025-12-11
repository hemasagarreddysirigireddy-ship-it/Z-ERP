import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
  { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000 },
  { month: 'Mar', revenue: 48000, expenses: 33000, profit: 15000 },
  { month: 'Apr', revenue: 61000, expenses: 38000, profit: 23000 },
  { month: 'May', revenue: 55000, expenses: 36000, profit: 19000 },
  { month: 'Jun', revenue: 67000, expenses: 40000, profit: 27000 },
  { month: 'Jul', revenue: 72000, expenses: 42000, profit: 30000 },
  { month: 'Aug', revenue: 68000, expenses: 41000, profit: 27000 },
  { month: 'Sep', revenue: 75000, expenses: 43000, profit: 32000 },
  { month: 'Oct', revenue: 82000, expenses: 45000, profit: 37000 },
  { month: 'Nov', revenue: 78000, expenses: 44000, profit: 34000 },
  { month: 'Dec', revenue: 85000, expenses: 46000, profit: 39000 }
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{payload[0].payload.month}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RevenueChart: React.FC = () => {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Revenue Overview</h3>
          <p className="chart-subtitle">Monthly revenue, expenses, and profit trends</p>
        </div>
        <div className="chart-legend-custom">
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#00d4ff' }}></span>
            <span>Revenue</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#ff2d95' }}></span>
            <span>Expenses</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#00ff9f' }}></span>
            <span>Profit</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.5}/>
              <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff2d95" stopOpacity={0.5}/>
              <stop offset="95%" stopColor="#ff2d95" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00ff9f" stopOpacity={0.5}/>
              <stop offset="95%" stopColor="#00ff9f" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="month" 
            stroke="rgba(255,255,255,0.6)"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.6)"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#00d4ff" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorRevenue)"
            name="Revenue"
          />
          <Area 
            type="monotone" 
            dataKey="expenses" 
            stroke="#ff2d95" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorExpenses)"
            name="Expenses"
          />
          <Area 
            type="monotone" 
            dataKey="profit" 
            stroke="#00ff9f" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorProfit)"
            name="Profit"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
