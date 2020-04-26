import { scrollToRef } from "./function.util";
import { queryParams } from "./route.util";

export const filterSubmitHandler = (data, reduxAction, currentFilters, hooks) => {
  const { location, history, dispatch } = hooks;

  const newFilters = data;
  const finalFilters = { ...currentFilters, ...newFilters, page: 1 };
  queryParams.set(finalFilters, location, history);
  dispatch(reduxAction(finalFilters));
};

export const filtersReloadHandler = (containerSubmitHandler, hooks) => {
  const { filterFormFuncs } = hooks;

  filterFormFuncs.handleSubmit(containerSubmitHandler)();
};

export const changePageHandler = (page, reduxAction, currentFilters, hooks) => {
  const { location, history, dispatch, topRef } = hooks;

  const finalFilters = { ...currentFilters, page };
  queryParams.set(finalFilters, location, history);
  dispatch(reduxAction(finalFilters));
  scrollToRef(topRef);
};

export const changeRowsPerPageHandler = (event, reduxAction, currentFilters, hooks) => {
  const { location, history, dispatch, topRef } = hooks;

  const finalFilters = {
    ...currentFilters,
    page: 1,
    size: parseInt(event.target.value, 10)
  };
  queryParams.set(finalFilters, location, history);
  dispatch(reduxAction(finalFilters));
  scrollToRef(topRef);
};

export const changeSortHandler = (key, reduxAction, currentFilters, hooks) => {
  const { location, history, dispatch } = hooks;

  const finalFilters = {
    ...currentFilters,
    page: 1,
    sort: key,
    sortDesc: currentFilters.sort === key ? !currentFilters.sortDesc : false
  };
  queryParams.set(finalFilters, location, history);
  dispatch(reduxAction(finalFilters));
};
