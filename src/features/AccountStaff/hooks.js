import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import { performGetAccountStaffs, performGetStaffRoles } from "./actions";
import { selectStaffRoles } from "./reducers";
import { queryParams } from "../../utils/route.util";

export function useAccountStaffSubInfo() {
  const dispatch = useDispatch();

  const isLoadingStaffRoles = useSelector(selectStaffRoles.isLoadingStaffRoles);
  const isSuccessStaffRoles = useSelector(selectStaffRoles.isSuccessStaffRoles);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch(performGetStaffRoles());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isLoadingStaffRoles && isSuccessStaffRoles) {
      setIsReady(true);
    }
    // eslint-disable-next-line
  }, [isLoadingStaffRoles]);

  return isReady;
}

export function useAccountStaffFilters(initialFilters, filters, isLoadingFilterForm, formFuncs) {
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
      performGetAccountStaffs({
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
      ["query", "roleId", "locked"].forEach(attr => {
        formFuncs.setValue(attr, finalFilters[attr]);
      });
    }
    // eslint-disable-next-line
  }, [location, isLoadingFilterForm]);
}

export default {};
