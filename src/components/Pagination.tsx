import React from 'react';

interface PaginationProps {
  videosPerPage: number;
  totalVideos: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ videosPerPage, totalVideos, paginate, currentPage }) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalVideos / videosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul style={{ display: 'flex', listStyleType: 'none', justifyContent: 'center', padding: 0 }}>
        {pageNumbers.map(number => (
          <li key={number} style={{ margin: '0 5px' }}>
            <button
              onClick={() => paginate(number)}
              style={{
                backgroundColor: currentPage === number ? '#FCA311' : '#FFFFFF',
                color: currentPage === number ? '#FFFFFF' : '#000000',
                border: '1px solid #FCA311',
                padding: '8px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
  
  
  
};

export default Pagination;
