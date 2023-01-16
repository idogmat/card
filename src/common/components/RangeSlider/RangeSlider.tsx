import React, { useEffect, useState } from "react";
import { Range } from "react-range";
import { Flex } from "../../ui-kit/Flex/Flex";
import {
  RangeField,
  RangeLine,
  Thumb,
  ThumbDot,
  ThumbView,
} from "../../ui-kit/RangeSlider/RangeSlider";
import { useAllSelector, useAppDispatch } from "../../hooks";
import {
  packsMaxCardsPacksSelector,
  packsMinCardsPacksSelector,
} from "../../../features/Packs/selectors";
import { packsAC } from "../../../features/Packs/packsReducer";

interface ISuperRangeProps {
  onChangeSlider: (valueRange: number[]) => void;
  max: number | string;
  min: number | string;
  minCardsCount: number;
  maxCardsCount: number;
}

const RangeSlider: React.FC<ISuperRangeProps> = React.memo(
  ({ onChangeSlider, min, max, minCardsCount, maxCardsCount }) => {
    const dispatch = useAppDispatch();
    const [range, setRange] = useState<number[]>([Number(min), Number(max)]);

    const onChangeHandler = (values: number[]) => {
      setRange(values as number[]);
      onChangeSlider(values as number[]);
    };
    useEffect(() => {
      if (max > maxCardsCount) {
        dispatch(
          packsAC.setRangeValue({
            range: [Number(minCardsCount), Number(maxCardsCount)],
          })
        );
      } else {
        setRange([Number(min), Number(max)]);
      }
    }, [min, max, minCardsCount, maxCardsCount]);

    return (
      <Flex sx={{ minWidth: "45%", maxWidth: "100%" }}>
        <output style={{ margin: "auto 5px" }} id="output1">
          {minCardsCount.toFixed(0)}
        </output>
        {!!range[1] && (
          <Range
            step={1}
            min={minCardsCount}
            max={maxCardsCount}
            values={range}
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
