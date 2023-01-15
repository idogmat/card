import React, { ReactNode } from "react";

import { IPackResponse } from "../packsAPI";
import { NotFoundElements } from "../../../common/components/NotFoundElements/NotFoundElements";
import PackElement from "./PackElement";
import TableRow from "@mui/material/TableRow/TableRow";
import { CardsSwipeIcon, CardsTableWrapper } from "../../Cards/CardsStyles";
import { Flex } from "../../../common/ui-kit/Flex/Flex";
import { TableBody, TableHeader } from "../../../common/ui-kit/Table/Table";

interface ITableProps {
  id: string;
  cardPacks: IPackResponse[];
  isMyPack: boolean;
  changeSort: (field: string) => void;
  showSortIcon: (field: string) => ReactNode;
  removePack: (id: string) => void;
  isLoading: boolean;
}

const PacksTable: React.FC<ITableProps> = React.memo(
  ({ id, changeSort, showSortIcon, cardPacks, isLoading }) => {
    return (
      <Flex fDirection="column">
        <CardsSwipeIcon />
        <CardsTableWrapper>
          <TableHeader cols="100px minmax(100px,300px) 120px 150px minmax(100px,300px) minmax(100px,150px)">
            <Flex>Cover</Flex>
            <Flex>Name</Flex>
            <Flex align={"center"}>CardsCount</Flex>
            <Flex
              className={"table-cell-icon"}
              onClick={() => changeSort("updated")}
              align="center"
            >
              Updated
              {showSortIcon("updated")}
            </Flex>
            <Flex align={"center"}>Author Name</Flex>
            <Flex align={"center"} style={{ margin: "auto" }}>
              Actions
            </Flex>
          </TableHeader>
          <TableBody>
            {!!cardPacks ? (
              cardPacks.map((pack) => (
                <PackElement
                  key={pack._id}
                  id={id}
                  pack={pack}
                  isLoading={isLoading}
                />
              ))
            ) : (
              <TableRow>
                <NotFoundElements title={"Empty"} />
              </TableRow>
            )}
          </TableBody>
        </CardsTableWrapper>
      </Flex>
    );
  }
);

export default PacksTable;
