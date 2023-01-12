import { useAllSelector, useAppDispatch } from "../common/hooks";

import { AppRouter } from "../common/components/AppRouter/AppRouter";
import { Container } from "common/ui-kit/Container/Container";
import { Header } from "../common/components/Header/Header";
import { Notifications } from "../common/components/Notifications/Notifications";
import { Preloader } from "../common/components/Preloader/Preloader";
import { appStateSelector } from "./selectors";
import { initAppTC } from "./appThunks";
import styles from "./App.module.scss";
import { useEffect } from "react";

function App() {
  const { isInit } = useAllSelector(appStateSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAppTC());
  }, []);

  return isInit ? (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.page}>
        <Container variant="sm">
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
