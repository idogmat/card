import styled, { keyframes } from "styled-components";

import { AiOutlineLoading } from "react-icons/ai";

const CircularAnimating = keyframes`
	0% {
		transform: translate(-50%, -50%) rotate(0);
	}
	12.5% {
		transform: translate(-50%, -50%) rotate(-90deg);
	}
	25% {
		transform: translate(-50%, -50%) rotate(-180deg);
	}
	37.5% {
		transform: translate(-50%, -50%) rotate(-270deg);
	}
	50% {
		transform: translate(-50%, -50%) rotate(-360deg);
	}

	62.5% {
		transform:  translate(-50%, -50%) rotate(-450deg);
	}
	75% {
		transform: translate(-50%, -50%) rotate(-540deg);
		
	}
	87.5% {
		transform: translate(-50%, -50%) rotate(-630deg);
	}

	100% {
		transform: translate(-50%, -50%) rotate(-720deg);
	}


`;

export const CircularProgress = styled(AiOutlineLoading)`
  position: absolute;
  width: 2.2rem;
  height: 2.2rem;
  left: 50%;
  top: 50%;
  color: var(--color-primary);
  animation: ${CircularAnimating} 1s infinite linear;
`;
