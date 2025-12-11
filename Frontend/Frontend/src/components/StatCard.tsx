import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
    label: string;
  };
  icon: LucideIcon;
  iconColor: string;
  onClick?: () => void;
  forecast?: string;
  alert?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  iconColor,
  onClick,
  forecast,
  alert
}) => {
  return (
    <div 
      className={`stat-card ${onClick ? 'stat-card-clickable' : ''} ${alert ? 'stat-card-alert' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {alert && (
        <div className="stat-alert">
          <AlertCircle size={14} />
          <span>{alert}</span>
        </div>
      )}
      <div className="stat-card-content">
        <div className="stat-header">
          <h3 className="stat-title">{title}</h3>
          <div className={`stat-icon ${iconColor}`}>
            <Icon size={24} />
          </div>
        </div>
        
        <div className="stat-value">{value}</div>
        
        {subtitle && <div className="stat-subtitle">{subtitle}</div>}
        
        {forecast && (
          <div className="stat-forecast">
            <span className="forecast-label">Forecast:</span> {forecast}
          </div>
        )}
        
        {trend && (
          <div className="stat-footer">
            <div className={`trend ${trend.isPositive ? 'trend-up' : 'trend-down'}`}>
              {trend.isPositive ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              <span>{trend.value}</span>
            </div>
            <span className="trend-label">{trend.label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
