import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import { performGetSupportTickets } from "./actions";
import { performGetSupportTicketStatuses } from "../SupportTicketStatuses/actions";
import { selectSupportTicketStatuses } from "../SupportTicketStatuses/reducers";
import { queryParams } from "../../utils/route.util";

export function useSupportTicketSubInfo() {
  const dispatch = useDispatch();

  const isLoadingSupportTicketStatuses = useSelector(
    selectSupportTicketStatuses.isLoadingSupportTicketStatuses
  );
  const isSuccessSupportTicketStatuses = useSelector(
    selectSupportTicketStatuses.isSuccessSupportTicketStatuses
  );

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(performGetSupportTicketStatuses());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isLoadingSupportTicketStatuses && isSuccessSupportTicketStatuses) {
      setIsReady(true);
    }
    // eslint-disable-next-line
  }, [isLoadingSupportTicketStatuses]);

  return isReady;
}

export function useSupportTicketFilters(initialFilters, filters, isLoadingFilterForm, formFuncs) {
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
        history
      );
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // On URL changes, get products based on filters of new URL
    dispatch(
      performGetSupportTickets({
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
      ["query", "supportTypeId", "support", "customer", "statusId"].forEach(attr => {
        formFuncs.setValue(attr, finalFilters[attr]);
      });
    }
    // eslint-disable-next-line
  }, [location, isLoadingFilterForm]);
}

export default {};
