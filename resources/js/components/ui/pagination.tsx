import * as React from "react";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;


  // Show only 3 page numbers, centered around the current page when possible
  let start = Math.max(1, page - 1);
  let end = Math.min(pageCount, start + 2);
  if (end - start < 2) {
    start = Math.max(1, end - 2);
  }
  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex justify-center mt-6" aria-label="Pagination">
      <ul className="inline-flex -space-x-px">
        <li>
          <button
            className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            aria-label="Previous"
          >
            &lt;
          </button>
        </li>
        {pages.map((p) => (
          <li key={p}>
            <button
              className={`px-3 py-2 leading-tight border border-gray-300  ${
                p === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
              onClick={() => onPageChange(p)}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          </li>
        ))}
        <li>
          <button
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
            onClick={() => onPageChange(page + 1)}
            disabled={page === pageCount}
            aria-label="Next"
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
}
