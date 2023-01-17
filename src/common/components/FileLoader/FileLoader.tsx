import React, { ChangeEvent, FC } from "react";

interface IFileLoaderProps {
  link: React.RefObject<HTMLInputElement>;
  onFileLoaded: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FileLoader: FC<IFileLoaderProps> = ({ link, onFileLoaded }) => {
  return (
    <input
      type="file"
      accept="image/*"
      ref={link}
      onChange={onFileLoaded}
      style={{ display: "none" }}
    />
  );
};
