import React from "react";

interface Props {
  fill?: string;
  extraClass?: string;
}

export const CheckIcon: React.FC<Props> = ({ fill = "currentColor", extraClass = "" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 13l4 4L19 7"
        stroke="green"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={fill}
      />
    </svg>
  );
};
