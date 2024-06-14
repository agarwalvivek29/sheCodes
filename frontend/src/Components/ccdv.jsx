
import {Link , NavLink} from 'react-router-dom'
 
import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
 
const Ccdv = () => {
  const [carKm, setCarKm] = useState(15000);
  const [fuelEfficiency, setFuelEfficiency] = useState(15);
  const [publicTransportKm, setPublicTransportKm] = useState(1000);
  const [flights, setFlights] = useState([{ type: 'short-haul', distance: 1000 }, { type: 'long-haul', distance: 8000 }]);
  const [electricityKwh, setElectricityKwh] = useState(1500);
  const [heatingFuel, setHeatingFuel] = useState({ type: 'LPG', consumption: 500 });
  const [dietType, setDietType] = useState('non-vegetarian');
  const [annualExpenditureGoods, setAnnualExpenditureGoods] = useState(50000);
  const [annualExpenditureServices, setAnnualExpenditureServices] = useState(30000);
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
    diesel: 2.68,
    publicTransport: 0.105,
    shortHaulFlight: 0.15,
    longHaulFlight: 0.115,
    electricity: 0.82,
    LPG: 2.98,
    diet: {
      vegetarian: 1.5,
      nonVegetarian: 2.0,
    },
    goods: 0.0001,
    services: 0.0001,
    waste: 0.18,
  };
 
  const calculateEmissions = () => {
    const carEmissions = (carKm / fuelEfficiency) * emissionFactors.petrol;
    const publicTransportEmissions = publicTransportKm * emissionFactors.publicTransport;
    const flightEmissions = flights.reduce((total, flight) => {
      const factor = flight.type === 'short-haul' ? emissionFactors.shortHaulFlight : emissionFactors.longHaulFlight;
      return total + (flight.distance * factor);
    }, 0);
    const electricityEmissions = electricityKwh * emissionFactors.electricity;
    const heatingEmissions = heatingFuel.consumption * emissionFactors[heatingFuel.type];
    const dietEmissions = emissionFactors.diet[dietType];
    const goodsEmissions = annualExpenditureGoods * emissionFactors.goods;
    const servicesEmissions = annualExpenditureServices * emissionFactors.services;
    const wasteEmissions = (totalWaste - recycledWaste) * emissionFactors.waste;
 
    return {
      transportation: carEmissions + publicTransportEmissions + flightEmissions,
      homeEnergy: electricityEmissions + heatingEmissions,
      foodConsumption: dietEmissions,
      goodsServices: goodsEmissions + servicesEmissions,
      waste: wasteEmissions,
    };
  };
 
  const emissions = calculateEmissions();
  const totalEmissions = Object.values(emissions).reduce((sum, value) => sum + value, 0);
 
  const data = [
    { name: 'Transportation', value: emissions.transportation },
    { name: 'Home Energy', value: emissions.homeEnergy },
    { name: 'Food Consumption', value: emissions.foodConsumption },
    { name: 'Goods & Services', value: emissions.goodsServices },
    { name: 'Waste', value: emissions.waste },
  ];
 
  const COLORS = ['#FFFDD0', '#90EE90', '#006400', '#8B4513', '#FF6347'];
 
  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-4" ref={pageRef}>
      <h1 className="text-2xl font-bold mb-6">Carbon Emissions Calculator</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4">
          <InputRange label="Car Kilometers Driven" min="0" max="30000" value={carKm} onChange={setCarKm} unit="km" />
          <InputRange label="Fuel Efficiency (km/l)" min="5" max="30" value={fuelEfficiency} onChange={setFuelEfficiency} unit="km/l" />
          <InputRange label="Public Transport Kilometers" min="0" max="5000" value={publicTransportKm} onChange={setPublicTransportKm} unit="km" />
          <InputRange label="Electricity Consumption (kWh)" min="0" max="5000" value={electricityKwh} onChange={setElectricityKwh} unit="kWh" />
          <InputRange label="Heating Fuel Consumption (units)" min="0" max="1000" value={heatingFuel.consumption} onChange={(value) => setHeatingFuel({ ...heatingFuel, consumption: value })} unit="units" />
          <div className="mb-4">
            <label className="block text-gray-700">Diet Type</label>
            <select value={dietType} onChange={(e) => setDietType(e.target.value)} className="w-full">
              <option value="non-vegetarian">Non-Vegetarian</option>
              <option value="vegetarian">Vegetarian</option>
            </select>
          </div>
          <InputRange label="Annual Expenditure on Goods (INR)" min="0" max="200000" value={annualExpenditureGoods} onChange={setAnnualExpenditureGoods} unit="INR" />
          <InputRange label="Annual Expenditure on Services (INR)" min="0" max="200000" value={annualExpenditureServices} onChange={setAnnualExpenditureServices} unit="INR" />
          <InputRange label="Total Waste (kg)" min="0" max="2000" value={totalWaste} onChange={setTotalWaste} unit="kg" />
          <InputRange label="Recycled Waste (kg)" min="0" max="2000" value={recycledWaste} onChange={setRecycledWaste} unit="kg" />
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={75} fill="#8884d8">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center mt-4">Total Annual Carbon Emissions</p>
          <p className="text-center text-green-600 font-bold">{totalEmissions.toFixed(2)} kg CO<sub>2</sub></p>
          <div className="text-center mt-4">
          <Link to="/learn2" className="flex items-center">See how it's calculated</Link>
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