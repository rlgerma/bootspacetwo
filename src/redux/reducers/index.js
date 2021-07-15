import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { postsReducer } from "./postsReducer";
import { actionsReducer } from "./actionsReducer";
export default combineReducers({
  user: userReducer,
  posts: postsReducer,
  actions: actionsReducer,
});
