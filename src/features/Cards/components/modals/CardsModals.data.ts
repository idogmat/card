import { FieldFormatsEnum, IFormatSelectOption } from "./FormatSelect";

import { IFieldFormats } from "./CardsModals";

export const formatSelectOptions: IFormatSelectOption[] = [
  { selectValue: FieldFormatsEnum.pictureFormat, UIValue: "Picture" },
  { selectValue: FieldFormatsEnum.textFormat, UIValue: "Text" },
];

export const defaultFieldsFormats: IFieldFormats = {
  question: FieldFormatsEnum.textFormat,
  answer: FieldFormatsEnum.textFormat,
};
