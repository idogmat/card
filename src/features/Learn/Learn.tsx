import React, { useEffect, useState } from "react";
import { getCardsTC, updateCardGradeTC } from "./../Cards/cardsThunks";
import { useAllSelector, useAppDispatch } from "common/hooks";
import { useLocation, useParams } from "react-router-dom";

import { BackTo } from "common/components/BackTo/BackTo";
import { Button } from "common/ui-kit/Button/Button";
import { Flex } from "common/ui-kit/Flex/Flex";
import { ICard } from "common/models";
import { IPackResponse } from "./../Packs/packsAPI";
import { LearnContainer } from "./LearnStyles";
import { LearnRate } from "./LearnRate";
import { Paper } from "common/ui-kit/Paper/Paper";
import { Preloader } from "common/components/Preloader/Preloader";
import { Typography } from "common/ui-kit/Text/Typography";
import { appStateSelector } from "app/selectors";
import { cardsCardsSelector } from "features/Cards/selectors";
import { getItemFromLC } from "common/utils/localStorage";
import { grades } from "./Learn.data";

export const Learn = () => {
  // dispatch & selectors
  const dispatch = useAppDispatch();
  const cards = useAllSelector(cardsCardsSelector);
  const { isLoading } = useAllSelector(appStateSelector);
  const card = cards.reduce<ICard>((finalCard, currentCard) => {
    finalCard = currentCard.grade < finalCard.grade ? currentCard : finalCard;
    return finalCard;
  }, cards[0]);

  // Query
  const { packID } = useParams();

  // Local states
  const [showGrades, setShowGrades] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState("");

  // Vars
  const { state } = useLocation();
  const backToState = getItemFromLC("backToState");
  const previousURL = backToState?.previousURL || "packs";
  const pack =
    backToState?.pack || ({ name: "namePlaceholder" } as IPackResponse);

  const cardsCount = state ? state.cardsCount : 0;
  const getCardsConfig = {
    cardsPack_id: packID ? packID : "",
    pageCount: cardsCount,
  };
  const hasQuestionImg = card.questionImg && card.questionImg !== "undefined";
  const hasAnswerImg = card.questionImg && card.answerImg !== "undefined";

  // Utils

  useEffect(() => {
    dispatch(getCardsTC(getCardsConfig));
  }, []);

  const handleShowGrades = () => setShowGrades(true);

  const changeGrade = (value: string) => setSelectedGrade(value);

  const handleNext = () => {
    const selectedGradeNumber = grades.indexOf(selectedGrade) + 1;
    console.log(selectedGradeNumber);

    dispatch(
      updateCardGradeTC({ card_id: card._id, grade: selectedGradeNumber })
    );

    setShowGrades(false);
    setSelectedGrade("");
  };

  if (isLoading || !card) return <Preloader />;

  return (
    <LearnContainer>
      <Flex sx={{ marginBottom: "1rem" }}>
        <BackTo route={`/packs?${previousURL}`} title={"Back to packs"} />
      </Flex>
      <Flex fDirection="column" align="center">
        <Typography variant="title" as="h3" sx={{ marginBottom: "0.625rem" }}>
          <b>Learn "{pack.name}"</b>
        </Typography>
        <Paper sx={{ padding: "2.3rem", minWidth: "320px" }}>
          <Typography>
            <b>Question</b>:{" "}
            {hasQuestionImg ? (
              <img src={card.questionImg} alt="questionImage" />
            ) : (
              card.question
            )}
          </Typography>
          <Typography sx={{ marginBottom: "1.25rem" }}>
            Attempts: {card.shots}
          </Typography>
          {!showGrades ? (
            <Button onClick={handleShowGrades}>Show answer</Button>
          ) : (
            <>
              <Typography>
                <b>Answer</b>:{" "}
                {hasAnswerImg ? (
                  <img src={card.answerImg} alt="answerImage" />
                ) : (
                  card.answer
                )}
              </Typography>
              <Typography>Rate yourself:</Typography>
              <LearnRate
                changeGrade={changeGrade}
                selectedGrade={selectedGrade}
              />
              <Button onClick={handleNext} disabled={!selectedGrade}>
                Go next
              </Button>
            </>
          )}
        </Paper>
      </Flex>
    </LearnContainer>
  );
};
