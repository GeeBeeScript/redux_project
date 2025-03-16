import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "main-slice",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      // Below is handled by imur in redux toolkit
      state.cartIsVisible = !state.cartIsVisible;
    },
    setNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const mainSliceActions = mainSlice.actions;

export default mainSlice;
