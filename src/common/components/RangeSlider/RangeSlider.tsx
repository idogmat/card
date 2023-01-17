import React from "react";
import { Range } from "react-range";
import { Flex } from "../../ui-kit/Flex/Flex";
import {
  RangeField,
  RangeLine,
  Thumb,
  ThumbDot,
  ThumbView,
} from "../../ui-kit/RangeSlider/RangeSlider";
import { Output } from "../../../features/Packs/PacksStyle";

interface ISuperRangeProps {
  onChangeSlider: (valueRange: number[]) => void;
  max: number | string;
  min: number | string;
  minCardsCount: number;
  maxCardsCount: number;
}

const RangeSlider: React.FC<ISuperRangeProps> = React.memo(
  ({ onChangeSlider, min, max, minCardsCount, maxCardsCount }) => {
    const minValue = min < minCardsCount ? minCardsCount : min;
    const maxValue = max > maxCardsCount ? maxCardsCount : max;
    const values = [+minValue, +maxValue];

    const onChangeHandler = (values: number[]) => {
      onChangeSlider(values as number[]);
    };

    return (
      <Flex sx={{ minWidth: "40%", maxWidth: "45%" }}>
        <Output id="output1">{minCardsCount.toFixed(0)}</Output>
        {values.length && (
          <Range
            step={1}
            min={minCardsCount}
            max={maxCardsCount}
            values={values}
            onChange={(values) => onChangeHandler(values)}
            renderTrack={({ props, children }) => (
              <RangeField
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
              >
                <RangeLine
                  ref={props.ref}
                  range={[+min, +max]}
                  min={minCardsCount}
                  max={maxCardsCount}
                >
                  {children}
                </RangeLine>
              </RangeField>
            )}
            renderThumb={({ index, props, isDragged }) => (
              <Thumb {...props}>
                <ThumbView>{values[index].toFixed(0)}</ThumbView>
                <ThumbDot isDragged={isDragged} />
              </Thumb>
            )}
          />
        )}
        <Output id="output2">{maxCardsCount.toFixed(0)}</Output>
      </Flex>
    );
  }
);

export default RangeSlider;
