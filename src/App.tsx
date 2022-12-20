import { AppRouter } from "./components/AppRouter/AppRouter";
import EditableElement from "./components/EditableElement/EditableElement";
import { HashRouter } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Provider } from "react-redux";
import React from "react";
import SuperButton from "./components/SuperButton/SuperButton";
import SuperCheckbox from "./components/SuperCheckbox/SuperCheckbox";
import SuperInputText from "./components/SuperInput/SuperInput";
import SuperRadio from "./components/SuperRadio/SuperRadio";
import SuperSelect from "./components/SuperSelect/SuperSelect";
import { store } from "./redux/store";

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
