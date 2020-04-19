import { createAction } from "@reduxjs/toolkit";
import { slice } from "./reducers";

export const {
  doGetCategories,
  doGetCategory,
  setLoadingCategories,
  setLoadingCategory,
  setSuccessCategories,
  setSuccessCategory
} = slice.actions;
export const performGetCategories = createAction("CATEGORIES_SAGA_GETCATEGORIES", function prepare(
  filters
) {
  return {
    payload: { ...filters }
  };
});
export const performGetCategory = createAction("CATEGORIES_SAGA_GETCATEGORY", function prepare(id) {
  return { payload: id };
});
