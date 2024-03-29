import { ChangeEvent, FC, useRef, useState } from "react";
import { ICardData, IFieldFormats } from "./CardsModals";
import { defaultFieldsFormats, formatSelectOptions } from "./CardsModals.data";
import { getImgBase64File } from "common/utils/base64Converter";
import { useAllSelector, useAppDispatch } from "common/hooks";

import { CardsModalsAC } from "features/Cards/cardsModalsSlice";
import { FieldFormatsEnum } from "./FormatSelect";
import { IAddCardRequest } from "../../cardsAPI";
import { ModalBase } from "common/components/Modal";
import { SelectTypeField } from "./SelectTypeField";
import { addCardModalSelector } from "./modalsSelectors";
import { addCardTC } from "../../cardsThunks";
import { openFileSelector } from "./utils";
import { Flex } from "common/ui-kit/Flex/Flex";
import { Button } from "common/ui-kit/Button/Button";

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

  const btnError =
    (!textCardData.question && !imgCardData.question) ||
    (!textCardData.answer && !imgCardData.answer);

  // Utils

  const isFieldPicture = (field: "question" | "answer") =>
    fieldsFormats[field] === FieldFormatsEnum.pictureFormat;

  const changeQuestionCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const question = await getImgBase64File(e, dispatch);
    if (question) setImgCardData({ ...imgCardData, question });
  };

  const changeAnswerCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const answer = await getImgBase64File(e, dispatch);
    if (answer) setImgCardData({ ...imgCardData, answer });
  };

  const changeQuestionFormat = (option: string) => {
    const questionFormat = option as FieldFormatsEnum;
    setFieldFormats({ ...fieldsFormats, question: questionFormat });
  };

  const changeAnswerFormat = (option: string) => {
    const answerFormat = option as FieldFormatsEnum;
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

    setTextCardData({} as ICardData);
    setImgCardData({} as ICardData);
    setFieldFormats(defaultFieldsFormats);
    handleClose();
  };

  return (
    <div>
      <ModalBase
        open={isOpen}
        handleClose={handleClose}
        modalTitle="Add new card"
      >
        <Flex sx={{ padding: "0.6rem" }}>
          <Flex fDirection="column" sx={{ gap: "0.43rem" }}>
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
            <Flex sx={{ marginTop: "1.25rem" }}>
              <Button
                disabled={!!btnError}
                sx={{ alignSelf: "start" }}
                onClick={addNewCardHandler}
              >
                Add new pack
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </ModalBase>
    </div>
  );
};
