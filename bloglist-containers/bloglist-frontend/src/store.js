import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import bloglistReducer from "./reducers/bloglistReducer";
import userReducer from "./reducers/userReducer";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
    bloglist: bloglistReducer,
    user: userReducer,
  },
});

export default store;
