import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import {
  doGetMakers,
  doGetMaker,
  setLoadingMakers,
  setLoadingMaker,
  setSuccessMakers,
  setSuccessMaker,
  performGetMakers,
  performGetMaker
} from "./actions";
import { baseURL } from "../../configs/api.config";

function* workGetMakers(action) {
  let response = {};
  yield put(setLoadingMakers(true));
  try {
    response = yield call(axios.get, `${baseURL}/makers`, { params: { ...action.payload } });
    yield put(setSuccessMakers(true));
  } catch (e) {
    yield put(setSuccessMakers(false));
  }
  yield put(
    doGetMakers({
      response
      // filters: { ...action.payload }
    })
  );
  yield put(setLoadingMakers(false));
}

function* workGetMaker(action) {
  let response = {};
  yield put(setLoadingMaker(true));
  try {
    response = yield call(axios.get, `${baseURL}/makers/${action.payload}`);
    yield put(setSuccessMaker(true));
  } catch (e) {
    yield put(setSuccessMaker(false));
  }
  yield put(doGetMaker(response.data.maker));
  yield put(setLoadingMaker(false));
}

export default function* makersSaga() {
  yield all([
    takeLatest(performGetMakers, workGetMakers),
    takeLatest(performGetMaker, workGetMaker)
  ]);
}
