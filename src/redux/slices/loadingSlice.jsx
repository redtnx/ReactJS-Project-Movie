import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    set_loading_started: (state, action) => {
      state.isLoading = true;
    },
    set_loading_ended: (state, action) => {
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set_loading_started, set_loading_ended } = loadingSlice.actions;

export default loadingSlice.reducer;
