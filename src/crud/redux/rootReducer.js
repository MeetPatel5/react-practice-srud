import { combineReducers } from "redux";
import { reqReducer } from "./reducers/reqReducer";

const rootReducer = combineReducers({ employees: reqReducer });

export { rootReducer };
