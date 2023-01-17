import React, { useEffect, useState } from "react";
import { getCardsTC, updateCardGradeTC } from "./../Cards/cardsThunks";
import { useAllSelector, useAppDispatch } from "common/hooks";
import { useLocation, useParams } from "react-router-dom";

import { BackTo } from "common/components/BackTo/BackTo";
import { Button } from "common/ui-kit/Button/Button";
import { Flex } from "common/ui-kit/Flex/Flex";
import { ICard } from "common/models";
import { IPackResponse } from "./../Packs/packsAPI";
import {
  LearnCardImg,
  LearnCardWrapper,
  LearnContainer,
  LearnContent,
} from "./LearnStyles";
import { LearnRate } from "./LearnRate";
import { Paper } from "common/ui-kit/Paper/Paper";
import { Preloader } from "common/components/Preloader/Preloader";
import { Typography } from "common/ui-kit/Text/Typography";
import { appStateSelector } from "app/selectors";
import { cardsCardsSelector } from "features/Cards/selectors";
import { getItemFromLC } from "common/utils/localStorage";
import { grades } from "./Learn.data";
import { CardsAC } from "features/Cards/cardsSlice";
import { NotFoundElements } from "common/components/NotFoundElements/NotFoundElements";

export const Learn = () => {
  // dispatch & selectors
  const dispatch = useAppDispatch();
  const cards = useAllSelector(cardsCardsSelector);
  const { isLoading } = useAllSelector(appStateSelector);

  // Query
  const { packID } = useParams();

  // Local states
  const [showGrades, setShowGrades] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState("");

  // Vars
  const currentCard = cards.reduce<ICard>((finalCard, currentCard) => {
    finalCard = currentCard.grade < finalCard.grade ? currentCard : finalCard;
    return finalCard;
  }, cards[0]);

  const backToState = getItemFromLC("backToState");
  const previousURL = backToState?.previousURL || "packs";
  const pack =
    backToState?.pack ||
    ({ name: "namePlaceholder", cardsCount: Infinity } as IPackResponse);

  const hasQuestionImg =
    currentCard &&
    currentCard.questionImg &&
    currentCard.questionImg !== "undefined";

  const hasAnswerImg =
    currentCard &&
    currentCard.questionImg &&
    currentCard.answerImg !== "undefined";

  // Utils

  useEffect(() => {
    const getCardsConfig = {
      cardsPack_id: packID ? packID : "",
      pageCount: pack.cardsCount,
    };

    dispatch(getCardsTC(getCardsConfig));
  }, [dispatch]);

  const handleShowGrades = () => setShowGrades(true);

  const changeGrade = (value: string) => setSelectedGrade(value);

  const handleNext = () => {
    const selectedGradeNumber = grades.indexOf(selectedGrade) + 1;

    dispatch(
      updateCardGradeTC({
        card_id: currentCard._id,
        grade: selectedGradeNumber,
      })
    );

    setShowGrades(false);
    const filteredCards = cards.filter((card) => card._id !== currentCard._id);
    dispatch(CardsAC.setCards({ cards: filteredCards }));
    setSelectedGrade("");
  };

  if (isLoading) return <Preloader />;

  return (
    <LearnContainer>
      <Flex sx={{ marginBottom: "1rem" }}>
        <BackTo route={`/packs?${previousURL}`} title={"Back to packs"} />
      </Flex>
      <LearnContent>
        {currentCard ? (
          <>
            <Typography variant="title" as="h3">
              <b>Learn "{pack.name}"</b>
            </Typography>
            <LearnCardWrapper>
              <Typography sx={{ marginBottom: "0.6rem" }}>
                <b>Question</b>:{" "}
              </Typography>
              {hasQuestionImg ? (
                <LearnCardImg
                  src={currentCard.questionImg}
                  alt="questionImage"
                />
              ) : (
                <Typography>{currentCard.question}</Typography>
              )}
              <Typography sx={{ marginBottom: "1.25rem" }}>
                Attempts: {currentCard.shots}
              </Typography>
              {!showGrades ? (
                <Button onClick={handleShowGrades}>Show answer</Button>
              ) : (
                <>
                  <Typography sx={{ marginBottom: "0.6rem" }}>
                    <b>Answer</b>:{" "}
                  </Typography>

                  {hasAnswerImg ? (
                    <LearnCardImg
                      src={currentCard.answerImg}
                      alt="answerImage"
                    />
                  ) : (
                    <Typography>{currentCard.answer}</Typography>
                  )}
                  <Typography sx={{ marginTop: "1rem" }}>
                    Rate yourself:
                  </Typography>
                  <LearnRate
                    changeGrade={changeGrade}
                    selectedGrade={selectedGrade}
                  />
                  <Button onClick={handleNext} disabled={!selectedGrade}>
                    Go next
                  </Button>
                </>
              )}
            </LearnCardWrapper>
          </>
        ) : (
          <NotFoundElements title="You have learn all the cards." />
        )}
      </LearnContent>
    </LearnContainer>
  );
};
