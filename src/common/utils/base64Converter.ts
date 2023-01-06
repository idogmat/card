import { AppAC } from "./../../app/appReducer";
import { AppDispatchType } from "common/hooks/useAppDispatch";
import { ChangeEvent } from "react";

export const BACKEND_MAX_IMG_WEIGHT = 100000000;

const fileToBase = (file: File, callBack: (value: string) => void) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    const string = reader.result as string;
    callBack(string);
  };
  reader.readAsDataURL(file);
};

export const uploadHandler = (
  e: ChangeEvent<HTMLInputElement>,
  callBack: (str: string) => void
) => {
  if (e.target?.files?.length) {
    const file = e.target.files[0];
    if (file.size < 100000000) {
      fileToBase(file, (str: string) => {
        callBack(str);
      });
    }
  }
};

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
