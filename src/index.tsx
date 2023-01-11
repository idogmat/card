import "./index.scss";
import "./common/styles/common/null.scss";

import App from "./app/App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import reportWebVitals from "./reportWebVitals";
import { store } from "./app/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// const theme = {
//   rem: (px: number) => `${px / 16}rem`,
// };

root.render(
  <Provider store={store}>
    {/* <ThemeProvider theme={theme}> */}
    <HashRouter>
      <App />
    </HashRouter>
    {/* </ThemeProvider> */}
  </Provider>
);

reportWebVitals();
