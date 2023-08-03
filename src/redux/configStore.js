import { configureStore } from "@reduxjs/toolkit";
import nguoiDungSlice from "./slices/nguoiDungSlice";
import loadingSlice from "./slices/loadingSlice";

export const store = configureStore({
  reducer: {
    nguoiDung: nguoiDungSlice,
    loading: loadingSlice,
  },
});
