import React from "react";

export default function Labelui({ label }: { label: string }) {
  return (
    <label className="block text-sm text-left font-medium text-gray-900 dark:text-white">
      {label}
    </label>
  );
}
