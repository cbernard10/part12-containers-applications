import { createSlice } from "@reduxjs/toolkit";
import bloglistService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const bloglistSlice = createSlice({
  name: "bloglist",
  initialState: [],
  reducers: {
    setBloglist: (state, action) => {
      return action.payload;
    },
    addBlog: (state, action) => {
      return [...state, action.payload];
    },
    deleteBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
    getBlog: (state, action) => {
      return state.find((blog) => blog.id === action.payload.id);
    },
    updateBlog: (state, action) => {
      const res = state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
      console.log(res);
      return res;
    },
  },
});

export const { setBloglist, addBlog, deleteBlog, updateBlog, getBlog } =
  bloglistSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await bloglistService.getAll();
    console.log(blogs);
    dispatch(setBloglist(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const response = await bloglistService.create(blog);
      dispatch(addBlog(response));
      dispatch(
        setNotification(
          {
            message: `Created blog ${response.title} by ${response.author}`,
            type: "success",
          },
          5
        )
      );
    } catch (error) {
      dispatch(
        setNotification(
          {
            message: `Error creating blog: ${error.response.data.error}`,
            type: "error",
          },
          5
        )
      );
    }
  };
};

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    try {
      const response = await bloglistService.addComment(blog.id, comment);
      dispatch(updateBlog(response));
    } catch (error) {
      console.log(error);
    }
  };
};

export default bloglistSlice.reducer;
