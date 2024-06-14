import React from "react";
import "./CarbonFootprintCalculator.css";

const CarbonFootprintCalculator = () => {
  return (
    <div className="calculator">
      <h1 className="text-4xl font-bold	">Carbon Footprint Calculator</h1>
      <div className="section">
        <h2 className="font-bold text-xl mt-2">Transportation</h2>
        <div className="formula-box ">
          <p className="bg-transparent">
            <strong className="bg-transparent">Car Emissions (kg CO₂):</strong>
          </p>
          <p className="bg-transparent">
            Car Emissions = (Total Kilometers Driven / Fuel Efficiency (km/l)) ×
            Emission Factor (kg CO₂ per liter)
          </p>
        </div>
        <div className="formula-box">
          <p className="bg-transparent">
            <strong className="bg-transparent">
              Public Transport Emissions (kg CO₂):
            </strong>
          </p>
          <p className="bg-transparent">
            Public Transport Emissions = Distance Traveled (km) × Emission
            Factor (kg CO₂ per km)
          </p>
        </div>
        <div className="formula-box">
          <p className="bg-transparent">
            <strong className="bg-transparent">
              Air Travel Emissions (kg CO₂):
            </strong>
          </p>
          <p className="bg-transparent">
            Air Travel Emissions = Flight Distance (km) × Emission Factor (kg
            CO₂ per km)
          </p>
        </div>
      </div>
      <div className="section">
        <h2 className="font-bold text-xl mt-2">Home Energy Use</h2>
        <div className="formula-box">
          <p className="bg-transparent">
            <strong className="bg-transparent">
              Electricity Emissions (kg CO₂):
            </strong>
          </p>
          <p className="bg-transparent">
            Electricity Emissions = Annual kWh × Emission Factor (kg CO₂ per
            kWh)
          </p>
        </div>
        <div className="formula-box">
          <p className="bg-transparent">
            <strong className="bg-transparent">
              Heating Emissions (kg CO₂):
            </strong>
          </p>
          <p className="bg-transparent">
            Heating Emissions = Annual Consumption (kg) × Emission Factor (kg
            CO₂ per kg of LPG)
          </p>
        </div>
      </div>
      <div className="section">
        <h2 className="font-bold text-xl mt-2">Food Consumption</h2>
        <div className="formula-box">
          <p className="bg-transparent">
            <strong className="bg-transparent">Dietary Emissions:</strong>
          </p>
          <p className="bg-transparent">
            Vegetarian Diet: 1.5 t CO₂e, Non-Vegetarian Diet: 2.0 t CO₂e
          </p>
        </div>
      </div>
      <div className="section">
        <h2 className="font-bold text-xl mt-2">Goods and Services</h2>
        <div className="formula-box">
          <p className="bg-transparent">
            <strong className="bg-transparent">
              Consumer Goods and Services Emissions (kg CO₂):
            </strong>
          </p>
          <p className="bg-transparent">
            Goods and Services Emissions = Annual Expenditure (INR) × Emission
            Factor (kg CO₂ per INR)
          </p>
        </div>
      </div>
      <div className="section">
        <h2 className="font-bold text-xl mt-2">Waste</h2>
        <div className="formula-box">
          <p className="bg-transparent">
            <strong className="bg-transparent">
              Waste Emissions (kg CO₂):
            </strong>
          </p>
          <p className="bg-transparent">
            Waste Emissions = (Total Waste (kg) - Recycled Waste (kg)) ×
            Emission Factor (kg CO₂ per kg of waste)
          </p>
        </div>
      </div>
      <div className="section total">
        <h2 className="font-bold text-xl mt-2">
          Total Annual Carbon Footprint
        </h2>
        <div className="formula-box">
          <p className="bg-transparent">
            <strong className="bg-transparent">
              <p className="bg-transparent">Total Carbon Footprint (kg CO₂):</p>
            </strong>{" "}
            Total Carbon Footprint (kg CO₂) = Transportation Emissions + Home
            Energy Emissions + Food Consumption Emissions + Goods and Services
            Emissions + Waste Emissions
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintCalculator;
