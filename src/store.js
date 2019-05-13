import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer, { rootSaga } from "./modules";
import profileMiddleware from "./modules/Profile/middleware";
import loginMiddleware from "./modules/Login/middleware";

export const sagaMiddleware = createSagaMiddleware(rootSaga);

const createAppStore = () => {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      applyMiddleware(loginMiddleware),
      applyMiddleware(profileMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : noop => noop
    )
  );
};

export default createAppStore;
