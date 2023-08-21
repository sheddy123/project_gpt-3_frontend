import { combineReducers } from "redux";
import {
  authReducer,
  modalReducer,
  codeEditorReducer,
  geoLocationReducer,
  profileReducer,
  formReducer,
  courseReducer,
  questionReducer,
  gpt3Reducer
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
  questionReducer,
  gpt3Reducer
});

export default rootReducer;
