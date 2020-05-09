import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import {
  doGetTypes,
  doGetType,
  setLoadingTypes,
  setLoadingType,
  setSuccessTypes,
  setSuccessType,
  performGetTypes,
  performGetType
} from "./actions";
import { baseURL } from "../../configs/api.config";

function* workGetTypes(action) {
  let response = {};
  yield put(setLoadingTypes(true));
  try {
    response = yield call(axios.get, `${baseURL}/types`, { params: { ...action.payload } });
    yield put(setSuccessTypes(true));
  } catch (e) {
    yield put(setSuccessTypes(false));
  }
  yield put(
    doGetTypes({
      response
      // filters: { ...action.payload }
    })
  );
  yield put(setLoadingTypes(false));
}

function* workGetType(action) {
  let response = {};
  yield put(setLoadingType(true));
  try {
    response = yield call(axios.get, `${baseURL}/types/${action.payload}`);
    yield put(setSuccessType(true));
  } catch (e) {
    yield put(setSuccessType(false));
  }
  yield put(doGetType(response.data.type));
  yield put(setLoadingType(false));
}

export default function* typesSaga() {
  yield all([takeLatest(performGetTypes, workGetTypes), takeLatest(performGetType, workGetType)]);
}
