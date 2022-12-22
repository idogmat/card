import { AppRouter } from "../common/components/AppRouter/AppRouter";
import EditableElement from "../common/components/EditableElement/EditableElement";
import { HashRouter } from "react-router-dom";
import { Header } from "../common/components/Header/Header";
import { Provider } from "react-redux";
import React from "react";
import styles from "./App.module.css";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className={styles.wrapper}>
          <Header />
          <main className={styles.page}>
            <AppRouter />
          </main>
        </div>
      </HashRouter>
    </Provider>
  );
}
export default App;
