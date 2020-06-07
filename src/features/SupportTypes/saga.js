import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import {
  doGetSupportTypes,
  setLoadingSupportTypes,
  setSuccessSupportTypes,
  performGetSupportTypes
} from "./actions";
import { baseURL } from "../../configs/api.config";

function* workGetSupportTypes(action) {
  let response = {};
  yield put(setLoadingSupportTypes(true));
  try {
    response = yield call(axios.get, `${baseURL}/support/types`, {
      params: { ...action.payload }
    });
    yield put(setSuccessSupportTypes(true));
  } catch (e) {
    yield put(setSuccessSupportTypes(false));
  }
  yield put(
    doGetSupportTypes({
      response,
      filters: { ...action.payload }
    })
  );
  yield put(setLoadingSupportTypes(false));
}

export default function* supportTypesSaga() {
  yield all([takeLatest(performGetSupportTypes, workGetSupportTypes)]);
}
