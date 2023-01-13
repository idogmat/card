import { StyledComponent } from "../types";
import styled from "styled-components";

interface IFlexProps {
  align: string;
  justify: string;
  fDirection: string;
  fWrap: string;
}

export const Flex = styled.div<StyledComponent<Partial<IFlexProps>>>`
  display: flex;
  justify-content: ${({ justify }) => justify || "stretch"};
  align-items: ${({ align }) => align || "stretch"};
  flex-direction: ${({ fDirection }) => fDirection || "row"};
  flex-wrap: ${({ fWrap }) => fWrap || "nowrap"};
  ${(p) => ({ ...p.sx })};
`;
