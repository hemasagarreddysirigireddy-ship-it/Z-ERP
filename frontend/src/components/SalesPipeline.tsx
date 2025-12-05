import React from 'react';
import { TrendingUp, DollarSign, Users, Target } from 'lucide-react';

const SalesPipeline: React.FC = () => {
  const pipelineStages = [
    { stage: 'New', count: 45, value: '$125,000', color: '#3b82f6' },
    { stage: 'Contacted', count: 32, value: '$98,000', color: '#8b5cf6' },
    { stage: 'In Discussion', count: 24, value: '$156,000', color: '#ec4899' },
    { stage: 'Proposal Shared', count: 18, value: '$245,000', color: '#f59e0b' },
    { stage: 'Closed Won', count: 12, value: '$189,000', color: '#10b981' },
    { stage: 'Closed Lost', count: 8, value: '$67,000', color: '#ef4444' }
  ];

  const metrics = [
    { label: 'Conversion Rate', value: '26.7%', icon: Target, trend: '+3.2%' },
    { label: 'Avg Lead Value', value: '$8,450', icon: DollarSign, trend: '+12%' },
    { label: 'Active Leads', value: '139', icon: Users, trend: '+8' }
  ];

  return (
    <div className="sales-pipeline">
      <div className="pipeline-header">
        <h3>Sales Pipeline</h3>
        <div className="pipeline-period">
          <select className="period-select">
            <option>This Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      <div className="pipeline-metrics">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="pipeline-metric-card">
              <div className="metric-icon">
                <Icon size={20} />
              </div>
              <div className="metric-content">
                <div className="metric-label">{metric.label}</div>
                <div className="metric-value">{metric.value}</div>
                <div className="metric-trend">
                  <TrendingUp size={14} />
                  {metric.trend}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pipeline-funnel">
        {pipelineStages.map((stage, index) => {
          const widthPercent = 100 - (index * 12);
          return (
            <div key={index} className="funnel-stage">
              <div 
                className="funnel-bar" 
                style={{ 
                  width: `${widthPercent}%`,
                  backgroundColor: stage.color
                }}
              >
                <div className="funnel-content">
                  <div className="funnel-stage-name">{stage.stage}</div>
                  <div className="funnel-stats">
                    <span className="funnel-count">{stage.count} leads</span>
                    <span className="funnel-value">{stage.value}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SalesPipeline;
