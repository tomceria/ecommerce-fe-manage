import axios from "axios";

const options = {
  cred: {
    withCredentials: true
  }
};
const defaultOptions = "cred";

// opts='opt1,opt2'
const optionsParse = opts => {
  return opts
    .split(",")
    .map(key => options[key])
    .reduce((optsObj, opt) => {
      optsObj = { ...optsObj, ...opt };
      return optsObj;
    });
};
const request = async (action, url, data, thenFunc, catchFunc, optionsStr) => {
  if (!action || !url) {
    return;
  }
  const opts = optionsStr ? optionsParse(optionsStr) : optionsParse(defaultOptions);
  let res = null;
  try {
    switch (action) {
      case "get": {
        res = await axios.get(url, opts);
        break;
      }
      case "post": {
        res = await axios.post(url, data, opts);
        break;
      }
      case "put": {
        res = await axios.put(url, data, opts);
        break;
      }
      case "patch": {
        res = await axios.patch(url, data, opts);
        break;
      }
      case "delete": {
        res = await axios.delete(url, opts);
        break;
      }
      default:
        break;
    }
    if (typeof thenFunc !== "undefined") {
      thenFunc(res);
    }
  } catch (error) {
    if (typeof catchFunc !== "undefined") {
      catchFunc(error);
    } else {
      throw error;
    }
  }
  // TODO: FIX THIS
  // eslint-disable-next-line
  return res;
};
export default request;
