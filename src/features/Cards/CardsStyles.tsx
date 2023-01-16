import styled, { keyframes } from "styled-components";

import { Button } from "common/ui-kit/Button/Button";
import { Flex } from "common/ui-kit/Flex/Flex";
import { MdPhoneIphone } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { TableWrapper } from "common/ui-kit/Table/Table";
import { Typography } from "common/ui-kit/Text/Typography";
import { StyledComponent } from "../../common/ui-kit/types";

const swipeRight = keyframes`
	0% {
		transform: translate(0, 0)
	}

	5% {
		transform: translate(100%,0)
	}

	10% {
		transform: translate(0, 0)
	}

`;

export const CardsIconButton = styled(Button).attrs({
  sematic: true,
})`
  display: flex;
  align-items: center;
`;

export const CardsHeaderWrapper = styled(Flex).attrs({
  justify: "space-between",
  align: "center",
  fWrap: "wrap",
})`
  gap: 0.9375rem;

  &:not(last-child) {
    margin-bottom: 1.5625rem;
  }
`;

export const CardTitle = styled(Typography).attrs({
  variant: "title",
  as: "h3",
})`
  display: flex;
  align-items: center;
  font-size: 1.875rem;
  position: relative;
  gap: 0.3125rem;
`;

export const CardBanner = styled.img`
  width: 300px;
  height: 100px;
  object-fit: cover;
`;

export const CardsTableWrapper = styled(TableWrapper)`
  overflow: auto;
`;

export const CardsSwipeIcon = styled(MdPhoneIphone)`
  display: none;
  font-size: 1.8rem;
  transition: transform 0.3s ease 0s;
  animation: ${swipeRight} 5s infinite linear;

  &:not(last-child) {
    margin-bottom: 0.625rem;
  }

  @media (max-width: 62.375rem) {
    display: block;
  }
`;

export const CardsDropdownButton = styled(Button).attrs({
  semantic: true,
})`
  display: flex;
  font-size: var(--fs-big);
  align-items: center;
  gap: 0.3125rem;
`;

export const CardsDropdownNavLink = styled(NavLink)`
  display: flex;
  font-size: var(--fs-big);
  align-items: center;
  gap: 0.3125rem;
`;

export const CardsHeaderInfo = styled(Flex).attrs({
  align: "center",
})`
  position: relative;
  gap: 0.3125rem;
`;

export const CardsTableImg = styled.img`
  width: 6.25rem;
  height: 5rem;
  object-fit: cover;
  border-radius: var(--radius);
  border: 1px solid var(--color-blue);
`;

export const CardsCoverPreview = styled.img<StyledComponent<{}>>`
  width: 100%;
  height: 9.2rem;
  object-fit: cover;
  border-radius: var(--radius);
  border: 1px solid var(--color-blue);

  ${({ sx }) => ({ ...sx })}
`;
