import { createAction } from "@reduxjs/toolkit";
import { slice } from "./reducers";

export const {
  doGetProducts,
  doGetProduct,
  setLoadingProducts,
  setLoadingProduct,
  setSuccessProducts,
  setSuccessProduct
} = slice.actions;

export const performGetProducts = createAction("PRODUCTS_SAGA_GETPRODUCTS", function prepare(
  filters
) {
  return {
    payload: { ...filters }
  };
});
export const performGetProduct = createAction("PRODUCTS_SAGA_GETPRODUCT", function prepare(id) {
  return { payload: id };
});
