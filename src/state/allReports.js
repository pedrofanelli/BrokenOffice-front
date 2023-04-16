import { createAction, createReducer } from "@reduxjs/toolkit";

export const setAllReports = createAction("SET_ALL_REPORTS");

const reducer = createReducer([], {
  [setAllReports]: (state, action) => action.payload,
});

export default reducer;
