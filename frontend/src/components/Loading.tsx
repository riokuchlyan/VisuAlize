// internal
import './Loading.css';

// external

// built-in
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <h1>VisuAlize</h1>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;