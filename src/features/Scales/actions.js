import { createAction } from "@reduxjs/toolkit";
import { slice } from "./reducers";

export const {
  doGetScales,
  doGetScale,
  setLoadingScales,
  setLoadingScale,
  setSuccessScales,
  setSuccessScale
} = slice.actions;

export const performGetScales = createAction("SCALES_SAGA_GETSCALES", function prepare(filters) {
  return {
    payload: { ...filters }
  };
});

export const performGetScale = createAction("SCALES_SAGA_GETSCALE", function prepare(id) {
  return { payload: id };
});
