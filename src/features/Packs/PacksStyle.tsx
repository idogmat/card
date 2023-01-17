import styled from "styled-components";
import { StyledComponent } from "../../common/ui-kit/types";
import { Button } from "../../common/ui-kit/Button/Button";
import { TableBodyItem } from "../../common/ui-kit/Table/Table";
interface IMyPackButton {
  selected: boolean;
}
export const MyPackButton = styled(Button).attrs<
  StyledComponent<Partial<IMyPackButton>>
>(({ selected }) => ({
  bgColor: selected ? "var(--color-blue)" : "var(--color-primary)",
}))<StyledComponent<Partial<IMyPackButton>>>`
  &:hover {
    bgcolor: "var(--color-blue)";
  }
`;
export const Img = styled.img`
  object-fit: cover;
  border-radius: 5px;
  width: ${({ width }) => width || "60px"};
  height: ${({ height }) => height || "25px"};
`;

export const Output = styled.output`
  margin: auto 5px;
`;
export const TableBodyItemHiddenMaxChars = styled(TableBodyItem)`
  margin: 0;
  -webkit-box-orient: vertical;
  box-sizing: border-box;
  padding: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
