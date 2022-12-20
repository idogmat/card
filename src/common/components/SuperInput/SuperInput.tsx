import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
} from "react";

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperInputTextPropsType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
};

const SuperInputText: React.FC<SuperInputTextPropsType> = ({
  type,
  onChange,
  onChangeText,
  onKeyDown,
  onEnter,
  error,
  className,
  spanClassName,

  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onChangeText?.(e.currentTarget.value);
  };
  const onKeyDownCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (onEnter && e.key === "Enter") onEnter();
  };

  const finalSpanClassName = `'error' ${spanClassName ? spanClassName : ""}`;
  const finalInputClassName = `${error ? "error" : "default"} ${className}`;

  return (
    <>
      <input
        type={"text"}
        onChange={onChangeCallback}
        onKeyDown={onKeyDownCallback}
        className={finalInputClassName}
        {...restProps}
      />
      {error && <span className={finalSpanClassName}>{error}</span>}
    </>
  );
};

export default SuperInputText;
