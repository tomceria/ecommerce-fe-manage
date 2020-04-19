import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "auth",
  initialState: {
    isFinishAuthening: false,
    isAuthen: false,
    authInfo: {} // jwtDecoded.data
  },
  reducers: {
    doAuthenticate: (state, action) => {
      if (action.payload.authed) {
        state.authInfo = action.payload.authRes.data;
        state.isAuthen = true;
      } else {
        state.isAuthen = false;
        state.authInfo = {};
      }
    },
    setFinishAuthenticate: (state, action) => {
      state.isFinishAuthening = action.payload.progress;
    }
  }
});

// Selectors
export const selectIsAuth = state => state.auth.isAuthen;
export const selectIsFinishAuth = state => state.auth.isFinishAuthening;
export const selectAuthInfo = state => state.auth.authInfo;

export default slice.reducer;
