import { AddNewPack } from "../components/modals/AddNewPack";
import { addNewModalSelector } from "../components/modals/modalsSelectors";
import { useAllSelector, useAppDispatch } from "../../../common/hooks";
import { packsModalsAC } from "../packsModalsSlice";
import { render, screen } from "@testing-library/react";

const fields = {
  name: "Jack/Pack",
  deckCover: "nope",
  isPrivate: false,
};

// describe("Add Pack", () => {
//   it("should open/close modal", () => {
//     const { isOpen } = useAllSelector(addNewModalSelector);
//     const dispatch = useAppDispatch();
//     const toggle = () =>
//       dispatch(packsModalsAC.setAddPackState({ status: true }));
//     console.log(isOpen);
//     render(<AddNewPack key={"1"} />);
//     expect(screen.getByText("Learn React")).toBeInTheDocument();
//   });
// });
