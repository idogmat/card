import { AddNewPack } from "../components/modals/AddNewPack";
import { packsModalsAC } from "../packsModalsSlice";
import { render, screen } from "@testing-library/react";
import React from "react";
import { store } from "../../../app/store";
import { Provider } from "react-redux";
import Button from "@mui/material/Button";
import { ModalBase } from "../../../common/components/Modal";
import { useAppDispatch } from "../../../common/hooks";

const fields = {
  name: "Jack/Pack",
  deckCover: "nope",
  isPrivate: false,
};

const setPackModal = packsModalsAC;
const storeMock = store;
describe("Add Pack", () => {
  it("should open/close modal", async () => {
    // useAllSelector();
    // const { isOpen } = useAllSelector(addNewModalSelector);
    // const dispatch = useAppDispatch();
    // const toggle = () =>
    //   dispatch(packsModalsAC.setAddPackState({ status: true }));
    // console.log(isOpen);
    const dispatch = jest.fn();
    // const { isOpen } = storeMock.getState().packsModals.addPack;

    // dispatch(packsModalsAC.setAddPackState({ status: true }));
    const { calls } = dispatch.mock;
    console.log(calls);
    const [settingIsOpen] = calls;
    render(
      <Provider store={store}>
        <AddNewPack />
      </Provider>
    );
    // fireEvent.click(screen.getByRole("button"));
    expect(await screen.findByText("Add Pack")).toBeInTheDocument();

    // expect(baseElement).toMatchSnapshot();
    // expect(settingIsOpen.payload.status).toBe(true);
    // expect(component).toMatchSnapshot();
  });
});
