import login, { sagas as loginSagas } from "./Login";
import addressList, { sagas as addressListSagas } from "./AddressList";
import route, { sagas as routeSagas } from "./Routes";
import profile from "./Profile";
import { fork } from "redux-saga/effects";
import { combineReducers } from "redux";

export default combineReducers({ login, profile, addressList, route });

export function* rootSaga() {
  yield fork(loginSagas);
  yield fork(addressListSagas);
  yield fork(routeSagas);
}
