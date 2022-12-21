import { AppRouter } from "../common/components/AppRouter/AppRouter";
import EditableElement from "../common/components/EditableElement/EditableElement";
import { HashRouter } from "react-router-dom";
import { Header } from "../common/components/Header/Header";
import { Provider } from "react-redux";
import React from "react";

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
      <EditableElement value="placeholder" />
    </Provider>
  );
}
export default App;
