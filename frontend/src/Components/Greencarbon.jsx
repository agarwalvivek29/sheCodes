import React, { useEffect } from "react";
import { MdOutlineForest } from "react-icons/md";
import LineChart from "./LineChart";

import CarbonCreditCalculator from "./CarbonCreditCalculator";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../App";
import { dataActions } from "../store/data-slice";

const Greencarbon = () => {
  const { id } = useParams();
  const thisContract = useSelector((state)=>state.data.thisContract);
  const dispatch = useDispatch();

  const contracts = useSelector((state)=>state.data.contracts);
  const contract = contracts.find((contract)=>contract.address === id);

  const metaDataToken = contract?.metaData;
  console.log('metaDataToken:', metaDataToken);

  const getProjectData = async()=>{
    try{
      console.log(contracts.length);
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

  const navigate = useNavigate();

  useEffect(()=>{
    if(contract){
      getProjectData();
    }
    else{
      navigate('/tokens')
    }
  },[]);

  useEffect(()=>{
    console.log(thisContract);
  },[thisContract])

  // if(this)

  // // const totalCredits = 1000;
  // // const soldCredits = 150;
  // const remainingCreditsPercentage = ((thisContract.totalSupply - thisContract.availableTokens) / totalCredits) * 100;

  return (
    <div>
     
      {thisContract && <main>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-14 text-center ">
            { contract.name } : { contract.symbol }
          </h1>
          <div className="mb-4">
            <p className="font-bold pl-[80px]">
              Carbon credits generated: {Number(contract.initialSupply)}
            </p>
            <p className="font-bold pl-[80px]">
              Credits sold: {Number(contract.initialSupply) - Number(contract.availableTokens)}
            </p>
            <div className="relative pt-2 pl-[80px]">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${((contract.initialSupply - contract.availableTokens))/contract.initialSupply*100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 "
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                {(contract.availableTokens/contract.initialSupply)*100}% left
              </p>
            </div>
          </div>
          <div className="flex justify-around">
            <div>
                <div className="mb-4">
                <p className="font-bold pl-[80px]">
                  Contract Address : {contract.address}
                </p>
                <p className="font-bold pl-[80px]">
                  Seller Address : {contract.payoutAddress}
                </p>
                </div>
                <div>
                  <h2 className="font-bold pl-[80px]">Proof Image :</h2>
                  <img src={contract.metaData.image} className="h-50 w-50" />
                </div>
            </div>
            <div>
            <CarbonCreditCalculator price={Number(contract.salePrice)} contractAddress={contract.address}/>
            </div>
          </div>
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
