import React from "react";
import ReactDOM from "react-dom";
import RootRouter from "./components/RootRouter";
import "./index.css";
import { Provider } from "react-redux";

import createStore, { sagaMiddleware } from "./store";
import { rootSaga } from "./modules";

const store = createStore();
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <RootRouter />
  </Provider>,
  document.getElementById("root")
);
