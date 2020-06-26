import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import {
  doGetProducts,
  doGetProduct,
  doGetFilterValues,
  //
  setLoadingProducts,
  setLoadingProduct,
  setLoadingFilterValues,
  //
  setSuccessProducts,
  setSuccessProduct,
  setSuccessFilterValues,
  //
  performGetProducts,
  performGetProduct,
  performGetFilterValues
} from "./actions";
import { baseURL } from "../../configs/api.config";

function* workGetProducts(action) {
  let response = {};
  yield put(setLoadingProducts(true));
  try {
    response = yield call(axios.get, `${baseURL}/items`, {
      params: { ...action.payload, withHidden: true }
    });
    yield put(setSuccessProducts(true));
  } catch (e) {
    yield put(setSuccessProducts(false));
  }
  yield put(
    doGetProducts({
      response,
      filters: { ...action.payload }
    })
  );
  yield put(setLoadingProducts(false));
}

function* workGetProduct(action) {
  let response = {};
  yield put(setLoadingProduct(true));
  try {
    response = yield call(
      axios.get,
      `${baseURL}/items/${action.payload}?silent=true&keepAttr=true`
    );
    yield put(setSuccessProduct(true));
  } catch (e) {
    yield put(setSuccessProduct(false));
  }
  yield put(doGetProduct(response.data.item));
  yield put(setLoadingProduct(false));
}

function* workGetFilterValues(action) {
  let response = {};
  yield put(setLoadingFilterValues(true));
  try {
    response = yield call(axios.get, `${baseURL}/items/filterValues`);
    yield put(setSuccessFilterValues(true));
  } catch (e) {
    yield put(setSuccessFilterValues(false));
  }
  yield put(doGetFilterValues(response.data.values));
  yield put(setLoadingFilterValues(false));
}

export default function* productsSaga() {
  yield all([
    takeLatest(performGetProducts, workGetProducts),
    takeLatest(performGetProduct, workGetProduct),
    takeLatest(performGetFilterValues, workGetFilterValues)
  ]);
}
