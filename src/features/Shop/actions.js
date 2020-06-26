import { createAction } from "@reduxjs/toolkit";
import { slice } from "./reducers";

export const { doGetShop, setLoadingShop, setSuccessShop } = slice.actions;

export const performGetShop = createAction("SHOP_SAGA_GETSHOP", function prepare(id) {
  return { payload: id };
});
