import React, { useEffect } from "react";
import { useAllSelector, useAppDispatch } from "../common/hooks";

import { AppRouter } from "../common/components/AppRouter/AppRouter";
import { Container } from "@mui/material";
import { Header } from "../common/components/Header/Header";
import { InitAppTC } from "./appThunks";
import { Notifications } from "../common/components/Notifications/Notifications";
import { Preloader } from "../common/components/Preloader/Preloader";
import { appStateSelect } from "../features/Packs/selectors";
import styles from "./App.module.css";

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
        <Container maxWidth="lg">
          <AppRouter />
        </Container>
        <Notifications />
      </main>
    </div>
  ) : (
    <Preloader />
  );
}
export default App;
