import { SET_ACTIONS } from "../actions";

const initialState = null;

export const actionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIONS:
      return {
        ...state,
        actions: action.payload,
      };

    default:
      return state;
  }
};
