import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface ChildProps {
  pages: number;
  page: number;
  isAdmin?: boolean;
  keyword: string;
}

const Paginate: React.FC<ChildProps> = ({
  pages,
  page,
  isAdmin = false,
  keyword = ''
}) => {
  if (pages <= 1) {
    return null; // Pas de pagination nécessaire s'il n'y a qu'une seule page
  }

  const getPageLink = (pageNumber: number) => {
    if (isAdmin) {
      return `/admin/productlist/${pageNumber}`;
    }

    if (keyword) {
      return `/search/${keyword}/page/${pageNumber}`;
    }

    return `/page/${pageNumber}`;
  };

  return (
    <Pagination>
      {[...Array(pages).keys()].map((pageNumber) => (
        <LinkContainer key={pageNumber + 1} to={getPageLink(pageNumber + 1)}>
          <Pagination.Item active={pageNumber + 1 === page}>
            {pageNumber + 1}
          </Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  );
};

export default Paginate;
