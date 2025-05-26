import React, { useState, useEffect } from 'react';
import CalculatorForm from '../components/CalculatorForm';
import SubmissionHistory from '../components/SubmissionHistory';

export default function Calculate() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:5000/api/submissions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setEntries(data);
        else console.error('Failed fetching submissions:', data);
      } catch (err) {
        console.error('Error fetching submissions:', err);
      }
    };
    fetchSubmissions();
  }, []);

  const handleSubmit = async (resultData) => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(resultData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert('Submission failed.');
        console.error('Backend error:', data);
      } else {
        alert('✅ Submission saved!');
        setEntries((prev) => [data, ...prev]);
      }
    } catch (err) {
      console.error('Request failed:', err);
      alert('Failed to connect to the server.');
    }
  };

  return (
    <div className="container">
      <h2>Calculate Your Carbon Footprint</h2>

      <CalculatorForm onCalculate={handleSubmit} />

      <div style={{ marginTop: '2rem' }}>
        <h3>Submission History</h3>
        <SubmissionHistory entries={entries} />
      </div>

      <style jsx>{`
        .container {
          padding: 2rem;
          background-color: #1a1c2c;
          color: #e0e6f3;
          min-height: 100vh;
        }

        h2, h3 {
          color: #6a82fb;
        }
      `}</style>
    </div>
  );
}
