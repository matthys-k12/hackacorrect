import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

export default function Button({
  type,
  label,
  isReady,
  isDisable,
  onClick,
  isLoading,
}: {
  type: "submit" | "reset" | "button" | undefined;
  label: string;
  isReady: boolean;
  isDisable: boolean;
  isLoading: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisable}
      className={`${isReady ? "text-white" : "text-gray-500"} ${
        isReady ? "bg-[#F94C10]" : "bg-gray-200"
      } w-full text-white text-[12px] bg-[#F94C10] focus:ring-4 focus:outline-none focus:ring-[#F94C10]/40 font-bold px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-full`}
    >
      {!isLoading ? label : <PulseLoader size={7} color="#FFFFFF" loading={isLoading} />}
    </button>
  );
}
