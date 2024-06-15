import React, { useState } from "react";
import Web3 from "web3"
import OneTimeSaleToken from '../assets/OneTimeSaleToken.json'


export const CarbonCreditCalculator = ({ price , contractAddress }) => {
  const [quantity, setQuantity] = useState(1);
  const total = quantity * price;

  const web3 = new Web3(window.ethereum);
  const contractInstance = new web3.eth.Contract(OneTimeSaleToken.abi,contractAddress);

  const buyTokens = async ()=>{
    const accounts = await web3.eth.getAccounts();
        
    await contractInstance.methods.buyToken(quantity).send({
      from: accounts[0],
      value: web3.utils.toWei(total, 'ether')
    });
  }

  return (
    <div className="flex flex-col bg">
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
            <div className="p-2 bg-gray-200 rounded">{price} ETH</div>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Total</span>
            <div className="p-2 bg-gray-200 rounded">{total} ETH</div>
          </div>
        </div>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={buyTokens}>
          Buy Tokens
        </button>
      </div>
    </div>
  );
};

export default CarbonCreditCalculator;
