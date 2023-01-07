import {
  BACKEND_MAX_IMG_WEIGHT,
  _uploadHandler,
} from "common/utils/base64Converter";

import { AppDispatchType } from "common/hooks/useAppDispatch";
import { ChangeEvent } from "react";
import { acceptableImgFormats } from "common/utils/regExp";

export const openFileSelector = (ref: React.RefObject<HTMLInputElement>) => {
  ref.current?.click();
};

export const getImgBase64File = async (
  e: ChangeEvent<HTMLInputElement>,
  dispatch: AppDispatchType
) => {
  return await _uploadHandler(
    dispatch,
    e,
    acceptableImgFormats,
    BACKEND_MAX_IMG_WEIGHT,
    "Unacceptable file"
  );
};
