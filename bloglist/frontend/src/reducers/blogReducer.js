import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return state.concat(action.payload);
    },
    updateBlog(state, action) {
      const updatedObj = action.payload;
      return state.map((item) => (item.title !== updatedObj.title ? item : updatedObj));
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((item) => item.id !== id);
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, deleteBlog } = blogSlice.actions;

export const initializeBlog = (token) => {
  return async (dispatch) => {
    try {
      const returnedObj = await blogsService.getAll(token);
      dispatch(setBlogs(returnedObj));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };
};

export const createNewBlog = (newObj, user, token) => {
  return async (dispatch) => {
    const returnedObj = await blogsService.create(newObj, token);
    returnedObj.user = {
      id: user.id,
      username: user.username,
      name: user.name,
    };
    dispatch(appendBlog(returnedObj));
  };
};

export const handleDelete = (id, token) => {
  return async (dispatch) => {
    await blogsService.remove(id, token);
    dispatch(deleteBlog(id));
  };
};

export const handleLikes = (id, obj, token) => {
  return async (dispatch) => {
    const returnedObj = await blogsService.update(id, obj, token);
    returnedObj.user = {
      username: obj.user.username,
      name: obj.user.name,
    };
    dispatch(updateBlog(returnedObj));
  };
};

export default blogSlice.reducer;
