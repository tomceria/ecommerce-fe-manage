import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import {
  doGetOrderStatuses,
  setLoadingOrderStatuses,
  setSuccessOrderStatuses,
  performGetOrderStatuses
} from "./actions";
import { baseURL } from "../../configs/api.config";

function* workGetOrderStatuses(action) {
  let response = {};
  yield put(setLoadingOrderStatuses(true));
  try {
    response = yield call(axios.get, `${baseURL}/orders/statuses`, {
      params: { ...action.payload }
    });
    yield put(setSuccessOrderStatuses(true));
  } catch (e) {
    yield put(setSuccessOrderStatuses(false));
  }
  yield put(
    doGetOrderStatuses({
      response,
      filters: { ...action.payload }
    })
  );
  yield put(setLoadingOrderStatuses(false));
}

export default function* orderStatusesSaga() {
  yield all([takeLatest(performGetOrderStatuses, workGetOrderStatuses)]);
}
