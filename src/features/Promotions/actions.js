import { createAction } from "@reduxjs/toolkit";
import { slice } from "./reducers";

export const {
  doGetPromotions,
  doGetPromotion,
  setLoadingPromotions,
  setLoadingPromotion,
  setSuccessPromotions,
  setSuccessPromotion
} = slice.actions;

export const performGetPromotions = createAction("PROMOTIONS_SAGA_GETPROMOTIONS", function prepare(
  filters
) {
  return {
    payload: { ...filters }
  };
});
export const performGetPromotion = createAction("PROMOTIONS_SAGA_GETPROMOTION", function prepare(
  id
) {
  return { payload: id };
});
