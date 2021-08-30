import React from "react";

export default function Pagination({
  projectsPerPage,
  totalProjects,
  paginateFront,
  paginateBack,
  currentPage,
}) {


  return (
    <div className='py-2'>
      <div>
        <p className='text-sm text-gray-700'>
            {`Showing `}
          <span className='font-medium'>{currentPage * projectsPerPage - 10}</span>
            {` to `}
          <span className='font-medium'> {currentPage * projectsPerPage} </span>
            {` of `}
          <span className='font-medium'> {totalProjects} </span>
            {` results `}
        </p>
      </div>
      <nav className='block'></nav>
      <div>
        <nav
          className='relative z-0 inline-flex -space-x-px rounded-md shadow-sm'
          aria-label='Pagination'
        >
          <button
            onClick={() => {
              paginateBack();
            }}
            href='#'
            className='relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50'
          >
            <span>Previous</span>
          </button>

          <button
            onClick={() => {
              paginateFront();
            }}
            href='#'
            className='relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50'
          >
            <span>Next</span>
          </button>
        </nav>
      </div>
    </div>
  );
}