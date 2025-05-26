import React from 'react';

export default function Result({ data }) {
  if (!data) return null;

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Your Carbon Footprint</h3>
      <p><strong>Transport:</strong> {data.transport}</p>
      <p><strong>Diet:</strong> {data.diet}</p>
      <p><strong>Electricity:</strong> {data.electricity} kWh/month</p>
      <p><strong>Total Carbon Footprint:</strong> {data.carbon} tons CO₂/month</p>
      <hr />
      <p>🌱 Tip: Try using public transport more and reducing meat to lower your footprint.</p>
    </div>
  );
}
