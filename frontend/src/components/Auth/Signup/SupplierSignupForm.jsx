import React, { useState } from 'react';
import PaginationForm from './PaginationForm';

const SupplierSignupForm = () => {

    // Sample data for demonstration
    const totalItems = 50;
    const itemsPerPage = 10;

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const [currentPage, setCurrentPage] = useState(1);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };


    return (
        <div className="container mx-auto mt-8 px-4">
            {/* Content to display on the current page */}
            <div className="mb-4">
                {`Showing items ${((currentPage - 1) * itemsPerPage) + 1} to ${Math.min(
                    currentPage * itemsPerPage,
                    totalItems
                )} of ${totalItems}`}
            </div>

            {/* Render your content here (e.g., list of items) */}

            {/* Pagination form */}
            <PaginationForm
                currentPage={currentPage}
                totalPages={totalPages}
                onNextPage={handleNextPage}
                onPreviousPage={handlePreviousPage}
            />
        </div>
    );
}


export default SupplierSignupForm;