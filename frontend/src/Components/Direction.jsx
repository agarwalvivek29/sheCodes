import React from "react";
import DirectionAwareHover from "./ui/DirectionAwareHover";

export function Direction() {
  const imageUrl =
    "https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  return (
    <div className="h-[40rem] relative flex items-center justify-center">
      <DirectionAwareHover imageUrl={imageUrl}>
      
      </DirectionAwareHover>
    </div>
  );
}

export default Direction;
