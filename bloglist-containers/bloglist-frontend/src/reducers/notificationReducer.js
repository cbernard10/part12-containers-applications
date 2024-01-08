/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    createNotification: (state, action) => {
      console.log("setting notification", action.payload);
      return action.payload;
    },
    clearNotification: (state, action) => {
      return initialState;
    },
  },
});

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(createNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export const { createNotification, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
