// File: src/utils/carbonCalculator.js

export function calculateCarbon({ transport, diet, electricity }) {
  const car = transport === 'car' ? 2.3 : 0;              // Adds 2.3 if transport is car, else 0
  const meat = diet === 'meat' ? 1.5 : 0.5;               // Adds 1.5 for meat diet, else 0.5
  const energy = parseFloat(electricity) * 0.4;           // Multiplies electricity use by 0.4

  return (car + meat + energy).toFixed(2);                // Returns total, rounded to 2 decimals
}