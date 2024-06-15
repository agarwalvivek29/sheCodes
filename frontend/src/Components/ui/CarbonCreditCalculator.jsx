import React, { useState } from "react";

export const CarbonCreditCalculator = () => {
  const [quantity, setQuantity] = useState(0);
  const price = 20; // Example price per unit
  const total = quantity * price;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex flex-col mb-4">
          <label htmlFor="quantity" className="mb-2 font-semibold">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col mb-4">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Price per unit</span>
            <div className="p-2 bg-gray-200 rounded">{price}</div>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Total</span>
            <div className="p-2 bg-gray-200 rounded">{total}</div>
          </div>
        </div>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Calculate
        </button>
      </div>
    </div>
  );
};

export default CarbonCreditCalculator;
