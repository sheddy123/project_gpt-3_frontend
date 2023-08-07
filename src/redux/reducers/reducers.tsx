import { combineReducers } from "redux";
import {
  authReducer,
  modalReducer,
  codeEditorReducer,
  geoLocationReducer,
  profileReducer,
  formReducer,
  courseReducer,
  questionReducer
} from "..";

const rootReducer = combineReducers({
  // Add your reducers here
  authReducer,
  modalReducer,
  codeEditorReducer,
  geoLocationReducer,
  profileReducer,
  formReducer,
  courseReducer,
  questionReducer
});

export default rootReducer;
