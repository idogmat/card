import { Container } from "common/ui-kit/Container/Container";
import { Flex } from "common/ui-kit/Flex/Flex";
import { Paper } from "common/ui-kit/Paper/Paper";
import styled from "styled-components";

export const LearnRadioWrapper = styled(Flex).attrs({
  fDirection: "column",
})`
  gap: 0.3125rem;

  &:not(last-child) {
    margin-bottom: 1.25rem;
  }
`;

export const LearnContainer = styled(Container).attrs({
  variant: "sm",
})`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3.1rem 0px 0px 0px;
`;

export const LearnCardImg = styled.img`
  height: 12.5rem;
  border-radius: var(--radius);
  border: 1px solid var(--color-blue);
  object-fit: cover;
`;

export const LearnContent = styled(Flex).attrs({
  fDirection: "column",
  align: "center",
})``;

export const LearnCardWrapper = styled(Paper)`
  margin: 0.9375rem 0px;
  box-shadow: 0px 0px 8px 0px rgba(31, 40, 47, 0.2);
  padding: 2.3rem;
  min-width: 20rem;
  max-width: 37.5rem;
`;
