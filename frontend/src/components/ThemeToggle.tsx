import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="theme-toggle-icons">
        <Sun 
          size={18} 
          className={`theme-icon sun-icon ${theme === 'light' ? 'active' : ''}`}
        />
        <Moon 
          size={18} 
          className={`theme-icon moon-icon ${theme === 'dark' ? 'active' : ''}`}
        />
      </div>
      <span className="theme-toggle-label">
        {theme === 'light' ? 'Light' : 'Dark'}
      </span>
    </button>
  );
};

export default ThemeToggle;
