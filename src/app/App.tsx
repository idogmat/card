import { AppRouter } from "../common/components/AppRouter/AppRouter";
import EditableElement from "../common/components/EditableElement/EditableElement";
import { HashRouter } from "react-router-dom";
import { Header } from "../common/components/Header/Header";
import { Provider } from "react-redux";
import React, { useEffect } from "react";
import styles from "./App.module.css";
import { store } from "./store";
import { InitAppTC } from "./appThunks";
import { useAllSelector, useAppDispatch } from "../common/hooks/hooks";
import { appStateSelect } from "./selectors";
import { Preloader } from "../common/components/Preloader/Preloader";

function App() {
  const { isInit } = useAllSelector(appStateSelect);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(InitAppTC());
  }, []);

  return isInit ? (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.page}>
        <AppRouter />
      </main>
    </div>
  ) : (
    <Preloader />
  );
}
export default App;
