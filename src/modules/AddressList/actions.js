import { createAction } from "redux-actions";

export const fetchListRequest = createAction("FETCH_LIST_REQUEST");
export const fetchListSuccess = createAction("FETCH_LIST_SUCCESS");
export const fetchListFailure = createAction("FETCH_LIST_FAILURE");
