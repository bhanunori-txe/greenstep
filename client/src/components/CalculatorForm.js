import React, { useState } from 'react';

const CalculatorForm = ({ onCalculate }) => {
  const [transportMode, setTransportMode] = useState('car');
  const [diet, setDiet] = useState('meat');
  const [electricityUsage, setElectricityUsage] = useState('');
  const [tipSaved, setTipSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate transport CO2 (static approximation)
    const transportCO2 = transportMode === 'car' ? 411 : 89;

    // Electricity CO₂ = kWh * 0.417 kg
    const electricityKwh = parseFloat(electricityUsage || 0);
    const electricityCO2 = electricityKwh * 0.417;

    // Diet CO2 approximation
    let dietCO2 = 208; // default for meat
    if (diet === 'vegetarian') dietCO2 = 141;
    else if (diet === 'vegan') dietCO2 = 125;

    const totalCO2Kg = transportCO2 + electricityCO2 + dietCO2;
    const totalCO2Tons = (totalCO2Kg / 1000).toFixed(2); // convert kg to tons

    onCalculate({
      transport: transportMode,
      diet,
      electricity: electricityKwh,
      carbon: totalCO2Tons,
      tipSaved,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="calculator-form">
      <label>
        Transport Mode:
        <select value={transportMode} onChange={(e) => setTransportMode(e.target.value)}>
          <option value="car">Car</option>
          <option value="public">Public Transport</option>
        </select>
      </label>

      <label>
        Diet Type:
        <select value={diet} onChange={(e) => setDiet(e.target.value)}>
          <option value="meat">Meat</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
        </select>
      </label>

      <label>
        Electricity usage (kWh/month):
        <input
          type="number"
          value={electricityUsage}
          onChange={(e) => setElectricityUsage(e.target.value)}
          min="0"
          required
        />
      </label>

      <label className="tip-checkbox">
        <input
          type="checkbox"
          checked={tipSaved}
          onChange={() => setTipSaved(!tipSaved)}
        />
        Save green tips via email
      </label>

      <button type="submit">Calculate CO₂ Score</button>

      <style jsx>{`
        .calculator-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background-color: #2c2f4a;
          padding: 1.5rem;
          border-radius: 8px;
          color: #e0e6f3;
          max-width: 320px;
          margin: 0 auto;
        }

        label {
          display: flex;
          flex-direction: column;
          font-weight: 600;
        }

        select,
        input {
          margin-top: 0.5rem;
          padding: 0.5rem;
          border-radius: 4px;
          border: none;
        }

        .tip-checkbox {
          flex-direction: row;
          align-items: center;
          gap: 0.5rem;
          font-weight: 400;
        }

        button {
          background-color: #4b6cb7;
          color: white;
          border: none;
          padding: 0.75rem;
          font-weight: bold;
          border-radius: 6px;
          cursor: pointer;
        }

        button:hover {
          background-color: #3a539b;
        }
      `}</style>
    </form>
  );
};

export default CalculatorForm;
