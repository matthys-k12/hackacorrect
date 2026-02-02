import React from "react";

export default function CompanyTemplate({
  url,
  name,
}: {
  url: any;
  name: string;
  description: string;
}) {
  return (
    <div className="max-w-[330px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg h-[250px] w-[300px] object-cover"
        src={url}
        alt=""
      />
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </a>
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          voir plus
        </a>
      </div>
    </div>
  );
}
