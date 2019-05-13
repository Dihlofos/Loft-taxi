import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import { authSuccess, authOff, authRequest, authError } from "./actions";

const isAuthorized = handleActions(
  {
    [authSuccess]: () => true,
    [authOff]: () => false
  },
  false
);
const isRequested = handleActions(
  {
    [authRequest]: () => true,
    [authError]: () => false,
    [authSuccess]: () => false
  },
  false
);

const isError = handleActions(
  {
    [authError]: () => true
  },
  false
);

export default combineReducers({
  isAuthorized,
  isRequested,
  isError
});

export const getIsAuthorized = state => state.login.isAuthorized;
export const getIsRequested = state => state.login.isRequested;
export const getIsError = state => state.login.isError;
