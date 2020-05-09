import { createAction } from "@reduxjs/toolkit";
import { slice } from "./reducers";

export const {
  doGetBrands,
  doGetBrand,
  setLoadingBrands,
  setLoadingBrand,
  setSuccessBrands,
  setSuccessBrand
} = slice.actions;

export const performGetBrands = createAction("BRANDS_SAGA_GETBRANDS", function prepare(filters) {
  return {
    payload: { ...filters }
  };
});
export const performGetBrand = createAction("BRANDS_SAGA_GETBRAND", function prepare(id) {
  return { payload: id };
});
