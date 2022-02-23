import { UserState } from "../../../typings";
import { Actions } from "../actions";

const initialState = { data: null, loading: true, error: null };

export function userReducer(
  state = initialState,
  action: { type: unknown; payload: unknown }
): UserState {
  switch (action.type) {
    case Actions.SET_USER:
      return {
        ...state,
        userDoc: action.payload,
      };

    default:
      return state;
  }
}
