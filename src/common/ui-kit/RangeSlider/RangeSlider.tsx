import React from "react";
import styled from "styled-components";
import { StyledComponent } from "../types";
import { getTrackBackground } from "react-range";
interface IRangeLineBG {
  range: number[];
  min: number;
  max: number;
}
interface IThumbDragged {
  isDragged: boolean;
}
export const RangeField = styled.div<StyledComponent<Partial<IRangeLineBG>>>`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  height: 36px;
  padding: 0 0.5rem;
  width: 100%;
  margin: auto 0;
  ${(p) => ({ ...p.style })};
`;
export const RangeLine = styled.div<StyledComponent<Partial<IRangeLineBG>>>`
  height: 5px;
  width: 100%;
  border-radius: 4px;
  background: ${(p) =>
    getTrackBackground({
      values: !!p.range ? p.range : [0, 53],
      colors: ["#8f8e8e", "var(--color-blue)", "#8F8E8EFF"],
      min: !!p.min ? p.min : 0,
      max: !!p.max ? p.max : 53,
    })};
  align-self: center;
  ${(p) => ({ ...p.style })};
`;
export const Thumb = styled.div<StyledComponent<Partial<IRangeLineBG>>>`
  height: 16px;
  width: 16px;
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 6px #aaa;
  &:focus div {
    outline: #aaaaaaff;
  }
  ${(p) => ({ ...p.style })};
`;
export const ThumbView = styled.div<StyledComponent<Partial<IRangeLineBG>>>`
  position: absolute;
  top: -28px;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
  padding: 4px;
  border-radius: 4px;
  background-color: var(--color-blue);
  ${(p) => ({ ...p.style })};
`;
export const ThumbDot = styled.div<StyledComponent<Partial<IThumbDragged>>>`
  height: 5px;
  width: 5px;
  border-radius: 3px;
  background-color: ${(p) => (p.isDragged ? "var(--color-blue)" : "#CCC")};
`;
