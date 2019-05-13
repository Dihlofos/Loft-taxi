import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import {
  getRouteRequest,
  getRouteSuccess,
  getRouteFailure,
  routeClear
} from "./actions";

const isRequest = handleActions(
  {
    [getRouteRequest]: () => true,
    [getRouteSuccess]: () => false,
    [getRouteFailure]: () => false
  },
  false
);

const routeData = handleActions(
  {
    [getRouteRequest]: () => [],
    [getRouteSuccess]: (_, action) => action.payload,
    [routeClear]: () => []
  },
  []
);

const isError = handleActions(
  {
    [getRouteRequest]: () => false,
    [getRouteFailure]: () => true
  },
  false
);

export default combineReducers({
  isRequest,
  routeData,
  isError
});

export const getIsRequest = state => state.route.isRequest;
export const getRouteData = state => state.route.routeData;
export const getIsError = state => state.route.isError;
