// Enhanced Loading Component
import React from 'react';
import './Loading.css';

interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ fullScreen = true, message = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className="loading-content">
          <div className="loading-spinner-modern"></div>
          <p className="loading-message">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="loading-inline">
      <div className="loading-spinner-small"></div>
      <span>{message}</span>
    </div>
  );
};

export default Loading;
