import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import { performGetInventoryItems } from "./actions";
// import { performGetProducts } from "../Products/actions";
// import { selectProducts } from "../Products/reducers";
import { queryParams } from "../../utils/route.util";

export function useInventoryItemSubInfo() {
  // const dispatch = useDispatch();

  // const isLoadingProducts = useSelector(selectProducts.isLoadingProducts);
  // const isSuccessProducts = useSelector(selectProducts.isSuccessProducts);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // dispatch(performGetProducts());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // if (!isLoadingProducts && isSuccessProducts) {
    setIsReady(true);
    // }
    // eslint-disable-next-line
  }, []);

  return isReady;
}

export function useInventoryItemFilters(initialFilters, filters, isLoadingFilterForm, formFuncs) {
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
        "inventoryItems"
      );
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // On URL changes, get inventoryItems based on filters of new URL
    dispatch(
      performGetInventoryItems({
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
      ["query", "itemId"].forEach(attr => {
        formFuncs.setValue(attr, finalFilters[attr]);
      });
    }
    // eslint-disable-next-line
  }, [location, isLoadingFilterForm]);
}

export default {};
