import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import {
  doGetPromotions,
  doGetPromotion,
  setLoadingPromotions,
  setLoadingPromotion,
  setSuccessPromotions,
  setSuccessPromotion,
  performGetPromotions,
  performGetPromotion
} from "./actions";
import { baseURL } from "../../configs/api.config";

function* workGetPromotions(action) {
  let response = {};
  yield put(setLoadingPromotions(true));
  try {
    response = yield call(axios.get, `${baseURL}/promotions`, { params: { ...action.payload } });
    yield put(setSuccessPromotions(true));
  } catch (e) {
    yield put(setSuccessPromotions(false));
  }
  yield put(
    doGetPromotions({
      response,
      filters: { ...action.payload }
    })
  );
  yield put(setLoadingPromotions(false));
}

function* workGetPromotion(action) {
  let response = {};
  yield put(setLoadingPromotion(true));
  try {
    response = yield call(axios.get, `${baseURL}/promotions/${action.payload}`);
    yield put(setSuccessPromotion(true));
  } catch (e) {
    yield put(setSuccessPromotion(false));
  }
  yield put(doGetPromotion(response.data.promotion));
  yield put(setLoadingPromotion(false));
}

export default function* promotionsSaga() {
  yield all([
    takeLatest(performGetPromotions, workGetPromotions),
    takeLatest(performGetPromotion, workGetPromotion)
  ]);
}
