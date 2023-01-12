import { StyledComponent } from "../types";
import styled from "styled-components";

// Types
interface IStyledTableProps {
  cols: string;
  rows?: string;
}

interface ITableHeaderProps extends IStyledTableProps {}

interface ITableBodyProps extends IStyledTableProps {}

// Main
export const TableWrapper = styled.div`
  display: grid;
  gap: 0.625rem;
`;

// Header
export const TableHeader = styled.div<StyledComponent<ITableHeaderProps>>`
  display: grid;
  align-items: center;
  grid-template-columns: ${({ cols }) => cols};
  background: #bfd2ff;
  padding: 0.9375rem;
  border-radius: 0.75rem;
`;

export const TableHeaderItem = styled.div``;

// Body
export const TableBody = styled.div`
  display: grid;
  gap: 0.625rem;
`;

export const TableBodyLine = styled.div<StyledComponent<ITableBodyProps>>`
  display: grid;
  grid-template-columns: ${({ cols }) => cols};
  align-items: center;
  padding: 0.9375rem;
  border: 1px solid #00000031;
  border-radius: 0.625rem;
`;

export const TableBodyItem = styled.div``;
