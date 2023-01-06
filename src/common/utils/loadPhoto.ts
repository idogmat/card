import { ChangeEvent } from "react";

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
