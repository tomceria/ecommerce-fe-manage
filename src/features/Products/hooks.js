import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import { performGetProducts, performGetFilterValues } from "./actions";
import { performGetScales } from "../Scales/actions";
import { performGetTypes } from "../Types/actions";
import { performGetMakers } from "../Makers/actions";
import { performGetBrands } from "../Brands/actions";
import { selectScales } from "../Scales/reducers";
import { selectTypes } from "../Types/reducers";
import { selectMakers } from "../Makers/reducers";
import { selectBrands } from "../Brands/reducers";
import { queryParams } from "../../utils/route.util";
import { selectFilterValues } from "./reducers";

export function useProductSubInfo() {
  const dispatch = useDispatch();

  const isLoadingScales = useSelector(selectScales.isLoadingScales);
  const isLoadingTypes = useSelector(selectTypes.isLoadingTypes);
  const isLoadingMakers = useSelector(selectMakers.isLoadingMakers);
  const isLoadingBrands = useSelector(selectBrands.isLoadingBrands);
  const isLoadingFilterValues = useSelector(selectFilterValues.isLoadingFilterValues);
  const isSuccessScales = useSelector(selectScales.isSuccessScales);
  const isSuccessTypes = useSelector(selectTypes.isSuccessTypes);
  const isSuccessMakers = useSelector(selectMakers.isSuccessMakers);
  const isSuccessBrands = useSelector(selectBrands.isSuccessBrands);
  const isSuccessFilterValues = useSelector(selectFilterValues.isSuccessFilterValues);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(performGetScales());
    dispatch(performGetTypes());
    dispatch(performGetMakers());
    dispatch(performGetBrands());
    dispatch(performGetFilterValues());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      !isLoadingBrands &&
      !isLoadingTypes &&
      !isLoadingScales &&
      !isLoadingMakers &&
      !isLoadingFilterValues &&
      isSuccessBrands &&
      isSuccessTypes &&
      isSuccessScales &&
      isSuccessMakers &&
      isSuccessFilterValues
    ) {
      setIsReady(true);
    }
    // eslint-disable-next-line
  }, [isLoadingScales, isLoadingTypes, isLoadingMakers, isLoadingBrands, isLoadingFilterValues]);

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
      ["query", "scale", "type", "maker", "brand", "variationName"].forEach(attr => {
        formFuncs.setValue(attr, finalFilters[attr]);
      });
    }
    // eslint-disable-next-line
  }, [location, isLoadingFilterForm]);
}

export default {};
