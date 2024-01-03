import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducers from "../reducers/usersReducers";
import blogReducer from "../reducers/blogReducer";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  user: usersReducers,
  blogs: blogReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
