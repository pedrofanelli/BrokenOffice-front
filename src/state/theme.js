import { createAction, createReducer } from "@reduxjs/toolkit";

export const setTheme = createAction("SET_THEME");

const reducer = createReducer({mode: 'light'}, {
  [setTheme]: (state, action) => {
    state.mode = action.payload
  },
});

export default reducer;
