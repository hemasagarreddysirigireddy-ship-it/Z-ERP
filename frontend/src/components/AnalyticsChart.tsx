import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download } from 'lucide-react';

interface DataPoint {
  label: string;
  value: number;
  color: string;
}

interface AnalyticsChartProps {
  title: string;
  data: DataPoint[];
  type?: 'bar' | 'line';
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ title, data }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="chart-panel">
      <div className="panel-header">
        <div className="panel-header-left">
          <BarChart3 size={20} />
          <h2 className="panel-title">{title}</h2>
        </div>
        <div className="chart-controls">
          <select 
            className="chart-selector"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="year">This Year</option>
          </select>
          <button className="icon-btn-small" title="Download Report">
            <Download size={16} />
          </button>
        </div>
      </div>
      
      <div className="chart-content">
        <div className="chart-wrapper">
          <div className="chart-grid">
            {data.map((item, index) => (
              <div key={index} className="chart-item">
                <div className="chart-bar-wrapper">
                  <div 
                    className="chart-bar-animated"
                    style={{ 
                      height: `${(item.value / maxValue) * 100}%`,
                      background: item.color
                    }}
                  >
                    <span className="chart-value">{item.value}</span>
                  </div>
                </div>
                <span className="chart-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="chart-summary">
          <div className="summary-item">
            <TrendingUp size={16} className="summary-icon" />
            <span>Total: <strong>{data.reduce((sum, d) => sum + d.value, 0)}</strong></span>
          </div>
          <div className="summary-item">
            <span>Avg: <strong>{Math.round(data.reduce((sum, d) => sum + d.value, 0) / data.length)}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
