import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import {
  doGetProducts,
  doGetProduct,
  setLoadingProducts,
  setLoadingProduct,
  setSuccessProducts,
  setSuccessProduct,
  performGetProducts,
  performGetProduct
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

export default function* productsSaga() {
  yield all([
    takeLatest(performGetProducts, workGetProducts),
    takeLatest(performGetProduct, workGetProduct)
  ]);
}
