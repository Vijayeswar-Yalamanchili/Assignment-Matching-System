import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "currentUser",
  initialState: {
    user: null
  },
  reducers: {
    fetchUserSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
  },
});

export const {  fetchUserSuccess } = userSlice.actions;

export default userSlice.reducer;
