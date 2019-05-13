import { takeLatest, put, call, fork } from "redux-saga/effects";
import { Auth } from "./api.js";
import { authRequest, authSuccess, authError } from "./actions.js";

function* authWatcher() {
  yield takeLatest(authRequest.toString(), authFlow);
}

export function* authFlow(action) {
  const { name, pass } = action.payload;
  const payload = yield call(Auth, name, pass);

  if (payload.success) {
    yield put(authSuccess());
    localStorage.setItem("isLogged", true);
  } else {
    yield put(authError(payload.error));
  }
}

export default function*() {
  yield fork(authWatcher);
}
