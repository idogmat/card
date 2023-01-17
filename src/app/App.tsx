import { MainWrapper, PageWrapper } from "./AppStyles";
import { useAllSelector, useAppDispatch } from "../common/hooks";

import { AppRouter } from "../common/components/AppRouter/AppRouter";
import { Header } from "../common/components/Header/Header";
import { Notifications } from "../common/components/Notifications/Notifications";
import { Preloader } from "../common/components/Preloader/Preloader";
import { appStateSelector } from "./selectors";
import { initAppTC } from "./appThunks";
import { useEffect } from "react";

function App() {
  const { isInit } = useAllSelector(appStateSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAppTC());
  }, []);

  return isInit ? (
    <PageWrapper>
      <Header />
      <MainWrapper>
        <AppRouter />
        <Notifications />
      </MainWrapper>
    </PageWrapper>
  ) : (
    <Preloader />
  );
}
export default App;
