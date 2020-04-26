import { isInt, isBoolean, toInt, toBoolean } from "validator";

export const queryParams = {
  get: location => {
    const query = new URLSearchParams(location.search);
    if (!query) {
      return null;
    }
    const params = {};
    query.forEach((queryValue, queryId) => {
      params[queryId] = queryValue; // [query: 'hello world']
      if (isInt(queryValue)) {
        params[queryId] = toInt(queryValue);
      } else if (isBoolean(queryValue)) {
        params[queryId] = toBoolean(queryValue);
      }
    });
    return params;
  },
  set: (paramsObject, location, history) => {
    const params = { ...paramsObject };
    history.push({
      pathname: location.pathname,
      search: `?${new URLSearchParams(params).toString()}`
    });
  }
};

export default { queryParams };
