import { NavLink, useSearchParams } from "react-router-dom";
import { Skeleton } from "@mui/material";
// @ts-ignore
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
    const [params, setSearchParams] = useSearchParams();
    const backToState = { previousURL: params.toString(), pack };

    // Utils
    const modalDelete = () =>
      dispatch(packsModalsAC.setDeletePackState({ status: true, pack }));

    const modalEdit = () =>
      dispatch(packsModalsAC.setUpdatePackState({ status: true, pack }));

    const savePackData = () => {
      setItemToLC("backToState", backToState);
    };

    return (
      <TableBodyLine cols="100px minmax(100px,300px) 120px 150px minmax(100px,300px) minmax(80px,150px)">
        <TableBodyItem>
          {pack.deckCover && (
            <img
              src={pack.deckCover.length < 40 ? noCover : pack.deckCover}
              alt={"cover"}
              style={{ width: "50px", borderRadius: "10px" }}
            />
          )}
        </TableBodyItem>
        <TableBodyItem>
          <Flex style={{ overflow: "hidden" }}>
            <NavLink
              state={backToState}
              to={`/packs/${pack._id}`}
              onClick={savePackData}
              style={{ overflow: "hidden" }}
            >
              {pack.name}
            </NavLink>
          </Flex>
        </TableBodyItem>
        <TableBodyItem style={{ margin: "auto" }}>
          {pack.cardsCount}
        </TableBodyItem>
        <TableBodyItem>{formDate(pack.created)}</TableBodyItem>
        <TableBodyItem style={{ width: "100%" }}>
          <Flex style={{ overflow: "hidden" }}>{pack.user_name}</Flex>
        </TableBodyItem>
        <TableBodyItem style={{ margin: "auto" }}>
          <NavLink to={`/learn/${pack._id}`} state={backToState}>
            <Button semantic>
              <AiOutlineAudit />
            </Button>
          </NavLink>

          <Button semantic disabled={pack.user_id !== id} onClick={modalDelete}>
            <AiOutlineDelete />
          </Button>

          <Button semantic disabled={pack.user_id !== id} onClick={modalEdit}>
            <AiOutlineEdit />
          </Button>
        </TableBodyItem>
      </TableBodyLine>
    );
  }
);

export default PackElement;
