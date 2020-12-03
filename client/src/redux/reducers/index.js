import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { postsReducer } from "./postsReducer";

export default combineReducers({
  user: userReducer,
  posts: postsReducer,
});
