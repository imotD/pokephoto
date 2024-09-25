import Button from "../atoms/Button";

import PropTypes from "prop-types";

export default function Pagination({
  totalItems,
  currentPage,
  itemPerPage,
  prev,
  next,
  handlePrevPage,
  handleNextPage,
}) {
  return (
    <div className="flex flex-col items-center mt-5">
      <span className="text-sm text-gray-700">
        Showing{" "}
        <span className="font-semibold text-gray-900 ">{currentPage}</span> to{" "}
        <span className="font-semibold text-gray-900 ">{itemPerPage}</span> of{" "}
        <span className="font-semibold text-gray-900 ">{totalItems}</span>{" "}
        Entries
      </span>

      <div className="inline-flex mt-2 xs:mt-0  gap-x-3">
        <Button
          onClick={prev ? handlePrevPage : null}
          className={`${prev ? "" : "bg-yellow-100 cursor-not-allowed"}`}
        >
          Prev
        </Button>
        <Button
          onClick={next ? handleNextPage : null}
          className={`${next ? "" : "bg-yellow-100 cursor-not-allowed"}`}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  totalItems: PropTypes.number,
  currentPage: PropTypes.number,
  itemPerPage: PropTypes.number,
  next: PropTypes.bool,
  prev: PropTypes.bool,
};

Pagination.defaultProps = {
  totalItems: 20,
  currentPage: 1,
  itemPerPage: 20,
  next: false,
  prev: false,
};
