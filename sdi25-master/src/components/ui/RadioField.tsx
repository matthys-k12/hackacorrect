import React from "react";

export default function RadioField({
  type,
  value,
  onClick,
}: {
  type: string;
  value: boolean;
  onClick: React.MouseEventHandler<HTMLInputElement>;
}) {
  return (
    <input
      type={type}
      checked={value}
      onClick={onClick}
      name="bordered-radio"
      className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
  );
}
