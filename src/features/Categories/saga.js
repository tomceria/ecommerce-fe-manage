import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import {
  doGetCategories,
  doGetCategory,
  setLoadingCategories,
  setLoadingCategory,
  setSuccessCategories,
  setSuccessCategory,
  performGetCategories,
  performGetCategory
} from "./actions";
import { baseURL } from "../../configs/api.config";

function* workGetCategories(action) {
  let response = {};
  yield put(setLoadingCategories(true));
  try {
    response = yield call(axios.get, `${baseURL}/categories`);
    // response = yield call(axios.get, `${baseURL}/items`, { params: { ...action.payload } });
    yield put(setSuccessCategories(true));
  } catch (e) {
    yield put(setSuccessCategories(false));
  }
  yield put(
    doGetCategories({
      response
      // filters: { ...action.payload }
    })
  );
  yield put(setLoadingCategories(false));
}

function* workGetCategory(action) {
  let response = {};
  yield put(setLoadingCategory(true));
  try {
    response = yield call(axios.get, `${baseURL}/categories/${action.payload}`);
    yield put(setSuccessCategory(true));
  } catch (e) {
    yield put(setSuccessCategory(false));
  }
  yield put(doGetCategory(response));
  yield put(setLoadingCategory(false));
}

export default function* categoriesSaga() {
  yield all([
    takeLatest(performGetCategories, workGetCategories),
    takeLatest(performGetCategory, workGetCategory)
  ]);
}
