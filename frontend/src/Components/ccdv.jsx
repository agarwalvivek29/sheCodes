import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Ccdv = () => {
  const [carKm, setCarKm] = useState(15000);
  const [fuelEfficiency, setFuelEfficiency] = useState(15);
  const [flights, setFlights] = useState([{ type: 'short-haul', distance: 1000 }, { type: 'long-haul', distance: 8000 }]);
  const [electricityKwh, setElectricityKwh] = useState(1500);
  const [totalWaste, setTotalWaste] = useState(800);
  const [recycledWaste, setRecycledWaste] = useState(200);
  const pageRef = useRef(null);

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const emissionFactors = {
    petrol: 2.31,
    publicTransport: 0.105,
    shortHaulFlight: 0.15,
    longHaulFlight: 0.115,
    electricity: 0.82,
    waste: 0.18,
  };

  const calculateEmissions = () => {
    const carEmissions = (carKm / fuelEfficiency) * emissionFactors.petrol;
    const flightEmissions = flights.reduce((total, flight) => {
      const factor = flight.type === 'short-haul' ? emissionFactors.shortHaulFlight : emissionFactors.longHaulFlight;
      return total + (flight.distance * factor);
    }, 0);
    const electricityEmissions = electricityKwh * emissionFactors.electricity;
    const wasteEmissions = (totalWaste - recycledWaste) * emissionFactors.waste;

    return {
      transportation: carEmissions + flightEmissions,
      homeEnergy: electricityEmissions,
      waste: wasteEmissions,
    };
  };

  const emissions = calculateEmissions();
  const totalEmissions = Object.values(emissions).reduce((sum, value) => sum + value, 0);

  const data = [
    { name: 'Transportation', value: emissions.transportation },
    { name: 'Home Energy', value: emissions.homeEnergy },
    { name: 'Waste', value: emissions.waste },
  ];

  const COLORS = ['#FFFDD0', '#90EE90', '#006400'];

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-4" ref={pageRef}>
      <h1 className="text-2xl font-bold mb-6">Carbon Emissions Calculator</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4">
          <InputRange label="Car Kilometers Driven" min="0" max="30000" value={carKm} onChange={setCarKm} unit="km" />
          <InputRange label="Fuel Efficiency (km/l)" min="5" max="30" value={fuelEfficiency} onChange={setFuelEfficiency} unit="km/l" />
          <InputRange label="Electricity Consumption (kWh)" min="0" max="5000" value={electricityKwh} onChange={setElectricityKwh} unit="kWh" />
          <InputRange label="Total Waste (kg)" min="0" max="2000" value={totalWaste} onChange={setTotalWaste} unit="kg" />
          <InputRange label="Recycled Waste (kg)" min="0" max="2000" value={recycledWaste} onChange={setRecycledWaste} unit="kg" />
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={75} fill="#8884d8">
                  {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center mt-4">Total Annual Carbon Emissions</p>
          <p className="text-center text-green-600 font-bold">{totalEmissions.toFixed(2)} kg CO<sub>2</sub></p>
          <div className="text-center mt-4">
            <Link to="/learn" className="flex items-center">See how it's calculated</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputRange = ({ label, min, max, value, onChange, unit }) => (
  <div className="mb-4">
    <label className="block text-gray-700">{label}</label>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full"
    />
    <div className="text-gray-500">{value} {unit}</div>
  </div>
);

export default Ccdv;
