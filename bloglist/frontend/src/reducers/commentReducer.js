import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/commentService";

const commentReducer = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload;
    },

    appendComment(state, action) {
      return state.concat(action.payload);
    },
  },
});

export const { setComments, appendComment } = commentReducer.actions;

export const initializeComments = (id, token) => {
  return async (dispatch) => {
    const returnedObj = await commentService.getAll(id, token);
    dispatch(setComments(returnedObj));
  };
};

export const handleCommentObj = (id, comment, token) => {
  return async (dispatch) => {
    const returnedObj = await commentService.createComment(id, comment, token);
    dispatch(appendComment(returnedObj));
  };
};

export default commentReducer.reducer;
