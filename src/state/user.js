import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_LOGIN_USER");

const reducer = createReducer(
  {},
  {
    [setUser]: (state, action) => {
      return action.payload;
    },
  }
);

export default reducer;
