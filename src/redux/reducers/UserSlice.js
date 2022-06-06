import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    isLoggedIn(state, action) {
      state.isAuth = action.payload;
    },
  },
});

export const { isLoggedIn } = userSlice.actions;

export default userSlice.reducer;
