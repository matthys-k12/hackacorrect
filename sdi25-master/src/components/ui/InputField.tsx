import React from "react";
import "preline/preline";

interface InputFieldProps {
  value: string | number;
  label: string;
  type: string;
  placeholder: string;
  length: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function InputField({
  type,
  value,
  onChange,
  placeholder,
  length,
  label,
}: InputFieldProps) {
  const decreaseValue = () => {
    if (parseInt(value.toString()) > 0) {
      onChange({
        target: { value: (parseInt(value.toString()) - 1).toString() },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const increaseValue = () => {
    onChange({
      target: { value: (parseInt(value.toString()) + 1).toString() },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div>
      {type === "number" ? (
        <div
          className="py-2 px-3 bg-gray-100 rounded-lg dark:bg-slate-700 max-w-lg"
          data-hs-input-number
        >
          <div className="flex justify-between items-center gap-x-5">
            <div className="grow">
              <input
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                size={length}
                className="max-w-lg p-0 bg-transparent border-0 text-gray-800 focus:ring-0 dark:text-white"
                type="text"
                required
              />
            </div>
            <div className="flex justify-end items-center gap-x-1.5">
              <button
                type="button"
                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={decreaseValue}
              >
                <svg
                  className="flex-shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                </svg>
              </button>
              <button
                type="button"
                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                onClick={increaseValue}
              >
                <svg
                  className="flex-shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : type === "text" || type === "email" || type === "password" ? (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          size={length}
          className="bg-gray-50 max-w-lg font-bold border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F94C10]/100 focus:border-[#F94C10]/100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      ) : type === "checkbox" ? (
        <div className="flex gap-2 max-w-lg">
          <label
            htmlFor="hs-checkbox-in-form"
            className="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
          >
            <input
              type="checkbox"
              className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
              id="hs-checkbox-in-form"
            />
            <span className="text-sm text-gray-500 ms-3 dark:text-gray-400">
              {label}
            </span>
          </label>
        </div>
      ) : null}
    </div>
  );
}
