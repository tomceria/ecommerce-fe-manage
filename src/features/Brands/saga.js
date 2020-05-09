import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import {
  doGetBrands,
  doGetBrand,
  setLoadingBrands,
  setLoadingBrand,
  setSuccessBrands,
  setSuccessBrand,
  performGetBrands,
  performGetBrand
} from "./actions";
import { baseURL } from "../../configs/api.config";

function* workGetBrands(action) {
  let response = {};
  yield put(setLoadingBrands(true));
  try {
    response = yield call(axios.get, `${baseURL}/brands`, { params: { ...action.payload } });
    yield put(setSuccessBrands(true));
  } catch (e) {
    yield put(setSuccessBrands(false));
  }
  yield put(
    doGetBrands({
      response
      // filters: { ...action.payload }
    })
  );
  yield put(setLoadingBrands(false));
}

function* workGetBrand(action) {
  let response = {};
  yield put(setLoadingBrand(true));
  try {
    response = yield call(axios.get, `${baseURL}/brands/${action.payload}`);
    yield put(setSuccessBrand(true));
  } catch (e) {
    yield put(setSuccessBrand(false));
  }
  yield put(doGetBrand(response.data.brand));
  yield put(setLoadingBrand(false));
}

export default function* brandsSaga() {
  yield all([
    takeLatest(performGetBrands, workGetBrands),
    takeLatest(performGetBrand, workGetBrand)
  ]);
}
