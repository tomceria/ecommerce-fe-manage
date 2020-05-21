import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import { performGetOrders } from "./actions";
import { performGetOrderStatuses } from "../OrderStatuses/actions";
import { selectOrderStatuses } from "../OrderStatuses/reducers";
import { queryParams } from "../../utils/route.util";

export function useOrderSubInfo() {
  const dispatch = useDispatch();

  const isLoadingOrderStatuses = useSelector(selectOrderStatuses.isLoadingOrderStatuses);
  const isSuccessOrderStatuses = useSelector(selectOrderStatuses.isSuccessOrderStatuses);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(performGetOrderStatuses());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isLoadingOrderStatuses && isSuccessOrderStatuses) {
      setIsReady(true);
    }
    // eslint-disable-next-line
  }, [isLoadingOrderStatuses]);

  return isReady;
}

export function useOrderFilters(initialFilters, filters, isLoadingFilterForm, formFuncs) {
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
        "orders"
      );
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // On URL changes, get orders based on filters of new URL
    dispatch(
      performGetOrders({
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
      ["query", "userId", "verifier", "statusId"].forEach(attr => {
        formFuncs.setValue(attr, finalFilters[attr]);
      });
    }
    // eslint-disable-next-line
  }, [location, isLoadingFilterForm]);
}

export default {};
