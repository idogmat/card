import { AppRouter } from "../common/components/AppRouter/AppRouter";
import EditableElement from "../common/components/EditableElement/EditableElement";
import { HashRouter } from "react-router-dom";
import { Header } from "../common/components/Header/Header";
import { Provider } from "react-redux";
import React from "react";
import SuperButton from "../common/components/SuperButton/SuperButton";
import SuperCheckbox from "../common/components/SuperCheckbox/SuperCheckbox";
import SuperInputText from "../common/components/SuperInput/SuperInput";
import SuperRadio from "../common/components/SuperRadio/SuperRadio";
import SuperSelect from "../common/components/SuperSelect/SuperSelect";
import { store } from "./store";

function App() {
  const mockOptions = [1, 2, 3, 4];
  return (
    <Provider store={store}>
      <HashRouter>
        <>
          <Header />
          <main className="page">
            <AppRouter />
          </main>
        </>
      </HashRouter>
      <SuperButton>Button placeholder</SuperButton>
      <SuperCheckbox />
      <SuperInputText />
      <SuperRadio options={mockOptions} />
      <SuperSelect options={mockOptions} />
      <EditableElement value="placeholder" />
    </Provider>
  );
}
export default App;
