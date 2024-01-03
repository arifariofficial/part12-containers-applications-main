import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import visibleReducer from "./reducers/visibleReducer";
import usersReducers from "./reducers/usersReducers";
import loginReducer from "./reducers/loginReducer";
import commentReducer from "./reducers/commentReducer";
import tokenReducer from "./reducers/tokenReducer";

const store = configureStore({
  reducer: {
    comments: commentReducer,
    users: usersReducers,
    blogs: blogReducer,
    user: loginReducer,
    notification: notificationReducer,
    visible: visibleReducer,
    token: tokenReducer,
  },
});

export default store;
