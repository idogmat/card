import { NavLink, useSearchParams } from "react-router-dom";
import { Skeleton } from "@mui/material";

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
      <TableBodyLine cols="repeat(6, minmax(100px, 1fr))">
        <TableBodyItem>
          {isLoading ? (
            <Skeleton />
          ) : (
            pack.deckCover && (
              <img
                src={pack.deckCover}
                alt={"cover"}
                style={{ width: "80px" }}
              />
            )
          )}
        </TableBodyItem>
        <TableBodyItem>
          <NavLink
            state={backToState}
            to={`/packs/${pack._id}`}
            onClick={savePackData}
          >
            {isLoading ? <Skeleton /> : pack.name}
          </NavLink>
        </TableBodyItem>
        <TableBodyItem>
          {isLoading ? <Skeleton /> : pack.cardsCount}
        </TableBodyItem>
        <TableBodyItem>
          {isLoading ? <Skeleton /> : formDate(pack.created)}
        </TableBodyItem>
        <TableBodyItem style={{ width: "100%" }}>
          {isLoading ? <Skeleton /> : pack.user_name}
        </TableBodyItem>
        <TableBodyItem>
          <NavLink
            to={`/learn/${pack._id}`}
            state={{ ...backToState, cardsCount: pack.cardsCount }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <Button semantic>
                <AiOutlineAudit />
              </Button>
            )}
          </NavLink>
          {isLoading ? (
            <Skeleton />
          ) : (
            <Button
              semantic
              disabled={pack.user_id !== id}
              onClick={modalDelete}
            >
              <AiOutlineDelete />
            </Button>
          )}
          {isLoading ? (
            <Skeleton />
          ) : (
            <Button semantic disabled={pack.user_id !== id} onClick={modalEdit}>
              <AiOutlineEdit />
            </Button>
          )}
        </TableBodyItem>
      </TableBodyLine>
    );
  }
);

export default PackElement;
