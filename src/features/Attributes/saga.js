import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import {
  doGetAttributes,
  doGetAttribute,
  setLoadingAttributes,
  setLoadingAttribute,
  setSuccessAttributes,
  setSuccessAttribute,
  performGetAttributes,
  performGetAttribute
} from "./actions";
import { baseURL } from "../../configs/api.config";

function* workGetAttributes(action) {
  let response = {};
  yield put(setLoadingAttributes(true));
  try {
    response = yield call(axios.get, `${baseURL}/attributes`, { params: { ...action.payload } });
    yield put(setSuccessAttributes(true));
  } catch (e) {
    yield put(setSuccessAttributes(false));
  }
  yield put(
    doGetAttributes({
      response
      // filters: { ...action.payload }
    })
  );
  yield put(setLoadingAttributes(false));
}

function* workGetAttribute(action) {
  let response = {};
  yield put(setLoadingAttribute(true));
  try {
    response = yield call(axios.get, `${baseURL}/attributes/${action.payload}`);
    yield put(setSuccessAttribute(true));
  } catch (e) {
    yield put(setSuccessAttribute(false));
  }
  yield put(doGetAttribute(response.data.attribute));
  yield put(setLoadingAttribute(false));
}

export default function* attributesSaga() {
  yield all([
    takeLatest(performGetAttributes, workGetAttributes),
    takeLatest(performGetAttribute, workGetAttribute)
  ]);
}
