import React, { useState, useRef, useEffect } from 'react';
import { Filter, ChevronRight } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  title: string;
  key: string;
  options: FilterOption[];
}

interface FilterDropdownProps {
  filterGroups: FilterGroup[];
  onFilterChange: (filters: { [key: string]: string }) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ filterGroups, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: string }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleFilterSelect = (key: string, value: string) => {
    const newFilters = { ...activeFilters };
    
    if (value === 'all' || newFilters[key] === value) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  // Find if a group has expandable items (like Sale Agent)
  const hasExpandable = (group: FilterGroup) => {
    return group.key === 'related';
  };

  return (
    <div className="filter-dropdown-container" ref={dropdownRef}>
      <button 
        className={`filter-btn ${activeFilterCount > 0 ? 'has-filters' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Filter size={18} />
        {activeFilterCount > 0 && (
          <span className="filter-badge">{activeFilterCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="filter-dropdown-menu">
          <div className="filter-menu-body">
            {filterGroups.map((group, groupIndex) => (
              <React.Fragment key={group.key}>
                {group.options.map((option) => (
                  <div
                    key={option.value}
                    className={`filter-menu-item ${
                      activeFilters[group.key] === option.value ? 'active' : ''
                    } ${hasExpandable(group) ? 'has-arrow' : ''}`}
                    onClick={() => handleFilterSelect(group.key, option.value)}
                  >
                    <span>{option.label}</span>
                    {hasExpandable(group) && <ChevronRight size={16} />}
                  </div>
                ))}
                {groupIndex < filterGroups.length - 1 && (
                  <div className="filter-menu-divider" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
