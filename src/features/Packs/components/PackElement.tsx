import { DeleteOutline, Edit } from "@mui/icons-material";
import { NavLink, useSearchParams } from "react-router-dom";

import Button from "@mui/material/Button/Button";
import { IPackResponse } from "../packsAPI";
import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import { Skeleton, TableCell } from "@mui/material";
import TableRow from "@mui/material/TableRow/TableRow";
import { formDate } from "../../../common/utils/date";
import { useAppDispatch } from "../../../common/hooks";
import { packsModalsAC } from "../packsModalsSlice";

interface IRowProps {
  id: string;
  pack: IPackResponse;
  isLoading: boolean;
}

const PackElement: React.FC<IRowProps> = React.memo(
  ({ id, pack, isLoading }) => {
    const [params, setSearchParams] = useSearchParams();
    const backToState = { previousURL: params.toString(), pack: pack };
    const dispatch = useAppDispatch();
    const modalDelete = () =>
      dispatch(packsModalsAC.setDeletePackState({ status: true, pack }));
    const modalEdit = () =>
      dispatch(packsModalsAC.setUpdatePackState({ status: true, pack }));
    return (
      <>
        <TableRow key={pack._id} style={{ height: "80px" }}>
          <TableCell align="center">
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
          </TableCell>
          <TableCell component="th" scope="row">
            <NavLink state={backToState} to={`/packs/${pack._id}`}>
              {isLoading ? <Skeleton /> : pack.name}
            </NavLink>
          </TableCell>
          <TableCell align="center">
            {isLoading ? <Skeleton /> : pack.cardsCount}
          </TableCell>
          <TableCell align="center">
            {isLoading ? <Skeleton /> : formDate(pack.created)}
          </TableCell>
          <TableCell align="center">
            {isLoading ? <Skeleton /> : pack.user_name}
          </TableCell>
          <TableCell align="center">
            <NavLink
              to={`/learn/${pack._id}`}
              state={{ ...backToState, cardsCount: pack.cardsCount }}
            >
              {isLoading ? <Skeleton /> : <SchoolIcon />}
            </NavLink>
            {isLoading ? (
              <Skeleton />
            ) : (
              <Button disabled={pack.user_id !== id} onClick={modalDelete}>
                <DeleteOutline />
              </Button>
            )}
            {isLoading ? (
              <Skeleton />
            ) : (
              <Button disabled={pack.user_id !== id} onClick={modalEdit}>
                : <Edit />
              </Button>
            )}
          </TableCell>
        </TableRow>
      </>
    );
  }
);

export default PackElement;
