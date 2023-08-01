import { combineReducers } from "redux";
import {
  authReducer,
  modalReducer,
  codeEditorReducer,
  geoLocationReducer,
  profileReducer,
  formReducer,
  courseReducer
} from "..";

const rootReducer = combineReducers({
  // Add your reducers here
  authReducer,
  modalReducer,
  codeEditorReducer,
  geoLocationReducer,
  profileReducer,
  formReducer,
  courseReducer
});

export default rootReducer;
