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
  set: (paramsObject, location, history, options) => {
    let params = { ...paramsObject };
    switch (options) {
      case "products": {
        // whitelist
        const { query, page, size, brand, category, sort, sortDesc } = params;
        params = { query, page, size, brand, category, sort, sortDesc };
        break;
      }
      default:
        break;
    }
    history.push({
      pathname: location.pathname,
      search: `?${new URLSearchParams(params).toString()}`
    });
  }
};

export default { queryParams };
