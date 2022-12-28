import React from "react";
import TableRow from "@mui/material/TableRow/TableRow";
import { TableCell } from "@mui/material";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button/Button";
import SchoolIcon from "@mui/icons-material/School";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { IPackResponse } from "./packsAPI";
import { NotFoundElements } from "../../common/components/NotFoundElements/NotFoundElements";
import { formDate } from "../../common/utils/date";

interface IRowProps {
  id: string;
  cardPacks: IPackResponse[];
  removePack: (id: string) => void;
}

const PacksRow: React.FC<IRowProps> = ({ id, cardPacks, removePack }) => {
  return (
    <>
      {!!cardPacks ? (
        cardPacks.map((pack) => (
          <TableRow key={pack._id}>
            <TableCell component="th" scope="row">
              <NavLink to={`/packs/${pack._id}`}>{pack.name}</NavLink>
            </TableCell>
            <TableCell align="center">{pack.cardsCount}</TableCell>
            <TableCell align="center">{formDate(pack.created)}</TableCell>
            <TableCell align="center">{pack.user_name}</TableCell>
            <TableCell>
              <Button>
                <SchoolIcon />
              </Button>
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
        ))
      ) : (
        <TableRow>
          <NotFoundElements title={"Empty"} />
        </TableRow>
      )}
    </>
  );
};

export default PacksRow;
