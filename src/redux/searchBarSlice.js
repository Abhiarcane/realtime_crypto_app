import { createSlice } from "@reduxjs/toolkit";

export const searchBarSlice = createSlice({
  name: "searchBar",
  initialState: {
    visible: false,
  },
  reducers: {
    showSearchBar: (state) => {
      state.visible = true;
    },
    hideSearchBar: (state) => {
      state.visible = false;
    },
  },
});

export const { showSearchBar, hideSearchBar } = searchBarSlice.actions;

export default searchBarSlice.reducer;
