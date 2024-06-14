import React from "react";
import { MdOutlineForest } from "react-icons/md";
import LineChart from "./LineChart";
const Greencarbon = () => {
  const totalCredits = 1000;
  const soldCredits = 150;
  const remainingCreditsPercentage = (soldCredits / totalCredits) * 100;

  return (
    <div>
     
      <main>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-center ">
            Project: Wind Turbines in the Midwest
          </h1>
          <div className="mb-4">
            <p className="font-bold pl-[80px]">
              Carbon credits generated: {totalCredits.toLocaleString()}
            </p>
            <p className="font-bold pl-[80px]">
              Credits sold: {soldCredits.toLocaleString()}
            </p>
            <div className="relative pt-2 pl-[80px]">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${remainingCreditsPercentage}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 "
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                {remainingCreditsPercentage}% left
              </p>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="font-bold pl-[80px]">Goal</h2>
            <p className="pl-[110px]">
              The goal of this project is to reduce carbon emissions by 50% over
              3 years. This will be achieved by replacing coal burning power
              plants with wind turbines.
            </p>
          </div>
          <div>
            <h2 className="font-bold pl-[80px]">Carbon Credits</h2>
            <p className="pl-[110px]">
              Each carbon credit token represents 1 ton of CO2 removed from the
              atmosphere.
            </p>
          </div>
        </div>
      </main>
      <LineChart />
    </div>
  );
};

export default Greencarbon;
