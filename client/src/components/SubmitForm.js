import React, { useState } from 'react';

export default function SubmitForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    transport: '',
    diet: '',
    electricity: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const newEntry = await res.json();

      if (res.ok) {
        if (onSubmit) {
          onSubmit(newEntry);
        }
        setFormData({ transport: '', diet: '', electricity: '' });
      } else {
        alert('Submission failed: ' + (newEntry.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting.');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form-label">
        Transport:
        <select
          name="transport"
          value={formData.transport}
          onChange={handleChange}
          required
          className="form-select"
        >
          <option value="">Select</option>
          <option value="car">Car</option>
          <option value="public">Public Transport</option>
        </select>
      </label>

      <label className="form-label">
        Diet:
        <select
          name="diet"
          value={formData.diet}
          onChange={handleChange}
          required
          className="form-select"
        >
          <option value="">Select</option>
          <option value="meat">Meat-based</option>
          <option value="vegetarian">Vegetarian</option>
        </select>
      </label>

      <label className="form-label">
        Electricity usage (kWh/month):
        <input
          type="number"
          name="electricity"
          value={formData.electricity}
          onChange={handleChange}
          required
          className="form-input"
          min="0"
          step="0.1"
          placeholder="e.g. 150"
        />
      </label>

      <button type="submit" className="btn-primary">
        Calculate & Submit
      </button>
    </form>
  );
}
