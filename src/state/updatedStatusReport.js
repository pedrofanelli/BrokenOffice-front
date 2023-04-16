import { createAction, createReducer } from "@reduxjs/toolkit";

export const updateStatusReport = createAction("UPDATE_STATUS_REPORT");

const reducer = createReducer({}, {
  [updateStatusReport]: (state, action) => action.payload,
});

export default reducer;