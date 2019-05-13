import { takeLatest, put, call, fork } from "redux-saga/effects";
import { Route } from "./api.js";
import { getRouteRequest, getRouteSuccess, getRouteFailure } from "./actions";

function* routeWatcher() {
  yield takeLatest(getRouteRequest.toString(), routeFlow);
}

export function* routeFlow(action) {
  try {
    const [addressFrom, addressTo] = action.payload;
    const payload = yield call(Route, addressFrom, addressTo);
    yield put(getRouteSuccess(payload));
  } catch (error) {
    yield put(getRouteFailure(error));
  }
}

export default function*() {
  yield fork(routeWatcher);
}
