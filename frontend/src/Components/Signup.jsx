import React, { useRef } from "react";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { useState } from "react";
import { cn } from "../utils/cn";
import { Direction } from "./Direction";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

import { backendUrl } from "../App";
import { useDispatch } from "react-redux";
import { dataActions } from "../store/data-slice";

export function Signup() {

  const [file, setFile] = useState(null);
  const [fileLink, setFileLink] = useState(null);
  const [carbonCredits, setCarbonCredits] = useState(null);
  const [metaData, setMetaData] = useState(null);

  const dispatch = useDispatch();

  async function deployContract(){
    const bodyData = {
      
    }

    try{
      const response = await fetch(`${backendUrl}/contract/deploy`,{
        method : 'POST',
        body : JSON.stringify(bodyData)
      });
      const res = await response.json();
      dispatch(dataActions.appendContract(res.contract));
    }
    catch(e){
      console.log(e)
    }
  }

  async function sendMetaData(){
    const bodyData = {
      image : fileLink,
      desc : "",
      treeTypes : [],
      lattitude : "",
      longitude : "",
      numberTrees : 0,
      age : 0,
      circumference : 50
    }

    try{
      const response = await fetch(`${backendUrl}/contract/deploy`,{
        method : 'POST',
        body : JSON.stringify(bodyData)
      });
      const res = await response.json();
      dispatch(dataActions.appendContract(res.contract));
    }
    catch(e){
      console.log(e)
    }
  }

  function calculateCarbonCredits(){
    setCarbonCredits(15);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // if(carbonCredits){
    //   deployContract();
    // }
    // else{
    //   sendMetaData();
    // }
    console.log(e.target.values)
  };

  const inputRef = useRef();

  const getFileLink = async () => {
    if (file) {
      console.log(file);
      const formData = new FormData();
      formData.append('file',file);

      const response = await fetch(`${backendUrl}/cloudinary/upload`,{
        method : 'POST',
        body : formData
      })

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const res = await response.json();
      if(res?.url){
        setFileLink(res.url);
      }

      else{
        console.log('Something went wrong on the backend...')
      }
    }
    else{
      console.log('File not selected');
    }
  }

  const handleGetCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          document.getElementById("latitude").value = latitude;
          document.getElementById("longitude").value = longitude;
        },
        (error) => {
          console.error("Error getting coordinates: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  return (<div className="flex justify-center items-center ">
    <div className="m-5">
    <div className="h-[40rem] w-40rem min-w-[40rem] flex items-center justify-center overflow-hidden">
      { fileLink ? <img src={fileLink} alt="preview" className="object-cover h-full w-full" /> : <div className="h-full w-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center" onClick={()=>{
        inputRef.current.click();
      }}>
        <input type="file" hidden onChange={(e)=>{
          setFile(e.target.files[0]);
          getFileLink()
        }} 
        ref={inputRef}
        />
        📸
        </div>}
    </div>
    </div>
    <div>   
         <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-transparent dark:bg-black al">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        New Project Registration
      </h2>
      <form className="my-8" onSubmit={handleSubmit}>
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="projectName">Project Name</Label>
          <Input id="projectName" placeholder="Amazon reforestation initiative...." type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="projectSymbol">Project Symbol</Label>
          <Input id="projectSymbol" placeholder="AFI, OAS..." type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="treeTypes">Tree Types</Label>
          <Input id="treeTypes" placeholder="Enter all tree types comma seperated" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
        <div className='flex items-center'>
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
            <Input id="latitude" placeholder="13.116519 / N 13° 6' 59.469''" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="longitude">Longitude</Label>
            <Input id="longitude" placeholder="77.642146 / E 77° 38' 31.727''" type="text" />
          </LabelInputContainer>
        </div>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="numberTrees">Number of Trees</Label>
          <Input id="numberTrees" placeholder="5000" type="number"  min="0" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="cirecumference">Circumference (approx. in cm)</Label>
          <Input id="circumfrence" placeholder="50" type="number"  min="0" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="age">Age (avg.) </Label>
          <Input id="age" placeholder="70" type="number"  min="0"/>
        </LabelInputContainer>
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="number">Age (avg.) </Label>
          <Input id="number" placeholder="70" type="number"  min="0"/>
        </LabelInputContainer>

        { carbonCredits && <LabelInputContainer className="mb-4">
          <Label htmlFor="carbonCredits">Carbon Credits Initialised</Label>
          <Input id="carbonCredits" placeholder="70" type="number"  min="0" disabled value={carbonCredits}/>
        </LabelInputContainer> }

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          { carbonCredits ? "Submit for Deployment" : "Enter"} 
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          
          
        </div>
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
export default Signup;
