import { StyledComponent } from "../types";
import styled from "styled-components";

interface IPaperProps {
  asset: string;
  bRadius: string;
}

export const Paper = styled.div<StyledComponent<Partial<IPaperProps>>>`
  background: var(--color-primary);
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  padding: ${({ asset }) => asset || "0.95rem"};
  border-radius: ${({ bRadius }) => bRadius || "var(--radius)"};
`;
