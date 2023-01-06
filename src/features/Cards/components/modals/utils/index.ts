import { FieldFormatsEnum } from "../FormatSelect";
import { IFieldFormats } from "./../CardsModals";

export const openFileSelector = (ref: React.RefObject<HTMLInputElement>) => {
  ref.current?.click();
};
