import React, { useState } from "react";
import { Range } from "react-range";
import { Flex } from "../../ui-kit/Flex/Flex";
import {
  RangeField,
  RangeLine,
  Thumb,
  ThumbDot,
  ThumbView,
} from "../../ui-kit/RangeSlider/RangeSlider";

interface ISuperRangeProps {
  onChangeSlider: (valueRange: number[]) => void;
  max: number | string;
  min: number | string;
  minCardsCount: number;
  maxCardsCount: number;
}

const RangeSlider: React.FC<ISuperRangeProps> = React.memo(
  ({ onChangeSlider, min, max, maxCardsCount, minCardsCount }) => {
    const [range, setRange] = useState<number[]>([Number(min), Number(max)]);
    const onChangeHandler = (values: number[]) => {
      setRange(values as number[]);
      onChangeSlider(values as number[]);
    };
    return (
      <Flex sx={{ minWidth: "45%", maxWidth: "100%" }}>
        <output style={{ margin: "auto 5px" }} id="output1">
          {minCardsCount.toFixed(0)}
        </output>
        {range[1] && (
          <Range
            step={1}
            values={range}
            onChange={(values) => onChangeHandler(values)}
            renderTrack={({ props, children }) => (
              <RangeField
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
              >
                {!!range[1] && (
                  <RangeLine
                    ref={props.ref}
                    range={[+min, +max]}
                    minCardsCount={minCardsCount}
                    maxCardsCount={maxCardsCount}
                  >
                    {children}
                  </RangeLine>
                )}
              </RangeField>
            )}
            renderThumb={({ index, props, isDragged }) => (
              <Thumb {...props}>
                <ThumbView>{range[index].toFixed(0)}</ThumbView>
                <ThumbDot isDragged={isDragged} />
              </Thumb>
            )}
          />
        )}
        <output style={{ margin: "auto 5px" }} id="output2">
          {maxCardsCount.toFixed(0)}
        </output>
      </Flex>
    );
  }
);

export default RangeSlider;
