import { useNavigate } from "react-router-dom";
import React from "react";

export default function CancelButton({
  type,
  label,
  route,
}: {
  type: "submit" | "reset" | "button" | undefined;
  label: string;
  route: string;
}) {
  const navigate = useNavigate();
  const goTo = () => {
    navigate(route);
  };

  return (
    <button
      type={type}
      onClick={() => goTo()}
      className="text-gray-600 bg-gray-200 text-black focus:ring-4 focus:outline-none focus:ring-gray-200/40 font-bold rounded-3xl text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {label}
    </button>
  );
}
