import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import { doGetShop, setLoadingShop, setSuccessShop, performGetShop } from "./actions";
import { baseURL } from "../../configs/api.config";

function* workGetShop(action) {
  let response = {};
  yield put(setLoadingShop(true));
  try {
    response = yield call(axios.get, `${baseURL}/shop`);
    yield put(setSuccessShop(true));
  } catch (e) {
    yield put(setSuccessShop(false));
  }
  yield put(doGetShop(response.data.shop));
  yield put(setLoadingShop(false));
}

export default function* shopSaga() {
  yield all([takeLatest(performGetShop, workGetShop)]);
}
