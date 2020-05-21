import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import {
  doGetOrders,
  doGetOrder,
  setLoadingOrders,
  setLoadingOrder,
  setSuccessOrders,
  setSuccessOrder,
  performGetOrders,
  performGetOrder
} from "./actions";
import { baseURL } from "../../configs/api.config";

function* workGetOrders(action) {
  let response = {};
  yield put(setLoadingOrders(true));
  try {
    response = yield call(axios.get, `${baseURL}/orders`, {
      params: { ...action.payload }
    });
    yield put(setSuccessOrders(true));
  } catch (e) {
    yield put(setSuccessOrders(false));
  }
  yield put(
    doGetOrders({
      response,
      filters: { ...action.payload }
    })
  );
  yield put(setLoadingOrders(false));
}

function* workGetOrder(action) {
  let response = {};
  yield put(setLoadingOrder(true));
  try {
    response = yield call(axios.get, `${baseURL}/orders/${action.payload}`);
    yield put(setSuccessOrder(true));
  } catch (e) {
    yield put(setSuccessOrder(false));
  }
  yield put(doGetOrder(response.data.order));
  yield put(setLoadingOrder(false));
}

export default function* ordersSaga() {
  yield all([
    takeLatest(performGetOrders, workGetOrders),
    takeLatest(performGetOrder, workGetOrder)
  ]);
}
