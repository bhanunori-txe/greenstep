import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export default function CO2Scorecard({ averageCO2 = 0, suggestions = [], electricityData = [] }) {
  const getSuggestionIcon = (type) => {
    return type === 'positive' ? (
      <CheckCircle style={{ color: '#32cd32', verticalAlign: 'middle' }} size={18} />
    ) : (
      <AlertTriangle style={{ color: '#ffcc00', verticalAlign: 'middle' }} size={18} />
    );
  };

  return (
    <div className="App">
      {/* CO2 Scorecard */}
      <div className="card">
        <h2>Your Average CO₂</h2>
        <p
          style={{
            fontSize: '2.5rem',
            color: averageCO2 !== 'N/A' ? '#32cd32' : '#bbb',
            margin: '10px 0',
          }}
        >
          {averageCO2 !== 'N/A' ? `${averageCO2} tons` : 'N/A'}
        </p>
        <p style={{ fontSize: '0.9rem', color: '#bbb' }}>Based on your recent submissions</p>
      </div>

      {/* Suggestions */}
      <div className="card">
        <h2>Green Suggestions</h2>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {suggestions.map((sug, idx) => (
            <li key={idx} style={{ marginBottom: '8px', fontSize: '1rem' }}>
              {getSuggestionIcon(sug.type)}{' '}
              <span style={{ marginLeft: '8px' }}>{sug.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Electricity Usage Chart */}
      <div className="card">
        <h2>Electricity Usage</h2>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={electricityData}>
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip
                contentStyle={{ backgroundColor: '#333', borderColor: '#555', color: '#fff' }}
              />
              <Bar dataKey="kWh" fill="#6a0dad" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
