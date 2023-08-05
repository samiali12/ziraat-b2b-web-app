import React from 'react';

const PaginationForm = ({ currentPage, totalPages, onNextPage, onPreviousPage }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        className="px-4 py-2 mr-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
        onClick={onPreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        className="px-4 py-2 ml-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationForm;
