import React from 'react';
import './Loading.css';

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <h1>VisuAlize</h1>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;