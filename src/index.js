import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import moment from "moment";
import "moment/locale/fi";
import MomentLocalizer from "react-widgets-moment";
import { Localization } from "react-widgets";

import tieto2State from "./reducers";

import App from "./App";

const reduxState = createStore(
  tieto2State,
  composeWithDevTools(applyMiddleware(thunk))
  /* applyMiddleware(thunk) */
);

moment.locale("fi");
const localizer = new MomentLocalizer(moment);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={reduxState}>
      <Localization date={localizer}>
        <App />
      </Localization>
    </Provider>
  </StrictMode>
);
