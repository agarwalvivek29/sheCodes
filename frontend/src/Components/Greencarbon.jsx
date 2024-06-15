import React, { useEffect } from "react";
import { MdOutlineForest } from "react-icons/md";
import LineChart from "./LineChart";

import CarbonCreditCalculator from "./ui/CarbonCreditCalculator";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import backendUrl from "../App";
import { dataActions } from "../store/data-slice";

const Greencarbon = () => {
  const { id } = useParams();
  const thisContract = useSelector((state)=>state.data.thisContract);
  const dispatch = useDispatch();

  const contracts = useSelector((state)=>state.data.contracts);
  const contract = contracts.find((contract)=>contract.address === id);

  const metaDataToken = contract.metaData;
  const getProjectData = async()=>{
    try{
      if(contracts.length !== 0){
        const response = await fetch(`${backendUrl}/contract/get/${metaDataToken}`);
        const data = await response.json();
        if(data.success){
          dispatch(dataActions.setThisContract({
            ...data.contract,
            metaData : data.metaData
          }));
        }
      }
    }
    catch(err){
      console.log('error:', err);
    }
  }

  useEffect(()=>{
    getProjectData();
  },[contracts]);

  // if(this)

  // // const totalCredits = 1000;
  // // const soldCredits = 150;
  // const remainingCreditsPercentage = ((thisContract.totalSupply - thisContract.availableTokens) / totalCredits) * 100;

  return (
    <div>
     
      {thisContract && <main>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-center ">
            Project: Wind Turbines in the Midwest
          </h1>
          <div className="mb-4">
            <p className="font-bold pl-[80px]">
              Carbon credits generated: {thisContract.totalSupply.toLocaleString()}
            </p>
            <p className="font-bold pl-[80px]">
              Credits sold: {thisContract.totalSupply.toLocaleString() - thisContract.availableTokens.toLocaleString()}
            </p>
            <div className="relative pt-2 pl-[80px]">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${((thisContract.totalSupply.toLocaleString() - thisContract.availableTokens.toLocaleString())/thisContract.totalSupply.toLocaleString())*100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 "
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                {(thisContract.availableTokens.toLocaleString()/thisContract.totalSupply.toLocaleString())*100}% left
              </p>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="font-bold pl-[80px]">Goal</h2>
            <p className="pl-[110px]">
              {thisContract.metaData.description}
            </p>
          </div>
          <div>
            <h2 className="font-bold pl-[80px]">Carbon Credits</h2>
            <p className="pl-[110px]">
              Each carbon credit token represents 1 ton of CO2 removed from the
              atmosphere.
            </p>
          </div>
          <CarbonCreditCalculator />
        </div>
        <div>
          <div>
            
          </div>
        </div>
      </main>}
      {
        !thisContract && <h1>Loading...</h1>
      }
      {/* <LineChart /> */}
    </div>
  );
};

export default Greencarbon;
