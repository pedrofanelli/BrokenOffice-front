import { createAction, createReducer } from "@reduxjs/toolkit";

export const setAllUsers = createAction("SET_ALL_USERS");
export const deleteUser = createAction("DELETE_USER");

const reducer = createReducer([], {
  [setAllUsers]: (state, action) => {
    return action.payload;
  },
  [deleteUser]: (state, action) => {
    return state.filter((user) => user.email !== action.payload);
  },
});

export default reducer;
