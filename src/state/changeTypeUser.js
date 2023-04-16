import { createAction, createReducer } from "@reduxjs/toolkit";


export const changeTypeUser = createAction("CHANGE_TYPE_USER");

const reducer = createReducer({},{
    [changeTypeUser]: (state, action) => {
        return action.payload;
      },
})

export default reducer