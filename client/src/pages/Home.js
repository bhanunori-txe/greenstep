import React, { useState, useEffect } from 'react';
import CalculatorForm from '../components/CalculatorForm';
/*import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from 'recharts';*/

const Home = () => {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('co2History');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('co2History', JSON.stringify(history));
  }, [history]);

  const handleCalculate = (data) => {
    setResult(data);

    const now = new Date();
    const month = now.toLocaleString('default', { month: 'short' });
    const year = now.getFullYear();

    const entry = {
      month: `${month} ${year}`,
      totalCO2: parseFloat(data.totalCO2),
      transportCO2: data.transportCO2,
      electricityCO2: parseFloat(data.electricityCO2),
      dietCO2: data.dietCO2,
    };

    setHistory((prev) => [...prev.slice(-5), entry]); // last 6 entries
  };

  return (
    <div className="home-container">
      <header>
        <h1>GreenStep CO₂ Calculator</h1>
        <p>Track your carbon footprint and take climate-friendly steps 🌿</p>
      </header>

      <style jsx>{`
        .home-container {
          min-height: 100vh;
          background-color: #1a1c2c;
          color: #e0e6f3;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 1rem;
        }

        header {
          text-align: center;
          margin-bottom: 2rem;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 0.3rem;
          color: #6a82fb;
        }

        main {
          width: 100%;
          max-width: 600px;
        }

        .result-box {
          margin-top: 2rem;
          background-color: #3b3f63;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(106, 130, 251, 0.7);
        }

        .charts {
          margin-top: 2rem;
        }

        .charts h3 {
          margin-bottom: 0.5rem;
          color: #a8b3ff;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Home;
