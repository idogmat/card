import { FileLoader } from "common/components/FileLoader/FileLoader";
import { Button } from "common/ui-kit/Button/Button";
import { Flex } from "common/ui-kit/Flex/Flex";
import { Typography } from "common/ui-kit/Text/Typography";
import { Input } from "common/ui-kit/_Input/_Input";
import { CardsCoverPreview } from "features/Cards/CardsStyles";
import { ChangeEvent, FC, RefObject } from "react";
import {
  FieldFormatsEnum,
  FormatSelect,
  IFormatSelectOption,
} from "./FormatSelect";

export interface IAddCardFieldProps {
  selectTitle: string;
  options: IFormatSelectOption[];
  changeOption: (option: string) => void;
  fieldFormat: FieldFormatsEnum;
  fileInputRef: RefObject<HTMLInputElement>;
  openFileSelector: () => void;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  cover: string;
  textFieldValue: string;
  changeTextFieldValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SelectTypeField: FC<IAddCardFieldProps> = ({
  selectTitle,
  options,
  changeOption,
  fieldFormat,
  fileInputRef,
  openFileSelector,
  handleFileUpload,
  cover,
  textFieldValue,
  changeTextFieldValue,
}) => {
  const isPictureField = fieldFormat === FieldFormatsEnum.pictureFormat;
  return (
    <>
      <FormatSelect
        options={options}
        title={selectTitle}
        onChange={changeOption}
        value={fieldFormat}
      />
      <Flex fDirection="column" sx={{ gap: "0.3rem" }}>
        {isPictureField ? (
          <>
            <Flex justify="space-between" sx={{ gap: "0.6rem" }}>
              <Typography variant="sub-title-md" as="span">
                Question:
              </Typography>
              <FileLoader link={fileInputRef} onFileLoaded={handleFileUpload} />
              <Button onClick={openFileSelector}>Change cover</Button>
            </Flex>
            {cover && <CardsCoverPreview src={cover} alt="" />}
          </>
        ) : (
          <Input
            error={false}
            label="Enter the new question"
            value={textFieldValue}
            onChange={changeTextFieldValue}
          />
        )}
      </Flex>
    </>
  );
};
