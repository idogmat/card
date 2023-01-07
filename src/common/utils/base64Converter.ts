import { AppAC } from "./../../app/appReducer";
import { AppDispatchType } from "common/hooks/useAppDispatch";
import { ChangeEvent } from "react";

export const BACKEND_MAX_IMG_WEIGHT = 100000000;

export const _fileToBase = (file: File) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve) => {
    reader.onloadend = () => resolve(reader.result as string);
  });
};

export const _uploadHandler = async (
  dispatch: AppDispatchType,
  e: ChangeEvent<HTMLInputElement>,
  typeRE: RegExp,
  size: number,
  errorMessage: string
) => {
  if (e?.target?.files?.length) {
    const file = e.target.files[0];
    if (typeRE.test(file.type) && file.size < size) {
      const fileBase64 = (await _fileToBase(file)) as string;
      return fileBase64;
    }
  }
  dispatch(AppAC.setError);
};
