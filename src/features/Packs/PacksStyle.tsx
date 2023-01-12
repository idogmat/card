import styled from "styled-components";
import { Button } from "../../common/ui-kit/Button/Button";
interface IMyPackButton {
  selected: boolean;
}
export const MyPackButton = styled(Button).attrs<Partial<IMyPackButton>>(
  ({ selected }) => ({
    bgColor: selected ? "red" : "blue",
  })
)``;
