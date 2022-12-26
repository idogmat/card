import React, { useEffect } from 'react';
import {useParams} from "react-router-dom";
import {BackTo} from "../../common/components/BackTo/BackTo";
import {
   Box,
   IconButton,
   Paper,
   Rating,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow
} from "@mui/material";
import {getCardsTC} from "./cardsThunks";
import {IGetCardsRequest} from "./cardsAPI";
import {useAllSelector, useAppDispatch} from "../../common/hooks";
import {cardsStateSelector} from "./selectors";
import {Edit, Remove} from "@mui/icons-material";
import {userStateSelector} from "../User/selectors";

export const Cards = () => {
   const {cardID} = useParams()
   const dispatch = useAppDispatch()
   const {cards} = useAllSelector(cardsStateSelector)
   const user = useAllSelector(userStateSelector)

   useEffect(() => {
      const model = {cardsPack_id: cardID} as IGetCardsRequest
      dispatch(getCardsTC(model))
   }, []);


   return (
      <Box sx={{height: '100vh', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
         <Box sx={{marginBottom: 5}}>
            <BackTo title={'Back to packs'} route={'/packs'} />
         </Box>
         <TableContainer component={Paper}>
            <Table sx={{minWidth: 500}}>
               <TableHead>
                  <TableCell>Question</TableCell>
                  <TableCell>Answer</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell>Grade</TableCell>
               </TableHead>
               <TableBody>
                  {cards.map((card) => {
                     return (
                        <TableRow>
                           <TableCell>
                              {card.question}
                           </TableCell>
                           <TableCell>
                              {card.answer}
                           </TableCell>
                           <TableCell>
                              {card.updated.toString()}
                           </TableCell>
                           <TableCell>
                              <Box sx={{display: 'flex', alignItems: 'center', gap: 10}}>
                                 <Rating name={'read-only'} value={Math.floor(card.grade)} readOnly precision={0.5} />

                                 <IconButton>
                                    <Edit />
                                 </IconButton>
                                 <IconButton>
                                    <Remove />
                                 </IconButton>
                              </Box>
                           </TableCell>
                        </TableRow>
                     )
                  })}
               </TableBody>
            </Table>
         </TableContainer>
      </Box>
   );
};

