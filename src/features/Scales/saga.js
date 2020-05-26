import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import {
  doGetScales,
  doGetScale,
  setLoadingScales,
  setLoadingScale,
  setSuccessScales,
  setSuccessScale,
  performGetScales,
  performGetScale
} from "./actions";
import { baseURL } from "../../configs/api.config";

function* workGetScales(action) {
  let response = {};
  yield put(setLoadingScales(true));
  try {
    response = yield call(axios.get, `${baseURL}/scales`, { params: { ...action.payload } });
    yield put(setSuccessScales(true));
  } catch (e) {
    yield put(setSuccessScales(false));
  }
  yield put(
    doGetScales({
      response
      // filters: { ...action.payload }
    })
  );
  yield put(setLoadingScales(false));
}

function* workGetScale(action) {
  let response = {};
  yield put(setLoadingScale(true));
  try {
    response = yield call(axios.get, `${baseURL}/scales/${action.payload}`);
    yield put(setSuccessScale(true));
  } catch (e) {
    yield put(setSuccessScale(false));
  }
  yield put(doGetScale(response.data.scale));
  yield put(setLoadingScale(false));
}

export default function* scalesSaga() {
  yield all([
    takeLatest(performGetScales, workGetScales),
    takeLatest(performGetScale, workGetScale)
  ]);
}
