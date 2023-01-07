import {
  Button,
  FormControl,
  FormGroup,
  SelectChangeEvent,
} from "@mui/material";
import { ChangeEvent, FC, useRef, useState } from "react";
import { ICardData, IFieldFormats } from "./CardsModals";
import { defaultFieldsFormats, formatSelectOptions } from "./CardsModals.data";
import { useAllSelector, useAppDispatch } from "common/hooks";

import { BACKEND_MAX_IMG_WEIGHT } from "./../../../../common/utils/base64Converter";
import { Box } from "@mui/system";
import { CardsModalsAC } from "features/Cards/cardsModalsSlice";
import { FieldFormatsEnum } from "./FormatSelect";
import { IAddCardRequest } from "../../cardsAPI";
import { ModalBase } from "common/components/Modal";
import { SelectTypeField } from "./SelectTypeField";
import { _uploadHandler } from "common/utils/base64Converter";
import { acceptableImgFormats } from "common/utils/regExp";
import { addCardModalSelector } from "./modalsSelectors";
import { addCardTC } from "../../cardsThunks";
import { openFileSelector } from "./utils";

interface ICardsAddModalProps {
  packID: string;
}

export const CardsAddModal: FC<ICardsAddModalProps> = ({ packID }) => {
  // Selectors & dispatch
  const dispatch = useAppDispatch();
  const { isOpen } = useAllSelector(addCardModalSelector);

  // Vars
  const answerFileInput = useRef<HTMLInputElement>(null);
  const questionFileInput = useRef<HTMLInputElement>(null);

  // Local States
  const [textCardData, setTextCardData] = useState<ICardData>({} as ICardData);
  const [imgCardData, setImgCardData] = useState<ICardData>({} as ICardData);
  const [fieldsFormats, setFieldFormats] =
    useState<IFieldFormats>(defaultFieldsFormats);

  // Utils

  const isFieldPicture = (field: "question" | "answer") =>
    fieldsFormats[field] === FieldFormatsEnum.pictureFormat;

  const getBase64File = async (e: ChangeEvent<HTMLInputElement>) => {
    return await _uploadHandler(
      dispatch,
      e,
      acceptableImgFormats,
      BACKEND_MAX_IMG_WEIGHT,
      "Unacceptable file"
    );
  };

  const changeQuestionCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const question = await getBase64File(e);
    if (question) setImgCardData({ ...imgCardData, question });
  };

  const changeAnswerCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const answer = await getBase64File(e);
    if (answer) setImgCardData({ ...imgCardData, answer });
  };

  const changeQuestionFormat = (e: SelectChangeEvent) => {
    const questionFormat = e.target.value as FieldFormatsEnum;
    setFieldFormats({ ...fieldsFormats, question: questionFormat });
  };

  const changeAnswerFormat = (e: SelectChangeEvent) => {
    const answerFormat = e.target.value as FieldFormatsEnum;
    setFieldFormats({ ...fieldsFormats, answer: answerFormat });
  };

  const setTextCardDataQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextCardData({ ...textCardData, question: e.currentTarget.value });
  };

  const setTextCardDataAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextCardData({ ...textCardData, answer: e.currentTarget.value });
  };

  const handleClose = () => {
    dispatch(CardsModalsAC.setAddCardState({ state: false }));
    setTextCardData({} as ICardData);
    setImgCardData({} as ICardData);
    setFieldFormats(defaultFieldsFormats);
  };

  const addNewCardHandler = () => {
    const questionField = isFieldPicture("question")
      ? "questionImg"
      : "question";
    const answerField = isFieldPicture("answer") ? "answerImg" : "answer";

    const answer = isFieldPicture("answer")
      ? imgCardData.answer
      : textCardData.answer;

    const question = isFieldPicture("question")
      ? imgCardData.question
      : textCardData.question;

    const cardData: IAddCardRequest = {
      card: {
        cardsPack_id: packID,
        [questionField]: question,
        [answerField]: answer,
      },
    };
    dispatch(addCardTC(cardData));
    handleClose();
  };

  return (
    <div>
      <ModalBase
        open={isOpen}
        handleClose={handleClose}
        modalTitle="Add new card"
      >
        <Box sx={{ padding: 2 }}>
          <FormGroup sx={{ display: "grid", gap: 1 }}>
            <SelectTypeField
              selectTitle={"Choose question format"}
              options={formatSelectOptions}
              changeOption={changeQuestionFormat}
              fieldFormat={fieldsFormats.question}
              fileInputRef={questionFileInput}
              openFileSelector={() => openFileSelector(questionFileInput)}
              handleFileUpload={changeQuestionCover}
              cover={imgCardData.question}
              textFieldValue={textCardData.question}
              changeTextFieldValue={setTextCardDataQuestion}
            />
            <SelectTypeField
              selectTitle={"Choose answer format"}
              options={formatSelectOptions}
              changeOption={changeAnswerFormat}
              fileInputRef={answerFileInput}
              fieldFormat={fieldsFormats.answer}
              openFileSelector={() => openFileSelector(answerFileInput)}
              handleFileUpload={changeAnswerCover}
              cover={imgCardData.answer}
              textFieldValue={textCardData.answer}
              changeTextFieldValue={setTextCardDataAnswer}
            />
            <FormControl>
              <Button
                variant="contained"
                sx={{ alignSelf: "start" }}
                onClick={addNewCardHandler}
              >
                Add new pack
              </Button>
            </FormControl>
          </FormGroup>
        </Box>
      </ModalBase>
    </div>
  );
};
