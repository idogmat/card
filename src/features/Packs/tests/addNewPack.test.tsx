import { AddNewPack } from "../components/modals/AddNewPack";
import { packsModalsAC } from "../packsModalsSlice";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { store } from "../../../app/store";
import { Provider } from "react-redux";
import Button from "@mui/material/Button";
import { ModalBase } from "../../../common/components/Modal";
import { useAppDispatch } from "../../../common/hooks";
import { Header } from "../../../common/components/Header/Header";
import { IPackResponse } from "../packsAPI";

const fields = {
  name: "Jack/Pack",
  deckCover: "nope",
  isPrivate: false,
};
const initialState = {
  addPack: {
    isOpen: false,
    pack: {
      name: "",
      deckCover: "",
      isPrivate: false,
    },
  },
  updatePack: {
    isOpen: false,
    pack: {} as IPackResponse,
  },
  deletePack: {
    isOpen: false,
    pack: {} as IPackResponse,
  },
};
describe("Add Pack", () => {
  it("should open/close modal", async () => {
    const dispatch = useAppDispatch();
    // const { isOpen } = useAllSelector(addNewModalSelector);
    // const dispatch = useAppDispatch();
    // const toggle = () =>
    //   dispatch(packsModalsAC.setAddPackState({ status: true }));
    // console.log(isOpen);
    // const { isOpen } = storeMock.getState().packsModals.addPack;
    // dispatch(packsModalsAC.setAddPackState({ status: true }));
    const changeModalToggle = async () => {
      dispatch(packsModalsAC.setAddPackState({ status: true }));
    };
    render(
      <Provider store={store}>
        <Button variant="contained" onClick={changeModalToggle}>
          Add new Pack
        </Button>
        <AddNewPack />
      </Provider>
    );

    fireEvent.click(screen.getByText("Add new Pack"));
    expect(await screen.findByText("Add Pack")).toBeInTheDocument();

    // expect(baseElement).toMatchSnapshot();
    // expect(settingIsOpen.payload.status).toBe(true);
    // expect(component).toMatchSnapshot();
  });
});
