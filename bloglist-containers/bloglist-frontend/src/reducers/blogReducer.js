import { createSlice } from "@reduxjs/toolkit";
import getAll from "../services/blogs";
import create from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBloglist: (state, action) => {
      return action.payload;
    },
    addBlog: (state, action) => {
      return [...state, action.payload];
    },
  },
});


export const { setBloglist, addBlog } = blogSlice.actions;

export default blogSlice.reducer;
