import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import modalReducer from "../features/modal/modalSlice";
import codeEditorReducer from "../features/codeEditor/code_editor_slice";

const rootReducer = combineReducers({
  // Add your reducers here
  authReducer,
  modalReducer,
  codeEditorReducer
});

export default rootReducer;
