"use client";
import React from "react";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { cn } from "../utils/cn";
import { Direction } from "./Direction";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

export function Signup() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

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
  return (<div className="flex ">
    <div className="m-5">
    <Direction />
    </div>
    <div>   
         <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-transparent dark:bg-black al">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to EcoTokens
      </h2>
      <p className="text-neutral-600 text-md font-bold max-w-sm mt-2 dark:text-neutral-300">
        Fill in the Details
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Tree Name</Label>
          <Input id="email" placeholder="Eg (Timber)" type="email" />
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
            <Label htmlFor="firstname">Latitude</Label>
            <Input id="firstname" placeholder="13.116519 / N 13° 6' 59.469''" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Longitude</Label>
            <Input id="lastname" placeholder="77.642146 / E 77° 38' 31.727''" type="text" />
          </LabelInputContainer>
        </div>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="number">Number of Trees</Label>
          <Input id="number" placeholder="5000" type="number"  min="0" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="number">Circumference (Average in cm)</Label>
          <Input id="number" placeholder="50" type="number"  min="0" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="number">Age (Average) </Label>
          <Input id="number" placeholder="70" type="number"  min="0"/>
        </LabelInputContainer>
        

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Enter 
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
