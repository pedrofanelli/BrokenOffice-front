import { createAction, createReducer } from "@reduxjs/toolkit";

export const notificationsSolver = createAction("SET_NOT_SOLVER");
export const notificationsIssuer = createAction("SET_NOT_ISSUER");

const initialState = {
  notificationsSolver: [],
  notificationsIssuer: [],
};

const reducer = createReducer(initialState, {
  [notificationsSolver]: (state, action) => {
    state.notificationsSolver = action.payload;
  },
  [notificationsIssuer]: (state, action) => {
    state.notificationsIssuer = action.payload;
  },
});

export default reducer;
