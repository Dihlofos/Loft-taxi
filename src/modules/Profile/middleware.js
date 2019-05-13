import { profileSave } from "./actions";

const profileMiddleware = store => next => action => {
  switch (action.type) {
    case profileSave.toString():
      localStorage.setItem("profile", JSON.stringify(action.payload));
      break;
    default:
      break;
  }
  return next(action);
};

export default profileMiddleware;
