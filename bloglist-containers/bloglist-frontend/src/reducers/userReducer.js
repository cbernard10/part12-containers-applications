/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    deleteUser: (state, action) => {
      return initialState;
    },
  },
});

export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
