import { SET_USER } from "../actions/types";

const initialState = null;

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userDoc: action.payload,
      };

    default:
      return state;
  }
};
