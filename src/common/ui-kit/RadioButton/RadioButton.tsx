import { StyledComponent } from "../types";
import { Typography } from "../Text/Typography";
import styled from "styled-components";

interface IRadioButtonCircle {
  selected: boolean;
}

const RadioButtonWrapper = styled.div<StyledComponent<{}>>`
  cursor: pointer;
  display: flex;
  gap: 0.3125rem;
  align-items: center;

  ${(p) => ({ ...p.sx })}
`;

const RadioButtonCircle = styled.div<IRadioButtonCircle>`
  position: relative;

  width: 1.25rem;
  height: 1.25rem;

  border: 2px solid var(--color-blue);
  border-radius: 50%;

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: ${({ selected }) => (selected ? 1 : 0)};
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background: var(--color-blue);

    transition: opacity 0.3s ease 0s;
  }
`;

type IRadioButton = IRadioButtonCircle &
  StyledComponent<{}> & {
    value: string;
    onClick: (value: string) => void;
  };

export const RadioButton: React.FC<IRadioButton> = ({
  value,
  selected,
  onClick,
  sx,
}) => {
  const clickHandler = () => {
    onClick(value);
  };
  return (
    <RadioButtonWrapper sx={sx} onClick={clickHandler}>
      <RadioButtonCircle selected={selected} />
      <Typography>{value}</Typography>
    </RadioButtonWrapper>
  );
};
