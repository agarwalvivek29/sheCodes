"use client";

import { motion } from "framer-motion";
import React from "react";
import AuroraBackground from "./ui/Hero";
import { useNavigate } from "react-router-dom";

 export function HeroCard() {

  const navigate = useNavigate();

  return (
    
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4  bg-transparent"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center bg-transparent">
        Buy carbon credits
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4 bg-transparent text-center">
        Offset your carbon footprint with ECO, the first carbon offset token on Ethereum
        </div>
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2"
        onClick={()=>{
          navigate('/tokens');
        }}
        >
          Buy now
        </button>
      </motion.div>
    </AuroraBackground>
  );
}
export default HeroCard;