/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  "node_modules/flowbite-react/lib/esm/**/*.js",
  "node_modules/preline/dist/*.js",
];
export const theme = {
  extend: {},
};
export const plugins = [
  require("flowbite/plugin"),
  require("preline/plugin"),
];
