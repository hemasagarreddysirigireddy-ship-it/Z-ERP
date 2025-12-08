import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface DateFilterProps {
  onChange?: (period: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onChange }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('Week');

  const periods = ['Today', 'Week', 'Month', 'Quarter', 'Year', 'Custom'];

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    onChange?.(period);
  };

  return (
    <div className="date-filter">
      <Calendar size={18} />
      <div className="date-filter-buttons">
        {periods.map((period) => (
          <button
            key={period}
            className={`filter-btn ${selectedPeriod === period ? 'filter-btn-active' : ''}`}
            onClick={() => handlePeriodChange(period)}
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DateFilter;
