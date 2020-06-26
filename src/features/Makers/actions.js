import { createAction } from "@reduxjs/toolkit";
import { slice } from "./reducers";

export const {
  doGetMakers,
  doGetMaker,
  setLoadingMakers,
  setLoadingMaker,
  setSuccessMakers,
  setSuccessMaker
} = slice.actions;

export const performGetMakers = createAction("MAKERS_SAGA_GETMAKERS", function prepare(filters) {
  return {
    payload: { ...filters }
  };
});

export const performGetMaker = createAction("MAKERS_SAGA_GETMAKER", function prepare(id) {
  return { payload: id };
});
