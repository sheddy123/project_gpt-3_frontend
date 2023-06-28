import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import modalReducer from "../features/modal/modalSlice";

const rootReducer = combineReducers({
  // Add your reducers here
  authReducer,
  modalReducer,
});

export default rootReducer;
