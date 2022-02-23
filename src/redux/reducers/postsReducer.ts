import { PostState } from "../../../typings";
import { Actions } from "../actions";

const initialState = { data: null, loading: true, error: null };

export function postsReducer(
  state = initialState,
  action: { type: unknown; payload: unknown }
): PostState {
  switch (action.type) {
    case Actions.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    default:
      return state;
  }
}
