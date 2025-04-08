import React from 'react';
import TickerInput from '../components/TickerInput';

const HomePage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "98vh",
        textAlign: "center",
        background: "linear-gradient(135deg,rgb(0, 0, 0), #c3cfe2)",
        borderRadius: "20px",
      }}
    >
      <h1>Welcome to VisuAlize</h1>
      <p>
        Visualize your stock data instantly. Simply enter a stock ticker below to get started and see your data come to life.
      </p>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          marginTop: "20px",
          width: "300px",
        }}
      >
        <TickerInput />
      </div>
    </div>
  );
};

export default HomePage;
