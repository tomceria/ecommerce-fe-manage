import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import { performGetProducts } from "./actions";
import { performGetBrands } from "../Brands/actions";
import { performGetCategories } from "../Categories/actions";
import { selectBrands } from "../Brands/reducers";
import { selectCategories } from "../Categories/reducers";
import { queryParams } from "../../utils/route.util";

export function useProductSubInfo() {
  const dispatch = useDispatch();

  const isLoadingBrands = useSelector(selectBrands.isLoadingBrands);
  const isLoadingCategories = useSelector(selectCategories.isLoadingCategories);
  const isSuccessBrands = useSelector(selectBrands.isSuccessBrands);
  const isSuccessCategories = useSelector(selectCategories.isSuccessCategories);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(performGetBrands());
    dispatch(performGetCategories());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isLoadingBrands && !isLoadingCategories && isSuccessBrands && isSuccessCategories) {
      setIsReady(true);
    }
    // eslint-disable-next-line
  }, [isLoadingBrands, isLoadingCategories]);

  return isReady;
}

export function useProductFilters(initialFilters, filters, isLoadingFilterForm, formFuncs) {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    // Set default filters on queryParams if queryParams is empty
    if (!location || !location.search) {
      queryParams.set(
        {
          ...filters,
          ...initialFilters
        },
        location,
        history,
        "products"
      );
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // On URL changes, get products based on filters of new URL
    dispatch(
      performGetProducts({
        ...initialFilters,
        ...queryParams.get(location)
      })
    );
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    if (!location || !location.search) {
      return;
    }
    // Set form value for filters as queryParams changes
    if (!isLoadingFilterForm) {
      // Only set value when data finished fetching (above returns isReady(bool))
      let finalFilters = initialFilters;
      finalFilters = { ...finalFilters, ...queryParams.get(location) };
      ["query", "brand", "category"].forEach(attr => {
        formFuncs.setValue(attr, finalFilters[attr]);
      });
    }
    // eslint-disable-next-line
  }, [location, isLoadingFilterForm]);
}

export default {};
