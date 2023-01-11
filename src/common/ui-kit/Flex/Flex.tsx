import { StyledComponent } from "../types";
import styled from "styled-components";

interface IFlexProps {
  align: string;
  justify: string;
  direction: string;
}

export const Flex = styled.div<StyledComponent<Partial<IFlexProps>>>`
  display: flex;
  justify-content: ${({ justify }) => justify || "stretch"};
  align-items: ${({ align }) => align || "stretch"};
  flex-direction: ${({ direction }) => direction || "row"};
  ${(p) => ({ ...p.sx })};
`;
