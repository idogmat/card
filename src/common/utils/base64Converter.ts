import { AppAC } from "../../app/appSlice";
import { AppDispatchType } from "common/hooks/useAppDispatch";
import { ChangeEvent } from "react";
import { acceptableImgFormats } from "./regExp";

export const BACKEND_MAX_IMG_WEIGHT = 100000000;

export const fileToBase = (file: File) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve) => {
    reader.onloadend = () => resolve(reader.result as string);
  });
};

export const uploadHandler = async (
  dispatch: AppDispatchType,
  e: ChangeEvent<HTMLInputElement>,
  typeRE: RegExp,
  size: number,
  errorMessage: string
) => {
  if (e?.target?.files?.length) {
    const file = e.target.files[0];
    if (typeRE.test(file.type) && file.size < size) {
      const fileBase64 = (await fileToBase(file)) as string;
      return fileBase64;
    }
  }
  dispatch(AppAC.setError);
};

export const getImgBase64File = async (
  e: ChangeEvent<HTMLInputElement>,
  dispatch: AppDispatchType
) => {
  return await uploadHandler(
    dispatch,
    e,
    acceptableImgFormats,
    BACKEND_MAX_IMG_WEIGHT,
    "Unacceptable file"
  );
};
