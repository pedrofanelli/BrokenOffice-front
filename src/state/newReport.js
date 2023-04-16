import { createAction, createReducer } from "@reduxjs/toolkit";

export const setTitle = createAction("SET_NEW_REPORT_TITLE");
export const setDescription = createAction("SET_NEW_REPORT_DESCRIPTION");
export const setOffice = createAction("SET_NEW_REPORT_OFFICE");
export const setProductTag = createAction("SET_NEW_REPORT_PRODUCT_TAG");
export const clearReport = createAction("SET_REPORT");
export const setImage = createAction("SET_IMAGE");

const initialState = {
  title: "",
  description: "",
  office: {},
  image: "",
  product: "",
};

const reducer = createReducer(initialState, {
  [setTitle]: (state, action) => {
    state.title = action.payload;
  },
  [setDescription]: (state, action) => {
    state.description = action.payload;
  },
  [setOffice]: (state, action) => {
    state.office = action.payload;
  },
  [setImage]: (state, action) => {
    state.image = action.payload;
  },
  [setProductTag]: (state, action) => {
    state.product = action.payload;
  },
  [clearReport]: (state, action) => {
    state = initialState;
  },
});

export default reducer;
