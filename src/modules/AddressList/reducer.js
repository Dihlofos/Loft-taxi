import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  fetchListRequest,
  fetchListSuccess,
  fetchListFailure
} from "./actions";

const fetchRequest = handleActions(
  {
    [fetchListRequest]: () => true,
    [fetchListSuccess]: () => []
  },
  false
);
const data = handleActions(
  {
    [fetchListRequest]: () => false,
    [fetchListSuccess]: (_, action) => action.payload
  },
  []
);
const fetchFailed = handleActions(
  {
    [fetchListRequest]: () => false,
    [fetchListFailure]: () => true
  },
  false
);

export default combineReducers({
  fetchRequest,
  data,
  fetchFailed
});

export const getFetchRequested = state => state.addressList.fetchRequest;
export const getFetchData = state => state.addressList.data;
export const getFetchFailed = state => state.addressList.fetchFailed;
