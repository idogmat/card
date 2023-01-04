import {
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { getCardsTC, updateCardGradeTC } from "./../Cards/cardsThunks";
import { useAllSelector, useAppDispatch } from "common/hooks";
import { useLocation, useParams } from "react-router-dom";

import { BackTo } from "common/components/BackTo/BackTo";
import { Box } from "@mui/system";
import { ICard } from "common/models";
import { IPackResponse } from "./../Packs/packsAPI";
import { LearnRate } from "./LearnRate";
import { Preloader } from "common/components/Preloader/Preloader";
import { appStateSelect } from "app/selectors";
import { cardsCardsSelector } from "features/Cards/selectors";
import { grades } from "./Learn.data";

export const Learn = () => {
  // dispatch & selectors
  const dispatch = useAppDispatch();
  const cards = useAllSelector(cardsCardsSelector);
  const { isLoading } = useAllSelector(appStateSelect);
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
  const previousURL = state ? state.previousURL : "";
  const pack: IPackResponse = state ? state.pack : {};
  const cardsCount = state ? state.cardsCount : 0;
  const getCardsConfig = {
    cardsPack_id: packID ? packID : "",
    pageCount: cardsCount,
  };
  console.log("PREVIOUS URL IN LEARN", previousURL);

  // Utils

  useEffect(() => {
    dispatch(getCardsTC(getCardsConfig));
  }, []);

  const handleShowGrades = () => setShowGrades(true);

  const changeGrade = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedGrade(e.target.value);

  const handleNext = () => {
    const selectedGradeNumber = grades.indexOf(selectedGrade) + 1;
    dispatch(
      updateCardGradeTC({ card_id: card._id, grade: selectedGradeNumber })
    );

    setShowGrades(false);
    setSelectedGrade("");
  };

  if (isLoading || !card) return <Preloader />;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        paddingTop: "100px",
        position: "relative",
      }}
    >
      <Box sx={{ marginBottom: 2 }}>
        <BackTo route={`/packs?${previousURL}`} title={"Back to packs"} />
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <Typography component="h1" variant="h3" sx={{ marginBottom: 2 }}>
          <b>Learn "{pack.name}"</b>
        </Typography>
        <Paper sx={{ padding: 5, minWidth: "320px" }}>
          <Typography>
            <b>Question</b>: {card.question}
          </Typography>
          <Typography sx={{ marginBottom: 3 }}>
            Attempts: {card.shots}
          </Typography>
          {!showGrades ? (
            <Button onClick={handleShowGrades} variant="contained">
              Show answer
            </Button>
          ) : (
            <>
              <Typography>
                <b>Answer:</b> {card.answer}
              </Typography>
              <Typography>Rate yourself:</Typography>
              <LearnRate
                changeGrade={changeGrade}
                selectedGrade={selectedGrade}
              />
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!selectedGrade}
              >
                Go next
              </Button>
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
};
