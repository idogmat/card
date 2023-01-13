import { ISelectProps, Select } from "../Select/Select";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { Button } from "../Button/Button";
import { FC } from "react";
import { Typography } from "../Text/Typography";
import styled from "styled-components";

interface IPaginationItemProps {
  selected: boolean;
}

const PaginationSelect = styled(Select)`
  padding: 0.3125rem;
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3125rem;
  flex-wrap: wrap;
`;

const PaginationArrowButton = styled(Button).attrs({
  semantic: true,
})`
  height: 1.5625rem;
  width: 1.5625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #00000077;
  border-radius: var(--radius);
`;

const PaginationList = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.3125rem;
`;

const PaginationItem = styled.li<IPaginationItemProps>`
  height: 1.5625rem;
  width: 1.5625rem;

  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #00000077;

  border-radius: var(--radius);
  background: ${({ selected }) =>
    selected ? "var(--color-blue)" : "transparent"};
`;

const PaginationNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.3125rem;
`;

const PaginationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3125rem;
`;

interface IPaginationProps {
  selectProps: ISelectProps;
  label: string;
  changePage: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

export const Pagination: FC<IPaginationProps> = ({
  selectProps,
  label,
  changePage,
  currentPage,
  totalPages,
}) => {
  // Pages
  const pages = Array(totalPages)
    .fill(0)
    .map((_, i) => i + 1);
  const selected = currentPage;
  const pagesBeforeSelected = selected - 3 >= 0 ? selected - 3 : 0;
  console.log(pagesBeforeSelected);

  const pagesToRender = [
    ...pages.slice(pagesBeforeSelected, selected),
    ...pages.slice(selected, selected + 2),
  ];

  // Utils
  const nextPageHandler = () => changePage(currentPage + 1);
  const prevPageHandler = () => changePage(currentPage - 1);

  return (
    <PaginationWrapper>
      <PaginationNav>
        <PaginationArrowButton
          disabled={currentPage === 1}
          onClick={prevPageHandler}
        >
          <MdKeyboardArrowLeft />
        </PaginationArrowButton>
        <PaginationList>
          {pagesToRender.map((page) => {
            const changePageHandler = () => {
              changePage(page);
            };
            return (
              <PaginationItem
                onClick={changePageHandler}
                selected={page === currentPage}
              >
                {page}
              </PaginationItem>
            );
          })}
        </PaginationList>
        <PaginationArrowButton
          disabled={currentPage === pages.at(-1)}
          onClick={nextPageHandler}
        >
          <MdKeyboardArrowRight />
        </PaginationArrowButton>
      </PaginationNav>

      <PaginationInfo>
        <Typography variant="sub-title-sm">Show</Typography>
        <PaginationSelect {...selectProps} />
        <Typography variant="sub-title-sm">{label} per page</Typography>
      </PaginationInfo>
    </PaginationWrapper>
  );
};
