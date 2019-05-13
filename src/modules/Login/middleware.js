import { authOff } from "./actions";

const loginMiddleware = store => next => action => {
  switch (action.type) {
    case authOff.toString():
      localStorage.removeItem("isLogged");
    // eslint-disable-next-line no-fallthrough
    default:
      break;
  }
  return next(action);
};

export default loginMiddleware;
