import { createAction, createReducer } from "@reduxjs/toolkit";

export const setOffices = createAction("SET_OFFICES");
export const deleteOffice = createAction("DELETE_OFFICES");
export const setSelectedOffice = createAction("SET_SELECTED_OFFICE");
export const updateOffices = createAction("UPDATE_OFFICES");
export const addOffice = createAction("ADD_OFFICE");

const reducer = createReducer([], {
  [setOffices]: (state, action) => {
    return action.payload;
  },
  [deleteOffice]: (state, action) => {
    return state.filter((office) => office._id !== action.payload);
  },
  [setSelectedOffice]: (state, action) => {
    return action.payload;
  },
  [updateOffices]: (state, action) => {
    const indexToUpdate = state.findIndex(
      (office) => office._id === action.payload._id
    );
    if (indexToUpdate !== -1) state.splice(indexToUpdate, 1, action.payload);
    return state;
  },
  [addOffice]: (state, action) => {
    // if (
    //   state.some(
    //     (office) =>
    //       office.address.street === action.payload.address.street &&
    //       office.address.zip === action.payload.address.zip
    //   )
    // ) {
    //   return toast.error("Cannot set duplicated office");
   
      return [...state, action.payload];
    
  },
});

export default reducer;
