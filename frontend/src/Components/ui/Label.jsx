"use client";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../utils/cn";

const Label = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        "text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...rest}
    />
  );
});

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
