import { DeleteOutline, Edit } from "@mui/icons-material";
import { NavLink, useSearchParams } from "react-router-dom";

import Button from "@mui/material/Button/Button";
import { IPackResponse } from "./packsAPI";
import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import { TableCell } from "@mui/material";
import TableRow from "@mui/material/TableRow/TableRow";
import { formDate } from "../../common/utils/date";

interface IRowProps {
  id: string;
  pack: IPackResponse;
  removePack: (id: string) => void;
  isMyPack: boolean;
}

const PackElement: React.FC<IRowProps> = React.memo(
  ({ id, removePack, pack }) => {
    const [params, setSearchParams] = useSearchParams();
    const backToState = { previousURL: params.toString(), packName: pack.name };

    return (
      <>
        <TableRow key={pack._id}>
          <TableCell component="th" scope="row">
            <NavLink state={backToState} to={`/packs/${pack._id}`}>
              {pack.name}
            </NavLink>
          </TableCell>
          <TableCell align="center">{pack.cardsCount}</TableCell>
          <TableCell align="center">{formDate(pack.created)}</TableCell>
          <TableCell align="center">{pack.user_name}</TableCell>
          <TableCell>
            <NavLink
              to={`/learn/${pack._id}`}
              state={{ ...backToState, cardsCount: pack.cardsCount }}
            >
              <SchoolIcon />
            </NavLink>
            <Button
              disabled={pack.user_id !== id}
              onClick={() => removePack(pack._id)}
            >
              <DeleteOutline />
            </Button>
            <Button disabled={pack.user_id !== id}>
              <Edit />
            </Button>
          </TableCell>
        </TableRow>
      </>
    );
  }
);

export default PackElement;
