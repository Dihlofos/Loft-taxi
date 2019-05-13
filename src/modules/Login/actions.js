import { createAction } from "redux-actions";
export const authRequest = createAction("AUTH_REQUEST");
export const authSuccess = createAction("AUTH_SUCCESS");
export const authError = createAction("AUTH_ERROR");
export const authOff = createAction("AUTH_OFF");
