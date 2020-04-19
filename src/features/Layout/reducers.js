import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "layout",
  initialState: {
    drawer: false
  },
  reducers: {
    toggleDrawer: state => {
      state.drawer = !state.drawer;
      if (state.drawer) {
        document.body.classList.add("noscroll");
      } else {
        document.body.classList.remove("noscroll");
      }
    },
    setDrawer: (state, action) => {
      state.drawer = action.payload.value;
      if (action.payload.value) {
        document.body.classList.add("noscroll");
      } else {
        document.body.classList.remove("noscroll");
      }
    }
  }
});

export const selectDrawerState = state => state.layout.drawer;
export const { toggleDrawer, setDrawer } = slice.actions;

export default slice.reducer;
