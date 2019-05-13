import { handleActions } from "redux-actions";
import { combineReducers } from "redux";
import { profileSave, profileShowWarning, profileHideWarning } from "./actions";

const profileData = handleActions(
  {
    [profileSave]: (_, action) => action.payload
  },
  {}
);

const warning = handleActions(
  {
    [profileShowWarning]: (_, action) => true,
    [profileHideWarning]: (_, action) => false
  },
  false
);

export default combineReducers({
  profileData,
  warning
});

export const getProfileData = state => state.profile.profileData;
export const getWarning = state => state.profile.warning;
