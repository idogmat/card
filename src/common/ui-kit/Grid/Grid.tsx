import { StyledComponent } from "../types";
import styled from "styled-components";

interface IGridProps {
  cols: string;
  rows: string;
}

export const Grid = styled.div<StyledComponent<IGridProps>>`
  display: grid;
  grid-template-columns: ${({ cols }) => cols};
  grid-template-rows: ${({ cols }) => cols};
  ${(p) => ({ ...p.sx })}
`;
