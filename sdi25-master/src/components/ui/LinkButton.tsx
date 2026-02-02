import { useNavigate } from "react-router-dom";
import React from "react";

export default function LinkButton({
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
      className="rounded-3xl bg-[#F94C10] px-8 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-[#F94C10]/80 duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F94C10]/100"
    >
      {label}
    </button>
  );
}
