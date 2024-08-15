import { configureStore } from "@reduxjs/toolkit";
import searchBarReducer from "./searchBarSlice";

export const store = configureStore({
  reducer: {
    searchBar: searchBarReducer,
  },
});