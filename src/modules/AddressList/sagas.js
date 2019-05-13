import { takeLatest, put, call, fork } from "redux-saga/effects";
import { AddressList } from "./api.js";
import {
  fetchListRequest,
  fetchListSuccess,
  fetchListFailure
} from "./actions";

function* listWatcher() {
  yield takeLatest(fetchListRequest.toString(), listFlow);
}

export function* listFlow(action) {
  try {
    const payload = yield call(AddressList);
    yield put(fetchListSuccess(payload));
  } catch (error) {
    yield put(fetchListFailure(error));
  }
}

export default function*() {
  yield fork(listWatcher);
}
