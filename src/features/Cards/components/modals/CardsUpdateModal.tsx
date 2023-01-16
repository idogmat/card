import { ChangeEvent, FC, useRef } from "react";
import { getImgBase64File } from "common/utils/base64Converter";
import { useAllSelector, useAppDispatch } from "common/hooks";

import { CardsModalsAC } from "features/Cards/cardsModalsSlice";
import { FieldFormatsEnum } from "./FormatSelect";
import { ModalBase } from "common/components/Modal";
import { SelectTypeField } from "./SelectTypeField";
import { formatSelectOptions } from "./CardsModals.data";
import { openFileSelector } from "./utils";
import { updateCardModalSelector } from "features/Cards/components/modals/modalsSelectors";
import { updateCardTC } from "features/Cards/cardsThunks";
import { Flex } from "common/ui-kit/Flex/Flex";
import { Button } from "common/ui-kit/Button/Button";

interface IUpdateCardModalProps {
  packID: string;
}

export const CardsUpdateModal: FC<IUpdateCardModalProps> = ({ packID }) => {
  const isFieldPicture = (field: string) => {
    return field === FieldFormatsEnum.pictureFormat;
  };

  // dispatch & selectors
  const dispatch = useAppDispatch();

  const updateModal = useAllSelector(updateCardModalSelector);

  const {
    isOpen,
    card,
    question,
    answer,
    questionImg,
    answerImg,
    questionFieldType,
    answerFieldType,
  } = updateModal;

  // Vars
  const isSameCard =
    card.question === question &&
    card.answer === answer &&
    card.answerImg === answerImg &&
    card.questionImg === questionImg;

  const textQuestion = question === "undefined" ? "" : question;
  const textAnswer = answer === "undefined" ? "" : answer;

  const questionFileInput = useRef<HTMLInputElement>(null);
  const answerFileInput = useRef<HTMLInputElement>(null);

  const isQuestionPicture = isFieldPicture(questionFieldType);
  const isAnswerPicture = isFieldPicture(answerFieldType);

  const btnError = (!question && !questionImg) || (!answer && answerImg);

  // Utils

  const handleClose = () =>
    dispatch(CardsModalsAC.setUpdateCardState({ state: false }));

  const setAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const answer = e.target.value;
    dispatch(
      CardsModalsAC.setUpdateCardData({ model: { ...updateModal, answer } })
    );
  };

  const setQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const question = e.target.value;
    dispatch(
      CardsModalsAC.setUpdateCardData({ model: { ...updateModal, question } })
    );
  };

  const changeQuestionFormat = (option: string) => {
    const questionFieldType = option as FieldFormatsEnum;
    dispatch(
      CardsModalsAC.setUpdateCardData({
        model: { ...updateModal, questionFieldType },
      })
    );
  };

  const changeAnswerFormat = (option: string) => {
    const answerFieldType = option as FieldFormatsEnum;
    dispatch(
      CardsModalsAC.setUpdateCardData({
        model: { ...updateModal, answerFieldType },
      })
    );
  };

  const changeQuestionCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const questionImg = await getImgBase64File(e, dispatch);
    if (questionImg) {
      dispatch(
        CardsModalsAC.setUpdateCardData({
          model: { ...updateModal, questionImg },
        })
      );
    }
  };

  const changeAnswerCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const answerImg = await getImgBase64File(e, dispatch);
    if (answerImg) {
      dispatch(
        CardsModalsAC.setUpdateCardData({
          model: { ...updateModal, answerImg },
        })
      );
    }
  };

  const updateCardHandler = () => {
    if (isSameCard) {
      handleClose();
      return;
    }

    const questionField = isQuestionPicture ? "questionImg" : "question";
    const answerField = isAnswerPicture ? "answerImg" : "answer";

    const questionNull = isQuestionPicture ? "question" : "questionImg";
    const answerNull = isAnswerPicture ? "answer" : "answerImg";

    const questionResult = isQuestionPicture ? questionImg : textQuestion;
    const answerResult = isAnswerPicture ? answerImg : textAnswer;

    const model = {
      card: {
        _id: card._id,
        [questionField]: questionResult,
        [answerField]: answerResult,
        [questionNull]: "undefined",
        [answerNull]: "undefined",
      },
    };
    dispatch(updateCardTC({ packID, model }));
    handleClose();
  };

  return (
    <div>
      <ModalBase handleClose={handleClose} modalTitle="Edit card" open={isOpen}>
        <Flex sx={{ padding: "0.6rem", minWidth: "22.5rem" }}>
          <Flex fDirection="column" sx={{ gap: "0.6rem", flex: "1 1 auto" }}>
            <SelectTypeField
              selectTitle={"Choose question format"}
              options={formatSelectOptions}
              changeOption={changeQuestionFormat}
              fieldFormat={questionFieldType}
              fileInputRef={questionFileInput}
              openFileSelector={() => openFileSelector(questionFileInput)}
              cover={questionImg}
              textFieldValue={textQuestion}
              changeTextFieldValue={setQuestion}
              handleFileUpload={changeQuestionCover}
            />
            <SelectTypeField
              selectTitle={"Choose answer format"}
              options={formatSelectOptions}
              changeOption={changeAnswerFormat}
              fieldFormat={answerFieldType}
              fileInputRef={answerFileInput}
              openFileSelector={() => openFileSelector(answerFileInput)}
              cover={answerImg}
              textFieldValue={textAnswer}
              changeTextFieldValue={setAnswer}
              handleFileUpload={changeAnswerCover}
            />
            <Flex>
              <Button
                disabled={!!btnError}
                sx={{ alignSelf: "start" }}
                onClick={updateCardHandler}
              >
                Confirm edit
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </ModalBase>
    </div>
  );
};
