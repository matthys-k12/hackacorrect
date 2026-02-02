import {
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import "../style/pagination.css";
import React from "react";


export function PaginatedItems({ itemsPerPage, item, tableHeader, Items }) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = item.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(item.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % item.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {tableHeader()}
        </thead>
        <tbody>
          <Items currentItems={currentItems} />
        </tbody>
      </table>
      <div className="mx-auto">
        <ReactPaginate
          breakLabel="..."
          onPageChange={handlePageClick}
          nextLabel={
            <button className="w-full h-full">
              <FontAwesomeIcon
                className="text-blue text-lg"
                icon={faArrowRight}
              />
            </button>
          }
          pageRangeDisplayed={5}
          previousLabel={
            <button className="w-full h-full">
              <FontAwesomeIcon
                className="text-blue text-lg"
                icon={faArrowLeft}
              />
            </button>
          }
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          activeClassName={"activePage"}
          containerClassName={"pagination"}
          disabledClassName={"disabled-page"}
          nextClassName={"item next "}
          pageClassName={"item pagination-page "}
          previousClassName={"item previous"}
        />
      </div>
    </div>
  );
}
