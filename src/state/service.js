import { createAction, createReducer } from "@reduxjs/toolkit";

export const setAssignedReports = createAction("SET_ASSIGNED_REPORTS");

const reducer = createReducer(
 [],
  {
    [setAssignedReports]: (state, action) => {
      return action.payload;
    },
  }
);

export default reducer;
