import React from 'react';
import './CarbonFootprintCalculator.css';
 
const CarbonFootprintCalculator = () => {
  return (
    <div className="calculator">
      <h1>Carbon Footprint Calculator</h1>
      <div className="section">
        <h2>Transportation</h2>
        <div className="formula-box">
          <p><strong>Car Emissions (kg CO₂):</strong></p>
          <p>Car Emissions = (Total Kilometers Driven / Fuel Efficiency (km/l)) × Emission Factor (kg CO₂ per liter)</p>
        </div>
        <div className="formula-box">
          <p><strong>Public Transport Emissions (kg CO₂):</strong></p>
          <p>Public Transport Emissions = Distance Traveled (km) × Emission Factor (kg CO₂ per km)</p>
        </div>
        <div className="formula-box">
          <p><strong>Air Travel Emissions (kg CO₂):</strong></p>
          <p>Air Travel Emissions = Flight Distance (km) × Emission Factor (kg CO₂ per km)</p>
        </div>
      </div>
      <div className="section">
        <h2>Home Energy Use</h2>
        <div className="formula-box">
          <p><strong>Electricity Emissions (kg CO₂):</strong></p>
          <p>Electricity Emissions = Annual kWh × Emission Factor (kg CO₂ per kWh)</p>
        </div>
        <div className="formula-box">
          <p><strong>Heating Emissions (kg CO₂):</strong></p>
          <p>Heating Emissions = Annual Consumption (kg) × Emission Factor (kg CO₂ per kg of LPG)</p>
        </div>
      </div>
      <div className="section">
        <h2>Food Consumption</h2>
        <div className="formula-box">
          <p><strong>Dietary Emissions:</strong></p>
          <p>Vegetarian Diet: 1.5 t CO₂e, Non-Vegetarian Diet: 2.0 t CO₂e</p>
        </div>
      </div>
      <div className="section">
        <h2>Goods and Services</h2>
        <div className="formula-box">
          <p><strong>Consumer Goods and Services Emissions (kg CO₂):</strong></p>
          <p>Goods and Services Emissions = Annual Expenditure (INR) × Emission Factor (kg CO₂ per INR)</p>
        </div>
      </div>
      <div className="section">
        <h2>Waste</h2>
        <div className="formula-box">
          <p><strong>Waste Emissions (kg CO₂):</strong></p>
          <p>Waste Emissions = (Total Waste (kg) - Recycled Waste (kg)) × Emission Factor (kg CO₂ per kg of waste)</p>
        </div>
      </div>
      <div className="section total">
        <h2>Total Annual Carbon Footprint</h2>
        <div className="formula-box">
          <p>Total Carbon Footprint (kg CO₂) = Transportation Emissions + Home Energy Emissions + Food Consumption Emissions + Goods and Services Emissions + Waste Emissions</p>
        </div>
      </div>
    </div>
  );
};
 
export default CarbonFootprintCalculator;