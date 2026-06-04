import React from "react";

interface Progress {
  label?: string;
  value?: number;
  max?: number;
  className?: string;
  themeColor:string;
}

const ProgressBar = ({
  label = "Speed:",
  value = 70,
  max = 100,
  className = "",
  themeColor
}: Progress) => {
  return (
    <>
      <label htmlFor="file">{label}</label>

      <progress
        className={`
          ${className}
          w-full
          h-2
          rounded-full
          appearance-none
          
          [&::-webkit-progress-bar]:rounded-full
          [&::-webkit-progress-bar]:bg-${themeColor}-500
          
          [&::-webkit-progress-value]:rounded-full
          [&::-webkit-progress-value]:bg-gradient-to-r
          [&::-webkit-progress-value]:from-primary-pressed
          [&::-webkit-progress-value]:to-primary-light
          
          [&::-moz-progress-bar]:rounded-full
          [&::-moz-progress-bar]:bg-primary-pressed
        `}
        id="file"
        value={value}
        max={max}
      >
        32%
      </progress>
    </>
  );
};

export default ProgressBar;