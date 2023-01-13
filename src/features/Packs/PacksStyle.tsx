import styled from "styled-components";
import { StyledComponent } from "../../common/ui-kit/types";
import { Button } from "../../common/ui-kit/Button/Button";
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
