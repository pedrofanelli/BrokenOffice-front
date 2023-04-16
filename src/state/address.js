import { createAction, createReducer } from "@reduxjs/toolkit";

export const setAddress = createAction("SET_ADDRESS");

const reducer = createReducer(
  {},
  {
    [setAddress]: (state, action) => {
      return action.payload;
    },
  }
);

export default reducer;
