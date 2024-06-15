import React, { useEffect, useRef, useState } from "react";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { cn } from "../utils/cn";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../store/data-slice";
import { backendUrl } from "../App";

export function ProjectRegistration() {
  const [file, setFile] = useState(null);
  const [fileLink, setFileLink] = useState(null);
  const [carbonCredits, setCarbonCredits] = useState(null);
  const [metaData, setMetaData] = useState(null);

  const [projectName, setProjectName] = useState("");
  const [projectSymbol, setProjectSymbol] = useState("");
  const [treeTypes, setTreeTypes] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [numberTrees, setNumberTrees] = useState(0);
  const [circumference, setCircumference] = useState(50);
  const [age, setAge] = useState(0);
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch();
  const inputRef = useRef();
  const walletAddress = useSelector((state)=>state.data.walletAddress);

  const connectWallet = async () => {
    if(window.ethereum) {
      console.log('MetaMask detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        dispatch(dataActions.setWalletAddress(accounts[0]));
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  };

  useEffect(()=>{
    if(!walletAddress){
      connectWallet();
    }
  },[]);

  async function deployContract() {
    const bodyData = {
      name : projectName,
      symbol : projectSymbol,
      initialSupply : parseInt(carbonCredits),
      salePrice : (parseFloat(price)*(Math.pow(10,18)))+"",
      metaData : metaData._id,
      payoutAddress : walletAddress
    };

    try {
      const response = await fetch(`${backendUrl}/deploy/tokenContract`, {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: { "Content-Type": "application/json" }
      });
      const res = await response.json();
      alert(`${res.message} ${res.address}`);
    } catch (e) {
      console.log(e);
    }
  }

  async function sendMetaData() {
    const bodyData = {
      image: fileLink,
      desc: projectName,
      treeTypes: treeTypes.split(","),
      lattitude : latitude,
      longitude,
      numberTrees: parseInt(numberTrees),
      age: parseInt(age),
      circumference: parseInt(circumference)
    };

    try {
      const response = await fetch(`${backendUrl}/metaData/upload`, {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: { "Content-Type": "application/json" }
      });
      const res = await response.json();
      if(res.success){
        setMetaData(res.metaData);
        await getCarbonCredits();
      }
      else{
        console.log("Something went wrong on the backend...");
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getCarbonCredits() {
    let dryWeight = 6.31 * Math.pow(10, -6) * Math.pow(circumference, 3.7);
    let carbonCredits = dryWeight * 1.835;
    setCarbonCredits(carbonCredits);
    console.log("Carbon Credits: ", carbonCredits);
    await deployContract();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMetaData();
    // console.log(metaData);
    // if(metaData){
    //   await getCarbonCredits();
    // }
    // console.log(carbonCredits);
    // if(carbonCredits && metaData){
    //   await deployContract();
    // }
  };

  const getFileLink = async () => {
    if (file) {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${backendUrl}/cloudinary/upload`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      if (res?.url) {
        setFileLink(res.url);
      } else {
        console.log("Something went wrong on the backend...");
      }
    } else {
      console.log("File not selected");
    }
  };

  const handleGetCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.error("Error getting coordinates: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="m-5">
        <div className="h-[40rem] w-40rem min-w-[40rem] flex items-center justify-center overflow-hidden">
          {fileLink ? (
            <img
              src={fileLink}
              alt="preview"
              className="object-cover h-full w-full"
            />
          ) : (
            <div
              className="h-full w-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center"
              onClick={() => {
                inputRef.current.click();
              }}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  getFileLink();
                }}
                ref={inputRef}
              />
              📸
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-transparent dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            New Project Registration
          </h2>
          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                placeholder="Amazon reforestation initiative...."
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="projectSymbol">Project Symbol</Label>
              <Input
                id="projectSymbol"
                placeholder="AFI, OAS..."
                type="text"
                value={projectSymbol}
                onChange={(e) => setProjectSymbol(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="price">Price (in ETH)</Label>
              <Input
                id="price"
                placeholder="in ETH"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="treeTypes">Tree Types</Label>
              <Input
                id="treeTypes"
                placeholder="Enter all tree types comma separated"
                type="text"
                value={treeTypes}
                onChange={(e) => setTreeTypes(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <div className="flex items-center">
                <Label htmlFor="coordinates">
                  GeoLocation
                  <button
                    type="button"
                    onClick={handleGetCoordinates}
                    className="rounded-full p-2"
                  >
                    📍
                  </button>
                </Label>
              </div>

              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    placeholder="13.116519 / N 13° 6' 59.469''"
                    type="text"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    placeholder="77.642146 / E 77° 38' 31.727''"
                    type="text"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </LabelInputContainer>
              </div>
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="numberTrees">Number of Trees</Label>
              <Input
                id="numberTrees"
                placeholder="5000"
                type="number"
                min="0"
                value={numberTrees}
                onChange={(e) => setNumberTrees(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="circumference">
                Circumference (approx. in cm)
              </Label>
              <Input
                id="circumference"
                placeholder="50"
                type="number"
                min="0"
                value={circumference}
                onChange={(e) => setCircumference(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="age">Age (avg.)</Label>
              <Input
                id="age"
                placeholder="70"
                type="number"
                min="0"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </LabelInputContainer>

            {carbonCredits && (
              <LabelInputContainer className="mb-4">
                <Label htmlFor="carbonCredits">
                  Carbon Credits Initialized
                </Label>
                <Input
                  id="carbonCredits"
                  placeholder="70"
                  type="number"
                  min="0"
                  disabled
                  value={carbonCredits}
                />
              </LabelInputContainer>
            )}

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              {carbonCredits ? "Submit for Deployment" : "Enter"}
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </form>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default ProjectRegistration;