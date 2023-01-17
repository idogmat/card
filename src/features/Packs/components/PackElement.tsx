import { NavLink, useSearchParams } from "react-router-dom";
import noCover from "../../../assets/img/no_cover.png";
import { IPackResponse } from "../packsAPI";
import React from "react";
import { formDate } from "../../../common/utils/date";
import { packsModalsAC } from "../packsModalsSlice";
import { setItemToLC } from "./../../../common/utils/localStorage";
import { useAppDispatch } from "../../../common/hooks";
import {
  TableBodyItem,
  TableBodyLine,
} from "../../../common/ui-kit/Table/Table";
import { Button } from "../../../common/ui-kit/Button/Button";
import { AiOutlineAudit, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Flex } from "../../../common/ui-kit/Flex/Flex";
import { Img, TableBodyItemHiddenMaxChars } from "../PacksStyle";

interface IRowProps {
  id: string;
  pack: IPackResponse;
  isLoading: boolean;
}

const PackElement: React.FC<IRowProps> = React.memo(
  ({ id, pack, isLoading }) => {
    // Dispatch & selectors
    const dispatch = useAppDispatch();

    // Vars
    const params = useSearchParams()[0];
    const backToState = { previousURL: params.toString(), pack };

    // Utils
    const modalDelete = () =>
      dispatch(packsModalsAC.setDeletePackState({ status: true, pack }));

    const modalEdit = () =>
      dispatch(packsModalsAC.setUpdatePackState({ status: true, pack }));

    const savePackData = () => {
      setItemToLC("backToState", backToState);
    };
    const shouldDisableActions = pack.user_id !== id;
    const srcImg = pack.deckCover?.length < 40 ? noCover : pack.deckCover;

    return (
      <TableBodyLine cols="100px minmax(100px,300px) 120px 150px minmax(100px,300px) minmax(80px,150px)">
        <TableBodyItem>
          {pack.deckCover && <Img src={srcImg} alt={"cover"} />}
        </TableBodyItem>
        <TableBodyItemHiddenMaxChars>
          <NavLink
            state={backToState}
            to={`/packs/${pack._id}`}
            onClick={savePackData}
          >
            <Flex sx={{ overflow: "hidden" }}>{pack.name}</Flex>
          </NavLink>
        </TableBodyItemHiddenMaxChars>
        <TableBodyItem>{pack.cardsCount}</TableBodyItem>
        <TableBodyItem>{formDate(pack.created)}</TableBodyItem>
        <TableBodyItemHiddenMaxChars>
          <Flex>{pack.user_name}</Flex>
        </TableBodyItemHiddenMaxChars>
        <TableBodyItem>
          <Flex justify={"center"}>
            <NavLink to={`/learn/${pack._id}`} state={backToState}>
              <Button semantic>
                <AiOutlineAudit />
              </Button>
            </NavLink>

            <Button
              semantic
              disabled={shouldDisableActions}
              onClick={modalDelete}
            >
              <AiOutlineDelete />
            </Button>

            <Button
              semantic
              disabled={shouldDisableActions}
              onClick={modalEdit}
            >
              <AiOutlineEdit />
            </Button>
          </Flex>
        </TableBodyItem>
      </TableBodyLine>
    );
  }
);

export default PackElement;
